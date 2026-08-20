import type { ReactElement } from 'react'

import { ArtSvg } from './styled'

/** Plate, fork and spoon sitting behind the hero phone. */
export function TableSceneArt() {
  return (
    <ArtSvg viewBox="0 0 200 200" aria-hidden>
      <circle cx="100" cy="100" r="92" />
      <circle cx="100" cy="100" r="70" data-hair />
      <path d="M30 60v40M30 80h6M42 60v25a6 6 0 0 0 12 0V60" />
      <path d="M164 60c-8 0-14 10-14 22s6 18 14 18" />
      <path d="M164 60v80" />
    </ArtSvg>
  )
}

/** A printed QR slip, leaning against the hero phone. */
export function QrSlipArt() {
  return (
    <ArtSvg viewBox="0 0 60 74" aria-hidden>
      <path d="M6 74V20a4 4 0 0 1 4-4h30l14 14v40a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z" data-fill="paper" />
      <path d="M40 16v14h14" />
      <rect x="16" y="30" width="8" height="8" data-fill="ink" data-stroke="none" />
      <rect x="28" y="30" width="8" height="8" data-fill="chili" data-stroke="none" />
      <rect x="16" y="42" width="8" height="8" data-fill="chili" data-stroke="none" />
      <rect x="28" y="42" width="8" height="8" data-fill="ink" data-stroke="none" />
    </ArtSvg>
  )
}

/** Kitchen ticket printer with a live status lamp. */
export function PrinterArt() {
  return (
    <ArtSvg viewBox="0 0 150 70" aria-hidden>
      <rect x="10" y="6" width="130" height="46" rx="8" data-fill="paper-dim" data-stroke="paper" data-thick />
      <rect x="24" y="40" width="102" height="6" rx="3" data-fill="ink" data-stroke="paper" data-hair data-slot />
      <circle cx="122" cy="20" r="4" data-fill="mint" data-stroke="none" data-light />
      <path d="M24 20h46" data-stroke="paper" />
    </ArtSvg>
  )
}

/** Two short stacks of coins for the savings section. */
export function CoinStackArt() {
  return (
    <ArtSvg viewBox="0 0 120 90" aria-hidden>
      <ellipse cx="30" cy="72" rx="26" ry="9" data-fill="paper" />
      <ellipse cx="30" cy="62" rx="26" ry="9" data-fill="turmeric" />
      <ellipse cx="30" cy="52" rx="26" ry="9" data-fill="paper" />
      <text x="30" y="56" textAnchor="middle">
        ₹
      </text>
      <ellipse cx="88" cy="78" rx="20" ry="7" data-fill="paper" />
      <ellipse cx="88" cy="70" rx="20" ry="7" data-fill="mint" />
    </ArtSvg>
  )
}

export type DishArtKind = 'tikka' | 'biryani' | 'salad' | 'palak' | 'dosa' | 'thali'

const DISH_ART: Record<DishArtKind, ReactElement> = {
  tikka: (
    <>
      <circle cx="40" cy="40" r="30" data-fill="turmeric" data-thick />
      <circle cx="40" cy="40" r="18" data-fill="chili" />
      <circle cx="40" cy="40" r="6" data-fill="mint" data-hair />
    </>
  ),
  biryani: (
    <>
      <ellipse cx="40" cy="42" rx="30" ry="22" data-fill="chili" data-stroke="paper" data-thick />
      <path d="M20 42c0 10 9 16 20 16s20-6 20-16" data-stroke="paper" />
      <circle cx="32" cy="38" r="2" data-fill="turmeric" data-stroke="none" />
      <circle cx="48" cy="40" r="2" data-fill="turmeric" data-stroke="none" />
    </>
  ),
  salad: (
    <>
      <ellipse cx="40" cy="44" rx="28" ry="20" data-fill="paper" data-thick />
      <ellipse cx="40" cy="44" rx="16" ry="10" data-fill="mint" />
      <path d="M28 30c4-6 8-6 12 0M40 28c4-4 8-4 12 0" data-hair />
    </>
  ),
  palak: (
    <>
      <path d="M16 50c0-16 10-28 24-28s24 12 24 28z" data-fill="mint" data-thick />
      <path d="M40 22v28" />
      <circle cx="32" cy="36" r="3" data-fill="chili" data-stroke="none" />
      <circle cx="46" cy="40" r="3" data-fill="chili" data-stroke="none" />
    </>
  ),
  dosa: (
    <>
      <circle cx="40" cy="40" r="28" data-fill="paper" data-thick />
      <circle cx="40" cy="40" r="16" data-fill="turmeric" />
      <path d="M40 24v6M40 50v6M24 40h6M50 40h6" />
    </>
  ),
  thali: (
    <>
      <rect x="16" y="28" width="48" height="30" rx="4" data-fill="paper" data-thick />
      <path d="M40 28v30" />
      <circle cx="28" cy="40" r="4" data-fill="chili" data-stroke="none" />
      <circle cx="52" cy="46" r="3" data-fill="turmeric" data-stroke="none" />
    </>
  ),
}

