import { useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { useOpenOrder } from '@/hooks/customer/use-open-order/helper'
import { ApiRequestError } from '@/lib/api/client'
import { ordersApi } from '@/lib/api/orders'
import { useCart } from '@/lib/cart/cart-context'
import { guestOrderStore } from '@/lib/customer/guest-order-store'
import { customerPath } from '@/lib/customer/paths'
import { sessionStore } from '@/lib/customer/session-store'
import { ensureTableSession } from '@/lib/customer/table-session'
import { queryKeys } from '@/lib/query/keys'

export function useCartPage(slug: string, restaurantId: string, tableNumber: string | null) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const cart = useCart()
  const session = sessionStore.get(restaurantId)
  const table = tableNumber ?? session?.tableNumber ?? null
  const idempotencyKey = useRef(crypto.randomUUID())
  const openOrder = useOpenOrder(restaurantId)

  const mutation = useMutation({
    mutationFn: async () => {
      let current = sessionStore.get(restaurantId)
      if (!current && table) {
        current = await ensureTableSession(restaurantId, slug, table)
      }
      if (!current) throw new Error('NO_SESSION')
      try {
        return await ordersApi.create(
          {
            restaurantId,
            customerSessionId: current.id,
            items: cart.toOrderItems(),
            notes: cart.orderNotes.trim() || null,
          },
          idempotencyKey.current,
        )
      } catch (error) {
        const expired =
          error instanceof ApiRequestError &&
          (error.code === 'SESSION_EXPIRED' || error.code === 'INVALID_SESSION')
        if (!expired || !table) throw error
        sessionStore.clear(restaurantId)
        throw new Error('NO_SESSION', { cause: error })
      }
    },
    onSuccess: (order) => {
      cart.clear()
      idempotencyKey.current = crypto.randomUUID()
      guestOrderStore.set(restaurantId, order.id)
      if (order.customerSessionId) {
        void queryClient.invalidateQueries({ queryKey: queryKeys.openOrder(order.customerSessionId) })
      }
      navigate(customerPath(slug, `/track/${order.id}`, table), { replace: true })
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
  }
}
