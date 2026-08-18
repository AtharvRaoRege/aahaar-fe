import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { publicApi } from '@/lib/api/public'
import { guestOrderStore } from '@/lib/customer/guest-order-store'
import { sessionStore } from '@/lib/customer/session-store'
import { queryKeys } from '@/lib/query/keys'
import { ACTIVE_ORDER_STATUSES } from '@/types/order'
import type { Order } from '@/types/order'

export function isOpenOrder(order: Order | null | undefined): order is Order {
  return Boolean(order && ACTIVE_ORDER_STATUSES.includes(order.status))
}

export function useOpenOrder(restaurantId: string) {
  const session = sessionStore.get(restaurantId)
  const query = useQuery({
    queryKey: queryKeys.openOrder(session?.id ?? 'none'),
    queryFn: () => publicApi.getOpenOrder(session!.id),
    enabled: Boolean(session?.id),
    refetchInterval: 15_000,
  })
  const order = isOpenOrder(query.data) ? query.data : null

  useEffect(() => {
    if (order) guestOrderStore.set(restaurantId, order.id)
  }, [order, restaurantId])

  return { ...query, order, sessionId: session?.id ?? null }
}
