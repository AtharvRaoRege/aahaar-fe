import { api } from '@/lib/api/client'
import type { Page } from '@/types/common'
import type { CreateReviewPayload, Review, ReviewSummary } from '@/types/review'

export const reviewsApi = {
  async createPublic(slug: string, payload: CreateReviewPayload): Promise<Review> {
    const { data } = await api.post<Review>(`/public/restaurants/${slug}/reviews`, payload)
    return data
  },
  async publicSummary(slug: string): Promise<ReviewSummary> {
    const { data } = await api.get<ReviewSummary>(`/public/restaurants/${slug}/reviews/summary`)
    return data
  },
  async list(restaurantId: string, page = 1, pageSize = 20): Promise<Page<Review>> {
    const { data } = await api.get<Page<Review>>(`/restaurants/${restaurantId}/reviews`, {
      params: { page, pageSize },
    })
    return data
  },
  async summary(restaurantId: string): Promise<ReviewSummary> {
    const { data } = await api.get<ReviewSummary>(`/restaurants/${restaurantId}/reviews/summary`)
    return data
  },
}
