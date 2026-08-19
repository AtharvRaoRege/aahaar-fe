import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth as useClerkAuth, useSignIn, useSignUp } from '@clerk/react'

import { authApi } from '@/lib/api/auth'
import { clerkErrorCode } from '@/lib/auth/clerk-errors'
import { adoptSession } from '@/lib/auth/session-sync'
import { staffHomePath } from '@/lib/auth/staff-home'

export function useGoogleSignIn(intent: 'sign-in' | 'sign-up' = 'sign-in') {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { signIn, fetchStatus: signInFetch } = useSignIn()
  const { signUp, fetchStatus: signUpFetch } = useSignUp()
  const { isSignedIn, getToken } = useClerkAuth()
  const [pending, setPending] = useState(false)
  const [failed, setFailed] = useState(false)

  const ready = Boolean(intent === 'sign-up' ? signUp : signIn)

  const syncAahaarSession = async () => {
    const token = await getToken()
    if (!token) throw new Error('missing clerk token')
    const result = await authApi.syncClerk(token)
    adoptSession(queryClient, result.user, result.tokens)
    navigate(staffHomePath(result.user), { replace: true })
  }

  const startGoogle = () => {
    if (!ready) return
    setFailed(false)
    setPending(true)
    void (async () => {
      try {
        if (isSignedIn) {
          await syncAahaarSession()
          setPending(false)
          return
        }
        const redirect = {
          strategy: 'oauth_google' as const,
          redirectUrl: '/dashboard/login',
          redirectCallbackUrl: '/dashboard/sso-callback',
        }
        const result =
          intent === 'sign-up'
            ? await signUp.sso(redirect)
            : await signIn.sso(redirect)
        if (result.error) {
          if (clerkErrorCode(result.error) === 'session_exists' || isSignedIn) {
            await syncAahaarSession()
            setPending(false)
            return
          }
          throw result.error
        }
      } catch (error) {
        if (clerkErrorCode(error) === 'session_exists' || isSignedIn) {
          try {
            await syncAahaarSession()
            setPending(false)
            return
          } catch {
            // fall through
          }
        }
        setFailed(true)
        setPending(false)
      }
    })()
  }

  return {
    startGoogle,
    pending: pending || signInFetch === 'fetching' || signUpFetch === 'fetching',
    failed,
    ready,
  }
}
