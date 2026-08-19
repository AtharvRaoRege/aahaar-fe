export type OfferKind =
  | 'PERCENT'
  | 'FLAT'
  | 'BOGO'
  | 'COMBO'
  | 'HAPPY_HOUR'
  | 'SPECIAL_DAY'

export type OfferState = 'DRAFT' | 'SCHEDULED' | 'LIVE' | 'EXPIRED'

export interface Offer {
  id: string
  restaurantId: string
  kind: OfferKind
  title: string
  description: string | null
  terms: string | null
  imageUrl: string | null
  couponCode: string | null
  value: number | null
  startsAt: string | null
  endsAt: string | null
  isActive: boolean
  sortOrder: number
  state: OfferState
}

export interface PublicOffer {
  id: string
  kind: OfferKind
  title: string
  description: string | null
  terms: string | null
  imageUrl: string | null
  couponCode: string | null
  value: number | null
  endsAt: string | null
}

export interface OfferPayload {
  kind: OfferKind
  title: string
  description: string | null
  terms: string | null
  couponCode: string | null
  value: number | null
  startsAt: string | null
  endsAt: string | null
  isActive: boolean
}
