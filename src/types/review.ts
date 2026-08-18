export interface Review {
  id: string
  restaurantId: string
  orderId: string | null
  rating: number
  comment: string | null
  improvement: string | null
  createdAt: string
}

export interface ReviewSummary {
  average: number
  count: number
  distribution: Record<string, number>
}

export interface CreateReviewPayload {
  rating: number
  comment?: string
  improvement?: string
  orderId?: string
}
