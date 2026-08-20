import { useNavigate } from 'react-router-dom'

import { useDashboardContext } from '@/hooks/dashboard/context'
import { useAuth } from '@/lib/auth/use-auth'
import type { Restaurant } from '@/types/restaurant'

export type VenueScreenState =
  | { status: 'loading' }
  | { status: 'error'; refetchVenue: () => void }
  | { status: 'empty'; goSetup: () => void; isSuperAdmin: boolean }
  | { status: 'ready'; restaurant: Restaurant }

export function useVenueScreen(): VenueScreenState {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { restaurant, venueLoading, venueError, refetchVenue } = useDashboardContext()

  if (venueLoading) return { status: 'loading' }
  if (venueError) return { status: 'error', refetchVenue }
  if (!restaurant) {
    return {
      status: 'empty',
      isSuperAdmin: Boolean(user?.isSuperAdmin),
      goSetup: () => {
        navigate(user?.isSuperAdmin ? '/dashboard/admin' : '/dashboard/setup')
      },
    }
  }
  return { status: 'ready', restaurant }
}
