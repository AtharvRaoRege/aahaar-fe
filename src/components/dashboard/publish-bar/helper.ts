import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { restaurantsApi } from '@/lib/api/restaurants'
import { queryKeys } from '@/lib/query/keys'
import { errorMessage } from '@/utils/error-message'
import type { PublishReadiness } from '@/types/restaurant'

/** Blocker keys the API returns, in the order an owner should tackle them. */
export const BLOCKER_ORDER = [
  'logo',
  'address',
  'phone',
  'category',
  'menuItem',
  'tableQr',
] as const

export type BlockerKey = (typeof BLOCKER_ORDER)[number]

export function sortBlockers(readiness: PublishReadiness | null): BlockerKey[] {
  if (!readiness) return []
  const present = new Set(readiness.blockers)
  return BLOCKER_ORDER.filter((key) => present.has(key))
}

export function usePublishBar(restaurantId: string) {
  const queryClient = useQueryClient()

  const readinessQuery = useQuery({
    queryKey: queryKeys.publishReadiness(restaurantId),
    queryFn: () => restaurantsApi.publishReadiness(restaurantId),
  })

  const publish = useMutation({
    mutationFn: (isPublished: boolean) =>
      restaurantsApi.setPublished(restaurantId, isPublished),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.publishReadiness(restaurantId),
      })
      void queryClient.invalidateQueries({ queryKey: queryKeys.restaurants })
      void queryClient.invalidateQueries({ queryKey: queryKeys.restaurant(restaurantId) })
    },
  })

  const readiness = readinessQuery.data ?? null

  return {
    readiness,
    isLoading: readinessQuery.isLoading,
    blockers: sortBlockers(readiness),
    busy: publish.isPending,
    error: publish.isError ? errorMessage(publish.error) : null,
    goLive: () => publish.mutate(true),
    takeOffline: () => publish.mutate(false),
  }
}
