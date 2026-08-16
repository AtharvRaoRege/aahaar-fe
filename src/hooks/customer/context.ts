import { useOutletContext } from 'react-router-dom'

import type { PublicRestaurant } from '@/types/restaurant'

export interface CustomerOutlet {
  restaurant: PublicRestaurant
  slug: string
  tableNumber: string | null
}

export function useCustomerContext(): CustomerOutlet {
  return useOutletContext<CustomerOutlet>()
}
