import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'

import { ordersApi } from '@/lib/api/orders'
import { customerPath } from '@/lib/customer/paths'
import { queryKeys } from '@/lib/query/keys'
import { createSocket, SOCKET_EVENTS } from '@/lib/socket/socket'
import type { Order, OrderEvent, OrderStatus } from '@/types/order'

export const TRACK_STEPS: OrderStatus[] = [
  'PENDING',
  'ACCEPTED',
  'PREPARING',
  'READY',
  'SERVED',
  'COMPLETED',
]

export function stepState(
  status: OrderStatus,
  step: OrderStatus,
): 'done' | 'current' | 'upcoming' {
  if (status === 'REJECTED' || status === 'CANCELLED') {
    return step === 'PENDING' ? 'done' : 'upcoming'
  }
  const current = TRACK_STEPS.indexOf(status)
  const index = TRACK_STEPS.indexOf(step)
  if (index < current) return 'done'
  if (index === current) return 'current'
  return 'upcoming'
}

export function useOrderTracking(slug: string, tableNumber: string | null) {
  const { orderId = '' } = useParams<{ orderId: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: queryKeys.order(orderId),
    queryFn: () => ordersApi.get(orderId),
    enabled: Boolean(orderId),
    refetchInterval: 20_000,
  })

  useEffect(() => {
    if (!orderId) return
    const socket = createSocket()
    const refresh = (event?: OrderEvent) => {
      if (event && event.orderId !== orderId) return
      if (event) {
        queryClient.setQueryData(queryKeys.order(orderId), (current: Order | undefined) => {
          if (!current) return current
          return { ...current, status: event.status, updatedAt: event.updatedAt }
        })
      }
      void queryClient.invalidateQueries({ queryKey: queryKeys.order(orderId) })
    }
    const join = () => {
      socket.emit(SOCKET_EVENTS.joinOrder, { orderId })
    }
    socket.on(SOCKET_EVENTS.orderStatusUpdated, refresh)
    socket.on(SOCKET_EVENTS.orderAccepted, refresh)
    socket.on(SOCKET_EVENTS.orderRejected, refresh)
    socket.on(SOCKET_EVENTS.orderUpdated, refresh)
    socket.on('connect', () => {
      join()
      refresh()
    })
    if (socket.connected) join()
    return () => {
      socket.emit('leave_order', { orderId })
      socket.off(SOCKET_EVENTS.orderStatusUpdated, refresh)
      socket.off(SOCKET_EVENTS.orderAccepted, refresh)
      socket.off(SOCKET_EVENTS.orderRejected, refresh)
      socket.off(SOCKET_EVENTS.orderUpdated, refresh)
      socket.off('connect')
      socket.disconnect()
    }
  }, [orderId, queryClient])

  return {
    query,
    orderId,
    goMenu: () => navigate(customerPath(slug, '/menu', tableNumber)),
  }
}
