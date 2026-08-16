import type { WaitlistUser } from '@/types/auth'
import type { Restaurant } from '@/types/restaurant'

export interface AdminMember extends WaitlistUser {
  restaurantId: string | null
  restaurantName: string | null
  venueKind: Restaurant['venueKind'] | null
}

export interface AdminVenue extends Restaurant {
  ownerId: string | null
  ownerName: string | null
  ownerEmail: string | null
  createdAt: string | null
}
