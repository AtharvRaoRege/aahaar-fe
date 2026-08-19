import { useEffect, useRef, useState } from 'react'
import { useAuth as useClerkAuth } from '@clerk/react'
import { useQueryClient } from '@tanstack/react-query'

import { authApi } from '@/lib/api/auth'
import { isClerkSyncBlocked } from '@/lib/auth/session-guard'
import { adoptSession } from '@/lib/auth/session-sync'
import { tokenStore } from '@/lib/auth/token-store'
import { useAuth } from '@/lib/auth/use-auth'

/** After Google SSO, exchange the Clerk session for Aahaar JWT + DB user. */
export function ClerkSessionBridge() {
  const { isLoaded, isSignedIn, getToken } = useClerkAuth()
  const { isAuthenticated } = useAuth()
  const queryClient = useQueryClient()
  const inFlight = useRef(false)
  const hadClerkSession = useRef(false)
  const [retryTick, setRetryTick] = useState(0)
  const retries = useRef(0)

  useEffect(() => {
    if (!isLoaded) return
    if (isSignedIn) {
      hadClerkSession.current = true
      return
    }
    if (hadClerkSession.current && isAuthenticated) {
      hadClerkSession.current = false
      tokenStore.clear()
    }
  }, [isLoaded, isSignedIn, isAuthenticated])

  useEffect(() => {
    if (isClerkSyncBlocked()) return
    if (!isSignedIn || isAuthenticated || inFlight.current) return
    inFlight.current = true
    void (async () => {
      try {
        const token = await getToken()
        if (!token) {
          inFlight.current = false
          return
        }
        const result = await authApi.syncClerk(token)
        adoptSession(queryClient, result.user, result.tokens)
        retries.current = 0
      } catch {
        inFlight.current = false
        if (retries.current >= 5) return
        retries.current += 1
        window.setTimeout(() => setRetryTick((tick) => tick + 1), 800 * retries.current)
      }
    })()
  }, [isSignedIn, isAuthenticated, getToken, retryTick, queryClient])

  return null
}
