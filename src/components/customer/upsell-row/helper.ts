import { useQueries } from '@tanstack/react-query'

import { publicApi } from '@/lib/api/public'
import { freshFor } from '@/lib/query/cache'
import { queryKeys } from '@/lib/query/keys'
import type { UpsellSuggestion } from '@/types/menu'

const MAX_SUGGESTIONS = 3

/**
 * Suggestions for what is already in the cart, minus anything the diner has
 * added. Owner-configured pairings only — nothing is inferred, so a suggestion
 * is always something the kitchen actually wants to sell together.
 */
export function useCartUpsells(
  slug: string,
  cartItemIds: string[],
  isInCart: (menuItemId: string) => boolean,
) {
  const queries = useQueries({
    queries: cartItemIds.map((menuItemId) => ({
      queryKey: queryKeys.publicUpsells(slug, menuItemId),
      queryFn: () => publicApi.getUpsells(slug, menuItemId),
      enabled: Boolean(slug),
      staleTime: freshFor.slow,
    })),
  })

  // Cheap to recompute (at most a handful of entries), so no memo is needed —
  // and a memo here would have to key on an unstable query array anyway.
  const seen = new Set<string>()
  const suggestions: UpsellSuggestion[] = []
  for (const query of queries) {
    for (const suggestion of query.data?.suggestions ?? []) {
      if (suggestions.length >= MAX_SUGGESTIONS) break
      if (seen.has(suggestion.menuItemId)) continue
      if (isInCart(suggestion.menuItemId)) continue
      seen.add(suggestion.menuItemId)
      suggestions.push(suggestion)
    }
  }

  return { suggestions }
}
