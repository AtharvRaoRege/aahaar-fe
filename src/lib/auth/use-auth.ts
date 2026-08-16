import { useSyncExternalStore } from 'react'

import { clearLocalSession } from '@/lib/auth/local-session'
import { tokenStore } from '@/lib/auth/token-store'
import type { AuthSnapshot } from '@/lib/auth/token-store'

export function useAuth(): AuthSnapshot & { logout: () => void } {
  const snapshot = useSyncExternalStore(
    tokenStore.subscribe,
    tokenStore.getSnapshot,
    tokenStore.getSnapshot,
  )
  return {
    ...snapshot,
    logout: () => clearLocalSession(),
  }
}
