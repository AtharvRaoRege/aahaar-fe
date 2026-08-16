import { useOutletContext } from 'react-router-dom'

import type { Restaurant } from '@/types/restaurant'

export interface DashboardOutlet {
  restaurant: Restaurant | null
}

export function useDashboardContext(): DashboardOutlet {
  return useOutletContext<DashboardOutlet>()
}
