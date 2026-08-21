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
  minItemCount: number
  minOrderAmount: number
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
  minItemCount: number
  minOrderAmount: number
  endsAt: string | null
}

export interface OfferPayload {
  kind: OfferKind
  title: string
  description: string | null
  terms: string | null
  couponCode: string | null
  value: number | null
  minItemCount: number
  minOrderAmount: number
  startsAt: string | null
  endsAt: string | null
  isActive: boolean
}

export interface VerifyOfferPayload {
  couponCode: string
  items: Array<{
    menuItemId: string
    quantity: number
    variantId?: string | null
    addonIds?: string[]
    notes?: string | null
  }>
}

export interface VerifyOfferResult {
  offerId: string
  title: string
  couponCode: string
  discount: number
  subtotal: number
  total: number
}
