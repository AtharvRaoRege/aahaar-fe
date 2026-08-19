import { useCallback, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import type { Socket } from 'socket.io-client'

import { useLiveSocket } from '@/hooks/global/use-live-socket/helper'
import { ordersApi } from '@/lib/api/orders'
import { reviewsApi } from '@/lib/api/reviews'
import { customerPath } from '@/lib/customer/paths'
import { clearTableState } from '@/lib/customer/table-state'
import { fallbackPoll, freshFor } from '@/lib/query/cache'
import { queryKeys } from '@/lib/query/keys'
import { SOCKET_EVENTS } from '@/lib/socket/socket'
import { errorMessage } from '@/utils/error-message'
import { ACTIVE_ORDER_STATUSES } from '@/types/order'
import type { Order, OrderEvent, OrderStatus } from '@/types/order'

export const GUEST_STEPS = [
  { id: 'placed', statuses: ['PENDING'] },
  { id: 'preparing', statuses: ['ACCEPTED', 'PREPARING'] },
  { id: 'ready', statuses: ['READY', 'SERVED', 'COMPLETED'] },
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

  const bindLive = useCallback(
    (socket: Socket) => {
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
        refresh()
      }
      socket.on(SOCKET_EVENTS.orderStatusUpdated, refresh)
      socket.on(SOCKET_EVENTS.orderAccepted, refresh)
      socket.on(SOCKET_EVENTS.orderRejected, refresh)
      socket.on(SOCKET_EVENTS.orderUpdated, refresh)
      socket.on('connect', join)
      if (socket.connected) socket.emit(SOCKET_EVENTS.joinOrder, { orderId })
      return () => {
        socket.emit('leave_order', { orderId })
        socket.off(SOCKET_EVENTS.orderStatusUpdated, refresh)
        socket.off(SOCKET_EVENTS.orderAccepted, refresh)
        socket.off(SOCKET_EVENTS.orderRejected, refresh)
        socket.off(SOCKET_EVENTS.orderUpdated, refresh)
        socket.off('connect', join)
      }
    },
    [orderId, queryClient],
  )

  const live = useLiveSocket(Boolean(orderId), undefined, bindLive)

  const query = useQuery({
    queryKey: queryKeys.order(orderId),
    queryFn: () => ordersApi.get(orderId),
    enabled: Boolean(orderId),
    staleTime: freshFor.live,
    refetchInterval: fallbackPoll(live, 20_000),
  })

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
  const restaurantId = order?.restaurantId

  useEffect(() => {
    // Ticket closed: release the table so the next scan starts fresh. Safe to do
    // while this screen is open — it reads the order by id from the URL, not from
    // the stored session.
    if (!restaurantId || !order || ACTIVE_ORDER_STATUSES.includes(order.status)) return
    clearTableState(restaurantId)
  }, [order, restaurantId])

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
