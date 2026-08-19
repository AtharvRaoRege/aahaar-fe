import { useQuery } from '@tanstack/react-query'

import { reviewsApi } from '@/lib/api/reviews'
import { freshFor } from '@/lib/query/cache'
import { queryKeys } from '@/lib/query/keys'
import { formatClock, serviceWindow } from '@/utils/opening-hours'
import type { PublicRestaurant } from '@/types/restaurant'

/** Ratings below this many reviews are noise, not social proof. */
const MIN_REVIEWS_TO_SHOW = 3

export function useVenueHero(restaurant: PublicRestaurant) {
  const summaryQuery = useQuery({
    queryKey: queryKeys.publicReviewSummary(restaurant.slug),
    queryFn: () => reviewsApi.publicSummary(restaurant.slug),
    enabled: Boolean(restaurant.slug),
    staleTime: freshFor.slow,
  })

  const summary = summaryQuery.data
  const showRating = Boolean(summary && summary.count >= MIN_REVIEWS_TO_SHOW)
  const service = serviceWindow(restaurant.openingHours)

  const telHref = restaurant.phone ? `tel:${restaurant.phone.replace(/\s+/g, '')}` : null
  const mapsHref =
    restaurant.mapsUrl ||
    (restaurant.address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${restaurant.name} ${restaurant.address}`,
        )}`
      : null)

  return {
    rating: showRating && summary ? summary.average.toFixed(1) : null,
    ratingCount: summary?.count ?? 0,
    isOpen: service.open,
    closesAt: formatClock(service.closesAt),
    opensAt: formatClock(service.opensAt),
    telHref,
    mapsHref,
    /** Initials stand in for a missing logo so the medallion is never empty. */
    initials: restaurant.name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase() ?? '')
      .join(''),
  }
}
