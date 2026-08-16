import type { Tokens, User } from '@/types/auth'

import { allowClerkSync } from '@/lib/auth/session-guard'

const ACCESS_KEY = 'aahaar.accessToken'
const REFRESH_KEY = 'aahaar.refreshToken'
const USER_KEY = 'aahaar.user'

export interface AuthSnapshot {
  user: User | null
  isAuthenticated: boolean
}

type Listener = () => void
const listeners = new Set<Listener>()

function compute(): AuthSnapshot {
  const access = localStorage.getItem(ACCESS_KEY)
  let user: User | null = null
  const raw = localStorage.getItem(USER_KEY)
  if (raw) {
    try {
      user = JSON.parse(raw) as User
    } catch {
      user = null
    }
  }
  return { user, isAuthenticated: Boolean(access) }
}

// Cached reference so useSyncExternalStore gets a stable snapshot.
let snapshot: AuthSnapshot = compute()

function refresh() {
  snapshot = compute()
  listeners.forEach((fn) => fn())
}

export const tokenStore = {
  getAccess: (): string | null => localStorage.getItem(ACCESS_KEY),
  getRefresh: (): string | null => localStorage.getItem(REFRESH_KEY),
  getSnapshot: (): AuthSnapshot => snapshot,

  setTokens(tokens: Tokens) {
    localStorage.setItem(ACCESS_KEY, tokens.accessToken)
    localStorage.setItem(REFRESH_KEY, tokens.refreshToken)
    refresh()
  },
  setSession(user: User, tokens: Tokens) {
    localStorage.setItem(ACCESS_KEY, tokens.accessToken)
    localStorage.setItem(REFRESH_KEY, tokens.refreshToken)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    allowClerkSync()
    refresh()
  },
  setUser(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    refresh()
  },
  clear() {
    localStorage.removeItem(ACCESS_KEY)
    localStorage.removeItem(REFRESH_KEY)
    localStorage.removeItem(USER_KEY)
    refresh()
  },
  subscribe(listener: Listener): () => void {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
}
