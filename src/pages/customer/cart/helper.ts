import { useCallback, useMemo, useRef } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { useOpenOrder } from '@/hooks/customer/use-open-order/helper'
import { ApiRequestError } from '@/lib/api/client'
import { ordersApi } from '@/lib/api/orders'
import { publicApi } from '@/lib/api/public'
import { useCart } from '@/lib/cart/cart-context'
import { guestOrderStore } from '@/lib/customer/guest-order-store'
import { customerPath } from '@/lib/customer/paths'
import { sessionStore } from '@/lib/customer/session-store'
import { ensureTableSession } from '@/lib/customer/table-session'
import { queryKeys } from '@/lib/query/keys'
import type { MenuItem } from '@/types/menu'
import type { Order } from '@/types/order'

export function useCartPage(slug: string, restaurantId: string, tableNumber: string | null) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const cart = useCart()
  const session = sessionStore.get(restaurantId)
  const table = tableNumber ?? session?.tableNumber ?? null
  const idempotencyKey = useRef(crypto.randomUUID())
  const openOrder = useOpenOrder(restaurantId)

  // Already cached by the menu screen — used to turn an upsell suggestion back
  // into the full menu item the cart needs.
  const menuQuery = useQuery({
    queryKey: queryKeys.publicMenu(slug),
    queryFn: () => publicApi.getMenu(slug),
    enabled: Boolean(slug),
  })

  const itemsById = useMemo(() => {
    const map = new Map<string, MenuItem>()
    for (const group of menuQuery.data?.categories ?? []) {
      for (const item of group.items) map.set(item.id, item)
    }
    return map
  }, [menuQuery.data])

  const cartItemIds = useMemo(
    () => Array.from(new Set(cart.lines.map((line) => line.item.id))),
    [cart.lines],
  )

  const isInCart = useCallback(
    (menuItemId: string) => cart.lines.some((line) => line.item.id === menuItemId),
    [cart.lines],
  )

  const mutation = useMutation({
    mutationFn: async (): Promise<Order> => {
      if (!table) throw new Error('NO_SESSION')

      const resolveSession = async () => {
        let current = sessionStore.get(restaurantId)
        if (!current || current.tableNumber !== table) {
          current = await ensureTableSession(restaurantId, slug, table)
        }
        return current
      }

      const place = async (sessionId: string) =>
        ordersApi.create(
          {
            restaurantId,
            customerSessionId: sessionId,
            items: cart.toOrderItems(),
            notes: cart.orderNotes.trim() || null,
          },
          idempotencyKey.current,
        )

      try {
        const current = await resolveSession()
        return await place(current.id)
      } catch (error) {
        const expired =
          error instanceof ApiRequestError &&
          (error.code === 'SESSION_EXPIRED' || error.code === 'INVALID_SESSION')
        if (!expired) throw error
        sessionStore.clear(restaurantId)
        const refreshed = await ensureTableSession(restaurantId, slug, table)
        return await place(refreshed.id)
      }
    },
    onSuccess: (order) => {
      cart.clear()
      idempotencyKey.current = crypto.randomUUID()
      guestOrderStore.set(restaurantId, order.id)
      if (order.customerSessionId) {
        void queryClient.invalidateQueries({
          queryKey: queryKeys.openOrder(order.customerSessionId),
        })
      }
      navigate(customerPath(slug, `/track/${order.id}`, table), { replace: true })
    },
    onError: (error) => {
      const needCheckIn =
        (error instanceof Error && error.message === 'NO_SESSION') ||
        (error instanceof ApiRequestError &&
          (error.code === 'INVALID_SESSION' || error.code === 'SESSION_EXPIRED'))
      if (!needCheckIn || !table) return
      sessionStore.clear(restaurantId)
      navigate(customerPath(slug, '/menu', table), { replace: true })
    },
  })

  const errorMessage = (() => {
    if (!mutation.error) return undefined
    if (mutation.error instanceof Error && mutation.error.message === 'NO_SESSION') {
      return 'NO_SESSION'
    }
    if (mutation.error instanceof ApiRequestError) {
      if (mutation.error.code === 'INVALID_SESSION' || mutation.error.code === 'SESSION_EXPIRED') {
        return 'NO_SESSION'
      }
      return mutation.error.message
    }
    return undefined
  })()

  return {
    lines: cart.lines,
    subtotal: cart.subtotal,
    count: cart.count,
    orderNotes: cart.orderNotes,
    setOrderNotes: cart.setOrderNotes,
    increment: cart.increment,
    decrement: cart.decrement,
    removeLine: cart.removeLine,
    setLineNotes: cart.setLineNotes,
    goMenu: () => navigate(customerPath(slug, '/menu', table)),
    placeOrder: () => mutation.mutate(),
    placing: mutation.isPending,
    failed: mutation.isError,
    errorMessage,
    openOrder: openOrder.order,
    cartItemIds,
    isInCart,
    addSuggestion: (menuItemId: string) => {
      const item = itemsById.get(menuItemId)
      if (item) cart.addItem(item)
    },
  }
}
