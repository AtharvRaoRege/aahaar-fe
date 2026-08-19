/**
 * Product tokens for the staff dashboard and customer surfaces.
 * Warm food identity, quieter chrome than the original neo-brutal shell.
 */

export const palette = {
  canvas: '#F6F1E8',
  ink: '#1C1916',
  tomato: '#E24A2B',
  mango: '#E7B230',
  chutney: '#2F6B38',
  chili: '#C4332A',
  cream: '#FBF8F2',
  white: '#FFFFFF',
  violet: '#6B5CAD',
  tomatoDark: '#C53C21',
  mangoDark: '#C79820',
  inkSoft: '#5C564E',
  line: '#E4D9C8',
  chutneyWash: '#E7F0E8',
  vegWash: 'rgba(47, 107, 56, 0.06)',
  chiliWash: 'rgba(196, 51, 42, 0.06)',
  creamFog: 'rgba(251, 248, 242, 0.88)',
  mangoWash: 'rgba(231, 178, 48, 0.14)',
} as const

export const semantic = {
  background: palette.canvas,
  foreground: palette.ink,
  primary: palette.tomato,
  secondary: palette.mango,
  success: palette.chutney,
  danger: palette.chili,
  surface: palette.white,
  decoration: palette.violet,
} as const

export const colors = {
  primary: palette.tomato,
  primaryDark: palette.tomatoDark,
} as const

export const fontFamily = {
  body: "'Space Grotesk', system-ui, -apple-system, sans-serif",
} as const

export const fontWeights = {
  regular: 400,
  medium: 500,
  bold: 700,
  black: 800,
} as const

export const fontSizes = {
  display: 'clamp(2.25rem, 6vw, 4.5rem)',
  h1: 'clamp(1.75rem, 3vw, 2.25rem)',
  h2: 'clamp(1.35rem, 2.2vw, 1.75rem)',
  h3: 'clamp(1.125rem, 1.6vw, 1.375rem)',
  subheading: '1.125rem',
  body: '1rem',
  bodyLg: '1.125rem',
  label: '0.8125rem',
  labelSm: '0.75rem',
  micro: '0.625rem',
} as const

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '40px',
  '5xl': '48px',
  '6xl': '64px',
} as const

export const borders = {
  thin: `1px solid ${palette.line}`,
  default: `1.5px solid ${palette.ink}`,
  major: `2px solid ${palette.ink}`,
  width: { thin: '1px', default: '1.5px', major: '2px' },
} as const

export const radii = {
  none: '0px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  full: '9999px',
} as const

export const shadows = {
  sm: `0 1px 2px rgba(28, 25, 22, 0.06)`,
  card: `0 4px 6px -1px rgba(28, 25, 22, 0.1), 0 2px 4px -1px rgba(28, 25, 22, 0.06)`,
  mangoRing: `0 0 0 3px rgba(231, 178, 48, 0.28)`,
  md: `0 8px 24px rgba(28, 25, 22, 0.08)`,
  lg: `0 16px 40px rgba(28, 25, 22, 0.1)`,
  xl: `0 24px 48px rgba(28, 25, 22, 0.12)`,
  none: 'none',
} as const

/**
 * Luminance masks. These need true black and true transparent to work — the mask
 * reads luminance, not brand colour — so they are defined here beside the palette
 * rather than inline in a styled file.
 */
export const masks = {
  railFade:
    'linear-gradient(to right, transparent 0, #000 14px, #000 calc(100% - 22px), transparent 100%)',
} as const

export const transitions = {
  fast: '140ms ease-out',
  standard: '200ms ease-out',
  slow: '280ms ease-out',
} as const

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const

type BreakpointKey = keyof typeof breakpoints

export const media = {
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
} as const satisfies Record<BreakpointKey, string>

export const zIndex = {
  base: 0,
  sticky: 100,
  cartBar: 200,
  header: 300,
  overlay: 900,
  sheet: 1000,
  modal: 1050,
  toast: 1100,
} as const

export const theme = {
  palette,
  semantic,
  colors,
  fontFamily,
  fontWeights,
  fontSizes,
  spacing,
  borders,
  radii,
  shadows,
  masks,
  transitions,
  breakpoints,
  media,
  zIndex,
} as const

export type AppTheme = typeof theme
