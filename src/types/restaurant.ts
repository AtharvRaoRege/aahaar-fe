export interface DayHours {
  closed: boolean
  opens: string | null
  closes: string | null
}

export type OpeningHours = Record<string, DayHours>

export interface Restaurant {
  id: string
  tenantId: string
  name: string
  venueKind: 'RESTAURANT' | 'HOTEL' | 'CAFE'
  slug: string
  description: string | null
  logoUrl: string | null
  coverImageUrl: string | null
  phone: string | null
  address: string | null
  currency: string
  timezone: string
  primaryColor: string
  secondaryColor: string
  mapsUrl: string | null
  googleReviewUrl: string | null
  upiVpa: string | null
  upiPayeeName: string | null
  openingHours: OpeningHours | null
  waiterCallEnabled: boolean
  isActive: boolean
  isPublished: boolean
}

export type UnavailableReason = 'NOT_PUBLISHED' | 'SUSPENDED'

export interface PublicRestaurant {
  id: string
  name: string
  slug: string
  description: string | null
  logoUrl: string | null
  coverImageUrl: string | null
  phone: string | null
  address: string | null
  currency: string
  primaryColor: string
  secondaryColor: string
  mapsUrl: string | null
  googleReviewUrl: string | null
  upiVpa: string | null
  upiPayeeName: string | null
  openingHours: OpeningHours | null
  waiterCallEnabled: boolean
  isServing: boolean
  unavailableReason: UnavailableReason | null
}

export interface PublishReadiness {
  isComplete: boolean
  isPublished: boolean
  hasLogo: boolean
  hasAddress: boolean
  hasPhone: boolean
  hasCategory: boolean
  hasMenuItem: boolean
  hasTableQr: boolean
  blockers: string[]
}
