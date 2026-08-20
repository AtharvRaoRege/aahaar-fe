import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/lib/auth/use-auth'

/** Anchor ids, so the header can link into the page. */
export const SECTIONS = {
  top: 'top',
  pricing: 'pricing',
  start: 'start',
} as const

export function useLandingPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  // Straight to /dashboard when signed in: StaffGate already decides whether that
  // means the order screen, the setup wizard, or the waitlist.
  const goPrimary = useCallback(() => {
    navigate(isAuthenticated ? '/dashboard' : '/dashboard/login')
  }, [isAuthenticated, navigate])

  return { isAuthenticated, sections: SECTIONS, goPrimary }
}
