import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'

import { ordersApi } from '@/lib/api/orders'
import { reviewsApi } from '@/lib/api/reviews'
import { customerPath } from '@/lib/customer/paths'
import { queryKeys } from '@/lib/query/keys'
import { createSocket, SOCKET_EVENTS } from '@/lib/socket/socket'
import { errorMessage } from '@/utils/error-message'
import { ACTIVE_ORDER_STATUSES } from '@/types/order'
import type { Order, OrderEvent, OrderStatus } from '@/types/order'

export const GUEST_STEPS = [
  { id: 'placed', statuses: ['PENDING'] },
  { id: 'cooking', statuses: ['ACCEPTED', 'PREPARING'] },
  { id: 'ready', statuses: ['READY'] },
  { id: 'served', statuses: ['SERVED', 'COMPLETED'] },
] as const

export type GuestStepId = (typeof GUEST_STEPS)[number]['id']

export function guestStepState(
  status: OrderStatus,
  stepId: GuestStepId,
): 'done' | 'current' | 'upcoming' {
  if (status === 'COMPLETED') return 'done'
  if (status === 'REJECTED' || status === 'CANCELLED') {
    return stepId === 'placed' ? 'done' : 'upcoming'
  }
  const currentIndex = GUEST_STEPS.findIndex((step) =>
    (step.statuses as readonly OrderStatus[]).includes(status),
  )
  const index = GUEST_STEPS.findIndex((step) => step.id === stepId)
  if (index < currentIndex) return 'done'
  if (index === currentIndex) return 'current'
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

  const review = useMutation({
    mutationFn: (values: { rating: number; comment: string; improvement: string }) =>
      reviewsApi.createPublic(slug, {
        rating: values.rating,
        comment: values.comment || undefined,
        improvement: values.improvement || undefined,
        orderId,
      }),
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.order(orderId), (current: Order | undefined) => {
        if (!current) return current
        return { ...current, reviewed: true }
      })
    },
  })

  const order = query.data
  const canAddMore = Boolean(order && ACTIVE_ORDER_STATUSES.includes(order.status))

  return {
    query,
    orderId,
    canAddMore,
    goMenu: () => navigate(customerPath(slug, '/menu', tableNumber)),
    submitReview: review.mutate,
    reviewSubmitted: review.isSuccess || Boolean(query.data?.reviewed),
    reviewLoading: review.isPending,
    reviewError: review.isError ? errorMessage(review.error) : '',
  }
}
