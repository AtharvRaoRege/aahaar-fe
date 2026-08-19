import { QueryClient } from '@tanstack/react-query'

import { freshFor, keepFor } from '@/lib/query/cache'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Freshness is the only lever that decides whether navigating costs a
      // request. Everything that can change either arrives over the live socket
      // or is invalidated by the mutation that changed it, so the default is to
      // trust the cache for a while.
      staleTime: freshFor.ownAction,
      // Long enough that going back to a screen is free rather than a refetch.
      gcTime: keepFor.standard,
      retry: 1,
      // Both of these only fire for data already past its staleTime, so they
      // cost nothing while the cache is fresh and guarantee the guest or the
      // kitchen never reads a stale screen after being away.
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
})
