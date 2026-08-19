import { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'

import { RouteLoading } from '@/components/global/route-loading'
import { useClerkSyncPending } from '@/lib/auth/clerk-sync-state'
import { useAuth } from '@/lib/auth/use-auth'

/** Guards dashboard routes; redirects to login and reacts to token expiry. */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  const syncing = useClerkSyncPending()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onUnauthorized = () => navigate('/dashboard/login', { replace: true })
    // Still signed in, just not approved yet — the waitlist screen, not login.
    const onWaitlisted = () => navigate('/dashboard/waitlist', { replace: true })
    window.addEventListener('aahaar:unauthorized', onUnauthorized)
    window.addEventListener('aahaar:waitlisted', onWaitlisted)
    return () => {
      window.removeEventListener('aahaar:unauthorized', onUnauthorized)
      window.removeEventListener('aahaar:waitlisted', onWaitlisted)
    }
  }, [navigate])

  if (!isAuthenticated) {
    // Signed in with Clerk, waiting on our own session: holding here is the
    // difference between "signing you in" and a login screen that looks like a
    // failure before it redirects a second later.
    if (syncing) return <RouteLoading />
    return <Navigate to="/dashboard/login" replace state={{ from: location.pathname }} />
  }
  return <>{children}</>
}
