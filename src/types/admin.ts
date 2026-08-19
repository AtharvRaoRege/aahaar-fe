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
  ownerPhone: string | null
  createdAt: string | null
  plan: 'BASIC' | 'PRO' | null
  subscriptionStatus: string | null
  trialEndsAt: string | null
  currentPeriodEnd: string | null
}

export interface PlanRequestRow {
  id: string
  restaurantId: string
  restaurantName: string
  requestedPlan: 'BASIC' | 'PRO'
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  ownerName: string | null
  ownerEmail: string | null
  ownerPhone: string | null
  createdAt: string | null
}
