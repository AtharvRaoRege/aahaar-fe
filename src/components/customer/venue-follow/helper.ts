import type { PublicRestaurant } from '@/types/restaurant'

export function followLinks(restaurant: PublicRestaurant) {
  const instagram = restaurant.instagramUrl?.trim() || null
  const googleReview = restaurant.googleReviewUrl?.trim() || null
  return {
    instagram,
    googleReview,
    visible: Boolean(instagram || googleReview),
  }
}
