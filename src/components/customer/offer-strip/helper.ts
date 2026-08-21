import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { publicApi } from '@/lib/api/public'
import { freshFor } from '@/lib/query/cache'
import { queryKeys } from '@/lib/query/keys'
import type { PublicOffer } from '@/types/offer'

export function offerHeadline(offer: PublicOffer): { key: string; value?: number } {
  if (offer.kind === 'PERCENT' && offer.value !== null) {
    return { key: 'offers.percentOff', value: offer.value }
  }
  if (offer.kind === 'FLAT' && offer.value !== null) {
    return { key: 'offers.flatOff', value: offer.value }
  }
  if (offer.kind === 'BOGO') return { key: 'offers.bogo' }
  return { key: 'offers.special' }
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

export function useOfferStrip(slug: string, onView: (offerId: string) => void) {
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
