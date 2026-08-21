/**
 * Accessible brand palette from a single hex primary (WCAG 2.1 contrast).
 */

export const PLATFORM_PRIMARY = '#E24A2B'

export interface BrandPalette {
  primary: string
  primaryHover: string
  onPrimary: string
  surfaceTint: string
  border: string
  /** Brand-tinted text that stays ≥4.5:1 on white/cream surfaces. */
  accentText: string
  /** Contrast ratio of onPrimary against primary (informational). */
  onPrimaryContrast: number
}

type Rgb = { r: number; g: number; b: number }

const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/

export function normalizeHex(input: string): string | null {
  const raw = input.trim()
  if (!HEX_RE.test(raw)) return null
  const body = raw.slice(1)
  if (body.length === 3) {
    return `#${body
      .split('')
      .map((ch) => ch + ch)
      .join('')
      .toUpperCase()}`
  }
  return `#${body.toUpperCase()}`
}

export function hexToRgb(hex: string): Rgb | null {
  const normalized = normalizeHex(hex)
  if (!normalized) return null
  return {
    r: Number.parseInt(normalized.slice(1, 3), 16),
    g: Number.parseInt(normalized.slice(3, 5), 16),
    b: Number.parseInt(normalized.slice(5, 7), 16),
  }
}

export function rgbToHex({ r, g, b }: Rgb): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)))
  return `#${[clamp(r), clamp(g), clamp(b)]
    .map((n) => n.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()}`
}

/** Relative luminance per WCAG 2.1. */
export function relativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0
  const channel = (value: number) => {
    const s = value / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  const r = channel(rgb.r)
  const g = channel(rgb.g)
  const b = channel(rgb.b)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrastRatio(foreground: string, background: string): number {
  const l1 = relativeLuminance(foreground)
  const l2 = relativeLuminance(background)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

/** Pick black or white for text on `background` — prefer ≥ 4.5:1. */
export function onColorFor(background: string): { color: string; ratio: number } {
  const white = '#FFFFFF'
  const black = '#000000'
  const whiteRatio = contrastRatio(white, background)
  const blackRatio = contrastRatio(black, background)
  if (whiteRatio >= 4.5 || whiteRatio >= blackRatio) {
    return { color: white, ratio: whiteRatio }
  }
  return { color: black, ratio: blackRatio }
}

function mixToward(hex: string, target: Rgb, amount: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return PLATFORM_PRIMARY
  return rgbToHex({
    r: rgb.r + (target.r - rgb.r) * amount,
    g: rgb.g + (target.g - rgb.g) * amount,
    b: rgb.b + (target.b - rgb.b) * amount,
  })
}

function darken(hex: string, amount: number): string {
  return mixToward(hex, { r: 0, g: 0, b: 0 }, amount)
}

function lighten(hex: string, amount: number): string {
  return mixToward(hex, { r: 255, g: 255, b: 255 }, amount)
}

function tintRgba(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return `rgba(226, 74, 43, ${alpha})`
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
}

const LIGHT_SURFACE = '#FFFFFF'
const INK_FALLBACK = '#1C1916'

/** Darken brand until it reads on white (kickers, scores, links on cream cards). */
export function accentTextOnLight(primary: string): string {
  if (contrastRatio(primary, LIGHT_SURFACE) >= 4.5) return primary
  let color = primary
  for (let step = 0; step < 14; step += 1) {
    color = darken(color, 0.1)
    if (contrastRatio(color, LIGHT_SURFACE) >= 4.5) return color
  }
  return INK_FALLBACK
}

/**
 * Build a full accessible brand palette from one primary hex.
 * Invalid input falls back to the platform tomato.
 */
export function buildBrandPalette(input: string | null | undefined): BrandPalette {
  const primary = normalizeHex(input ?? '') ?? PLATFORM_PRIMARY
  const on = onColorFor(primary)
  const luminance = relativeLuminance(primary)
  const primaryHover = luminance > 0.45 ? darken(primary, 0.14) : lighten(primary, 0.1)
  const border = luminance > 0.45 ? darken(primary, 0.22) : lighten(primary, 0.18)

  return {
    primary,
    primaryHover,
    onPrimary: on.color,
    surfaceTint: tintRgba(primary, 0.1),
    border,
    accentText: accentTextOnLight(primary),
    onPrimaryContrast: Math.round(on.ratio * 100) / 100,
  }
}

/** CSS custom properties for a brand scope element. */
export function brandCssVars(palette: BrandPalette): Record<string, string> {
  return {
    '--brand-primary': palette.primary,
    '--brand-primary-hover': palette.primaryHover,
    '--brand-on-primary': palette.onPrimary,
    '--brand-surface-tint': palette.surfaceTint,
    '--brand-border': palette.border,
    '--brand-accent-text': palette.accentText,
  }
}

/** Styled-components friendly `var(--token, fallback)` helpers. */
export const brandVar = {
  primary: `var(--brand-primary, ${PLATFORM_PRIMARY})`,
  primaryHover: 'var(--brand-primary-hover, #C53C21)',
  onPrimary: 'var(--brand-on-primary, #FFFFFF)',
  surfaceTint: 'var(--brand-surface-tint, rgba(226, 74, 43, 0.1))',
  border: `var(--brand-border, ${PLATFORM_PRIMARY})`,
  accentText: `var(--brand-accent-text, ${PLATFORM_PRIMARY})`,
} as const
