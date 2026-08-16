export interface CustomerSession {
  id: string
  restaurantId: string
  name: string
  contactNumber: string | null
  guestCount: number
  tableNumber: string | null
  roomNumber: string | null
  createdAt: string
  expiresAt: string
}

export interface CreateCustomerSessionPayload {
  slug?: string
  restaurantId?: string
  name?: string | null
  contactNumber?: string | null
  guestCount?: number
  tableNumber: string
  roomNumber?: string | null
}
