import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { useSocketConnected } from '@/hooks/global/use-live-socket/helper'
import { publicApi } from '@/lib/api/public'
import { guestOrderStore } from '@/lib/customer/guest-order-store'
import { sessionStore } from '@/lib/customer/session-store'
import { clearTableState } from '@/lib/customer/table-state'
import { fallbackPoll, freshFor } from '@/lib/query/cache'
import { queryKeys } from '@/lib/query/keys'
import { ACTIVE_ORDER_STATUSES } from '@/types/order'
import type { Order } from '@/types/order'

export function isOpenOrder(order: Order | null | undefined): order is Order {
  return Boolean(order && ACTIVE_ORDER_STATUSES.includes(order.status))
}

export function useOpenOrder(restaurantId: string) {
  const session = sessionStore.get(restaurantId)
  // Order events invalidate this key, so the timer is only a safety net for a
  // guest whose phone has dropped the live connection.
  const live = useSocketConnected()
  const query = useQuery({
    queryKey: queryKeys.openOrder(session?.id ?? 'none'),
    queryFn: () => publicApi.getOpenOrder(session!.id),
    enabled: Boolean(session?.id),
    staleTime: freshFor.live,
    refetchInterval: fallbackPoll(live, 30_000),
  })
  const order = isOpenOrder(query.data) ? query.data : null

  useEffect(() => {
    if (order) {
      guestOrderStore.set(restaurantId, order.id)
      return
    }
    // Settled with no open ticket, but we were tracking one: it closed, so the
    // seating is finished and the stored identity must not carry over.
    if (query.isSuccess && guestOrderStore.get(restaurantId)) {
      clearTableState(restaurantId)
    }
  }, [order, query.isSuccess, restaurantId])

  return { ...query, order, sessionId: session?.id ?? null }
}
