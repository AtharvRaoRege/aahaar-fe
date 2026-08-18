import { useCallback, useEffect, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'

import { useOpenOrder } from '@/hooks/customer/use-open-order/helper'
import { ordersApi } from '@/lib/api/orders'
import { useCart } from '@/lib/cart/cart-context'
import { guestOrderStore } from '@/lib/customer/guest-order-store'
import { customerPath } from '@/lib/customer/paths'
import { queryKeys } from '@/lib/query/keys'
import { createSocket, SOCKET_EVENTS } from '@/lib/socket/socket'
import type { Order, OrderEvent } from '@/types/order'

function trackOrderId(pathname: string): string | null {
  const match = pathname.match(/\/track\/([^/]+)/)
  return match?.[1] ?? null
}

function isDead(status: string | undefined): boolean {
  return status === 'REJECTED' || status === 'CANCELLED'
}

export function useGuestOrderWatch(restaurantId: string, slug: string, tableNumber: string | null) {
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()
  const { clear: clearCart } = useCart()
  const openOrder = useOpenOrder(restaurantId)
  const sessionId = openOrder.sessionId
  const orderId =
    trackOrderId(location.pathname) ?? openOrder.order?.id ?? guestOrderStore.get(restaurantId)
  const handled = useRef<string | null>(null)
  const hadOpen = useRef(false)
  const [notice, setNotice] = useState(false)
  const onTrack = location.pathname.includes('/track/')

  const query = useQuery({
    queryKey: queryKeys.order(orderId ?? 'none'),
    queryFn: () => ordersApi.get(orderId!),
    enabled: Boolean(orderId),
    refetchInterval: 8_000,
  })

  const clearRejected = useCallback(
    (order: { id: string; status: string }) => {
      const stamp = `${order.id}:${order.status}`
      if (handled.current === stamp) return
      handled.current = stamp
      guestOrderStore.clear(restaurantId)
      clearCart()
      if (sessionId) {
        queryClient.setQueryData(queryKeys.openOrder(sessionId), null)
        void queryClient.invalidateQueries({ queryKey: queryKeys.openOrder(sessionId) })
      }
      void queryClient.invalidateQueries({ queryKey: queryKeys.order(order.id) })
      setNotice(true)
      if (onTrack) {
        navigate(customerPath(slug, '/menu', tableNumber), { replace: true })
      }
    },
    [clearCart, navigate, onTrack, queryClient, restaurantId, sessionId, setNotice, slug, tableNumber],
  )

  useEffect(() => {
    const order = query.data
    if (order && isDead(order.status)) clearRejected(order)
  }, [clearRejected, query.data])

  useEffect(() => {
    if (openOrder.order) {
      hadOpen.current = true
      return
    }
    if (!hadOpen.current || !orderId || openOrder.isFetching) return
    void queryClient.invalidateQueries({ queryKey: queryKeys.order(orderId) })
  }, [openOrder.order, openOrder.isFetching, orderId, queryClient])

  useEffect(() => {
    if (!orderId) return
    const socket = createSocket()
    const onEvent = (event: OrderEvent) => {
      if (event.orderId !== orderId) return
      queryClient.setQueryData(queryKeys.order(orderId), (current: Order | undefined) => {
        if (!current) return current
        return { ...current, status: event.status, updatedAt: event.updatedAt }
      })
      if (isDead(event.status)) {
        clearRejected({ id: event.orderId, status: event.status })
      }
      void queryClient.invalidateQueries({ queryKey: queryKeys.order(orderId) })
    }
    const join = () => {
      socket.emit(SOCKET_EVENTS.joinOrder, { orderId })
    }
    socket.on(SOCKET_EVENTS.orderRejected, onEvent)
    socket.on(SOCKET_EVENTS.orderStatusUpdated, onEvent)
    socket.on(SOCKET_EVENTS.orderUpdated, onEvent)
    socket.on('connect', join)
    if (socket.connected) join()
    return () => {
      socket.emit('leave_order', { orderId })
      socket.off(SOCKET_EVENTS.orderRejected, onEvent)
      socket.off(SOCKET_EVENTS.orderStatusUpdated, onEvent)
      socket.off(SOCKET_EVENTS.orderUpdated, onEvent)
      socket.off('connect', join)
      socket.disconnect()
    }
  }, [clearRejected, orderId, queryClient])

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(false), 8000)
    return () => window.clearTimeout(timer)
  }, [notice])

  return {
    notice,
    dismiss: () => setNotice(false),
  }
}
