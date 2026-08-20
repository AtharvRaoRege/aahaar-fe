import type { DishArtKind, TickerMarkKind } from '@/components/landing/art'
import type { LineIconName } from '@/constants/landing-icons'

/** Card and cell colourways. `paper` is the default light card. */
export type LandingSkin = 'paper' | 'ink' | 'chili' | 'turmeric' | 'mint'

export interface RailCard {
  key: string
  icon: LineIconName
  skin?: LandingSkin
}

export const GUEST_CARDS: RailCard[] = [
  { key: 'liveTable', icon: 'pin' },
  { key: 'spice', icon: 'spice' },
  { key: 'cart', icon: 'cart', skin: 'ink' },
  { key: 'upi', icon: 'lock' },
  { key: 'waiter', icon: 'bell' },
  { key: 'portion', icon: 'calendar' },
  { key: 'notes', icon: 'lines' },
  { key: 'rate', icon: 'star' },
]

export const FLOOR_CARDS: RailCard[] = [
  { key: 'sound', icon: 'sound' },
  { key: 'background', icon: 'bell', skin: 'ink' },
  { key: 'filter', icon: 'filter' },
  { key: 'flow', icon: 'checkCircle' },
  { key: 'offline', icon: 'refresh' },
]

export const OWNER_CARDS: RailCard[] = [
  { key: 'excel', icon: 'table' },
  { key: 'offers', icon: 'upload' },
  { key: 'roles', icon: 'users', skin: 'ink' },
  { key: 'qr', icon: 'grid4' },
  { key: 'outlets', icon: 'home' },
  { key: 'soldOut', icon: 'check' },
  { key: 'draft', icon: 'doc' },
]

export const HOW_STEPS = ['qr', 'scan', 'pick', 'kitchen', 'pay'] as const

export const STORY_BEATS = [
  { key: 'scan', icon: 'qr' },
  { key: 'browse', icon: 'search' },
  { key: 'round', icon: 'plusCircle' },
] as const satisfies readonly { key: string; icon: LineIconName }[]

export const STAT_TILES = [
  { key: 'outlets', target: 120, suffix: '+' },
  { key: 'speed', target: 8, suffix: 's' },
  { key: 'commission', target: 0, suffix: '%' },
  { key: 'taps', target: 3, suffix: '' },
] as const

export const DISH_TILES = [
  { key: 'tikka', art: 'tikka', skin: 'paperDim' },
  { key: 'biryani', art: 'biryani', skin: 'ink' },
  { key: 'salad', art: 'salad', skin: 'turmeric' },
  { key: 'palak', art: 'palak', skin: 'paperDim' },
  { key: 'dosa', art: 'dosa', skin: 'chili' },
  { key: 'thali', art: 'thali', skin: 'mint' },
] as const satisfies readonly { key: string; art: DishArtKind; skin: string }[]

export const BENTO_CELLS: RailCard[] = [
  { key: 'rounds', icon: 'plusCircle' },
  { key: 'chat', icon: 'chat', skin: 'ink' },
  { key: 'outlets', icon: 'layers', skin: 'chili' },
  { key: 'timer', icon: 'clock', skin: 'turmeric' },
  { key: 'insights', icon: 'pulse', skin: 'mint' },
  { key: 'qr', icon: 'qrSquare' },
]

export const JOURNEY_STOPS = [
  { key: 'sit', skin: 'chili' },
  { key: 'open', skin: 'turmeric' },
  { key: 'land', skin: 'mint' },
  { key: 'pay', skin: 'ink' },
] as const satisfies readonly { key: string; skin: LandingSkin }[]

export const QUOTE_CARDS = [
  { key: 'rajesh', skin: 'turmeric' },
  { key: 'priya', skin: 'chili' },
  { key: 'amit', skin: 'mint' },
  { key: 'sunita', skin: 'ink' },
] as const satisfies readonly { key: string; skin: LandingSkin }[]

export const FAQ_ITEMS = ['app', 'wifi', 'upload', 'cut', 'setup', 'outlets'] as const

export const TICKET_LINES = ['tikka', 'naan', 'lassi'] as const

/** Alternating word / mark pairs for the pinned ticker sentence. */
export type TickerAccent = 'turmeric' | 'chili' | 'mint'

export const TICKER_PARTS: readonly {
  key: string
  mark: TickerMarkKind
  accent?: TickerAccent
}[] = [
  { key: 'one', mark: 'waveUp' },
  { key: 'two', mark: 'dots' },
  { key: 'three', mark: 'star', accent: 'turmeric' },
  { key: 'four', mark: 'drop' },
  { key: 'five', mark: 'arrow', accent: 'chili' },
  { key: 'six', mark: 'heart' },
  { key: 'seven', mark: 'waveDown', accent: 'mint' },
]

/**
 * How many viewport heights the pinned ticker takes to travel its full width.
 *
 * The original page mapped the whole sentence onto a single screen of scroll,
 * which read as a blur. Pinning over four screens slows it to a readable pace and
 * holds the reader in place until the sentence finishes.
 */
export const TICKER_SCREENS = 7
