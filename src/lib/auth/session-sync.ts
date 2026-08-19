import type { QueryClient } from '@tanstack/react-query'

import { tokenStore } from '@/lib/auth/token-store'
import { queryKeys } from '@/lib/query/keys'
import type { Tokens, User } from '@/types/auth'

/**
 * Two places answer "who am I": the token store, and the ``me`` query that
 * StaffGate routes on. Writing only the token store leaves the gate deciding from
 * a stale copy — that is how saving a phone number bounced straight back to the
 * phone screen, because the cached user still had no phone.
 *
 * These helpers keep both in step. ``setQueryData`` rather than an invalidation:
 * the response we just received *is* the authoritative user, so there is nothing
 * worth a second round trip.
 */
export function adoptUser(queryClient: QueryClient, user: User): void {
  tokenStore.setUser(user)
  queryClient.setQueryData(queryKeys.me, user)
}

/** Same, for a fresh sign-in that also carries a token pair. */
export function adoptSession(queryClient: QueryClient, user: User, tokens: Tokens): void {
  tokenStore.setSession(user, tokens)
  queryClient.setQueryData(queryKeys.me, user)
}
