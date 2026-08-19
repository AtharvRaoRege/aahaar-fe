import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { publicApi } from '@/lib/api/public'
import { freshFor } from '@/lib/query/cache'
import { queryKeys } from '@/lib/query/keys'
import type { PublicOffer } from '@/types/offer'

/** Shorthand shown on the chip: "20% off", "₹100 off", or the offer type. */
export function offerBadge(offer: PublicOffer): { key: string; value: number } | null {
  if (offer.value === null) return null
  if (offer.kind === 'PERCENT') return { key: 'offers.percentOff', value: offer.value }
  if (offer.kind === 'FLAT') return { key: 'offers.flatOff', value: offer.value }
  return null
}

export function endsLabel(offer: PublicOffer): { key: string; date: string } | null {
  if (!offer.endsAt) return null
  const ends = new Date(offer.endsAt)
  const today = new Date()
  if (ends.toDateString() === today.toDateString()) {
    return { key: 'offers.endsToday', date: '' }
  }
  return {
    key: 'offers.endsOn',
    date: ends.toLocaleDateString(undefined, { day: 'numeric', month: 'short' }),
  }
}

export function useOfferStrip(
  slug: string,
  onView: (offerId: string) => void,
) {
  const [active, setActive] = useState<PublicOffer | null>(null)

  const query = useQuery({
    queryKey: queryKeys.publicOffers(slug),
    queryFn: () => publicApi.getOffers(slug),
    enabled: Boolean(slug),
    staleTime: freshFor.slow,
  })

  return {
    offers: query.data ?? [],
    active,
    open: (offer: PublicOffer) => {
      setActive(offer)
      onView(offer.id)
    },
    close: () => setActive(null),
  }
}
