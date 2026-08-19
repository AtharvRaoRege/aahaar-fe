import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/lib/auth/use-auth'

export const DEMO_SLUG = 'spice-garden'

export const MARQUEE_KEYS = [
  'landing.stepScan',
  'landing.stepBrowse',
  'landing.stepOrder',
  'landing.stepTrack',
] as const

export const MARQUEE_LOOP = [
  ...MARQUEE_KEYS,
  ...MARQUEE_KEYS,
  ...MARQUEE_KEYS,
  ...MARQUEE_KEYS,
] as const

export const FLOW = [
  { titleKey: 'landing.stepScan', bodyKey: 'landing.flowScanBody', mark: '01' },
  { titleKey: 'landing.stepBrowse', bodyKey: 'landing.flowBrowseBody', mark: '02' },
  { titleKey: 'landing.stepOrder', bodyKey: 'landing.flowOrderBody', mark: '03' },
  { titleKey: 'landing.stepTrack', bodyKey: 'landing.flowTrackBody', mark: '04' },
] as const

export function useLandingPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  return {
    isAuthenticated,
    goDemo: () => navigate(`/r/${DEMO_SLUG}/menu?table=1`),
    goLogin: () => navigate('/dashboard/login'),
    goRegister: () => navigate('/dashboard/login?mode=register'),
    // Straight to /dashboard: StaffGate already decides whether that means the
    // order screen, the setup wizard, or the waitlist.
    goKitchen: () => navigate('/dashboard'),
  }
}
