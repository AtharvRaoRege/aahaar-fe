import {
  BadgePercent,
  Banknote,
  CalendarHeart,
  Clock,
  Gift,
  PartyPopper,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { createElement, type ReactElement } from 'react'

import type { OfferKind } from '@/types/offer'

export const OFFER_KIND_ICONS: Record<OfferKind, LucideIcon> = {
  PERCENT: BadgePercent,
  FLAT: Banknote,
  BOGO: Gift,
  COMBO: PartyPopper,
  HAPPY_HOUR: Clock,
  SPECIAL_DAY: CalendarHeart,
}

export function offerKindIcon(kind: OfferKind): LucideIcon {
  return OFFER_KIND_ICONS[kind] ?? Sparkles
}

export function renderOfferKindIcon(
  kind: OfferKind,
  size = 20,
): ReactElement {
  return createElement(offerKindIcon(kind), {
    size,
    strokeWidth: 2.25,
    'aria-hidden': true,
  })
}
