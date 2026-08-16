import { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'

import { useAuth } from '@/lib/auth/use-auth'

/** Guards dashboard routes; redirects to login and reacts to token expiry. */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onUnauthorized = () => navigate('/dashboard/login', { replace: true })
    window.addEventListener('aahaar:unauthorized', onUnauthorized)
    return () => window.removeEventListener('aahaar:unauthorized', onUnauthorized)
  }, [navigate])

  if (!isAuthenticated) {
    return <Navigate to="/dashboard/login" replace state={{ from: location.pathname }} />
  }
  return <>{children}</>
}
