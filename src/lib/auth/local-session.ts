import { impersonationStore } from '@/lib/dashboard/impersonation-store'
import { restaurantStore } from '@/lib/dashboard/restaurant-store'
import { tokenStore } from '@/lib/auth/token-store'
import { blockClerkSync } from '@/lib/auth/session-guard'

export const SESSION_REPLACED_KEY = 'aahaar.sessionReplaced'

export function clearLocalSession() {
  tokenStore.clear()
  restaurantStore.clear()
  impersonationStore.clear()
}

export function markSessionReplaced() {
  blockClerkSync()
  sessionStorage.setItem(SESSION_REPLACED_KEY, '1')
}

export function consumeSessionReplaced() {
  const replaced = sessionStorage.getItem(SESSION_REPLACED_KEY) === '1'
  if (replaced) sessionStorage.removeItem(SESSION_REPLACED_KEY)
  return replaced
}
