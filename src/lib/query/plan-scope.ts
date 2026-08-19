import type { QueryClient } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query/keys'

/**
 * Refresh everything whose answer depends on the current plan.
 *
 * Upgrading has to light up Pro surfaces immediately, and several of them are
 * keyed independently of the subscription itself: the insights summary carries
 * its own server-computed ``isPro``, the dish list is plan-gated, and the menu
 * and offers screens read the plan to decide what to show. Invalidating only the
 * subscription query left those stale until a manual refresh.
 */
export function invalidatePlanScopedQueries(
  queryClient: QueryClient,
  restaurantId: string,
): void {
  const keys = [
    queryKeys.subscription(restaurantId),
    queryKeys.restaurants,
    queryKeys.restaurant(restaurantId),
    queryKeys.publishReadiness(restaurantId),
    queryKeys.offers(restaurantId),
    queryKeys.dashboardMenu(restaurantId),
    // Range is part of these keys, so match on the prefix rather than one range.
    ['analytics'],
    ['upsells'],
  ]
  for (const queryKey of keys) {
    void queryClient.invalidateQueries({ queryKey })
  }
}