export function DishArt({ kind }: { kind: DishArtKind }) {
  return (
    <ArtSvg viewBox="0 0 80 80" aria-hidden>
      {DISH_ART[kind]}
    </ArtSvg>
  )
}

export type FoodChipKind = 'dosa' | 'samosa' | 'biryani' | 'naan' | 'chai'

const FOOD_CHIP_ART: Record<FoodChipKind, ReactElement> = {
  dosa: (
    <>
      <path d="M3 16c2-8 8-12 18-12-2 8-8 12-18 12z" data-fill="turmeric" data-hair />
      <path d="M3 16c2 2 4 3 6 3" data-hair />
    </>
  ),
  samosa: (
    <>
      <path d="M4 20L12 4l8 16z" data-fill="turmeric" data-hair />
      <path d="M8 16h8M9 12h6" data-hair />
    </>
  ),
  biryani: (
    <>
      <path d="M4 12a8 5 0 0 0 16 0z" data-fill="chili" data-hair />
      <path d="M4 12a8 5 0 1 1 16 0" data-hair />
      <circle cx="10" cy="11" r="0.8" data-fill="paper" data-stroke="none" />
      <circle cx="13" cy="12.5" r="0.8" data-fill="paper" data-stroke="none" />
      <circle cx="16" cy="11" r="0.8" data-fill="paper" data-stroke="none" />
    </>
  ),
  naan: (
    <>
      <ellipse cx="12" cy="12" rx="9" ry="6" data-fill="turmeric" data-hair />
      <path d="M8 10c2 2 6 2 8 0" data-hair />
    </>
  ),
  chai: (
    <>
      <path d="M9 3c0 1.4-1.2 1.4-1.2 2.8S9 7.2 9 8.6" data-hair />
      <path d="M6 10h11l-1 8a2 2 0 0 1-2 1.8H9a2 2 0 0 1-2-1.8z" data-fill="turmeric" data-hair />
      <path d="M17 12h1.5a2 2 0 0 1 0 4H17" data-hair />
    </>
  ),
}

export function FoodChipArt({ kind }: { kind: FoodChipKind }) {
  return (
    <ArtSvg viewBox="0 0 24 24" aria-hidden>
      {FOOD_CHIP_ART[kind]}
    </ArtSvg>
  )
}

export type TickerMarkKind = 'waveUp' | 'dots' | 'star' | 'drop' | 'arrow' | 'heart' | 'waveDown'

const TICKER_MARK_ART: Record<TickerMarkKind, { viewBox: string; art: ReactElement }> = {
  waveUp: {
    viewBox: '0 0 60 40',
    art: <path d="M2 28C14 8 26 8 32 20s18 12 26-6" data-stroke="turmeric" data-thick />,
  },
  dots: {
    viewBox: '0 0 60 40',
    art: (
      <>
        <circle cx="14" cy="20" r="5" data-fill="chili" data-stroke="none" />
        <circle cx="30" cy="20" r="5" data-fill="chili" data-stroke="none" />
        <circle cx="46" cy="20" r="5" data-fill="chili" data-stroke="none" />
      </>
    ),
  },
  star: {
    viewBox: '0 0 24 24',
    art: (
      <path
        d="M12 2l2.4 6.6L21 9l-5 4.5L17.5 21 12 17l-5.5 4 1.5-7.5L3 9l6.6-.4z"
        data-fill="turmeric"
        data-stroke="none"
      />
    ),
  },
  drop: {
    viewBox: '0 0 40 50',
    art: <path d="M20 4C8 20 6 32 20 44 34 32 32 20 20 4z" data-fill="mint" data-stroke="none" />,
  },
  arrow: {
    viewBox: '0 0 60 30',
    art: <path d="M4 15h44M38 7l10 8-10 8" data-stroke="paper" data-thick />,
  },
  heart: {
    viewBox: '0 0 40 36',
    art: (
      <path
        d="M20 32C4 20 4 6 14 6c4 0 6 3 6 6 0-3 2-6 6-6 10 0 10 14-6 26z"
        data-fill="chili"
        data-stroke="none"
      />
    ),
  },
  waveDown: {
    viewBox: '0 0 60 40',
    art: <path d="M2 14C14 34 26 34 32 20s18-14 26 6" data-stroke="mint" data-thick />,
  },
}

export function TickerMarkArt({ kind }: { kind: TickerMarkKind }) {
  const mark = TICKER_MARK_ART[kind]
  return (
    <ArtSvg viewBox={mark.viewBox} aria-hidden>
      {mark.art}
    </ArtSvg>
  )
}
