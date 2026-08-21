import type { QueryClient } from '@tanstack/react-query'

import { queryKeys } from '@/lib/query/keys'

/** Bust guest-facing caches after staff edits or publish. */
export function invalidatePublicVenue(queryClient: QueryClient, slug: string | null | undefined) {
  if (!slug) return
  void queryClient.invalidateQueries({ queryKey: queryKeys.publicRestaurant(slug) })
  void queryClient.invalidateQueries({ queryKey: queryKeys.publicMenu(slug) })
  void queryClient.invalidateQueries({ queryKey: queryKeys.publicOffers(slug) })
}
