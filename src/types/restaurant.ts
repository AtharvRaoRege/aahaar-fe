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
  isActive: boolean
}

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
}
