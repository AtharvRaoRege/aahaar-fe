import { useOutletContext } from 'react-router-dom'

import type { Restaurant } from '@/types/restaurant'

export interface DashboardOutlet {
  restaurant: Restaurant | null
  venueLoading: boolean
  venueError: boolean
  refetchVenue: () => void
}

export function useDashboardContext(): DashboardOutlet {
  return useOutletContext<DashboardOutlet>()
}
