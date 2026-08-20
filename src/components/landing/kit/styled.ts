import styled, { css, keyframes } from 'styled-components'

import { landing, landingFonts, spacing } from '@/styles/theme'

const bobA = keyframes`
  0%, 100% { transform: translateY(0) rotate(-4deg); }
  50% { transform: translateY(-14px) rotate(4deg); }
`

const bobB = keyframes`
  0%, 100% { transform: translateY(0) rotate(3deg); }
  50% { transform: translateY(10px) rotate(-5deg); }
`

const spinSlow = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const marqueeSlide = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`

const nudge = keyframes`
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(6px); }
`

export type DoodleTone = 'ink' | 'chili' | 'mint' | 'turmeric' | 'paper'
export type FloatKind = 'a' | 'b' | 'c'

const TONES: Record<DoodleTone, string> = {
  ink: landing.ink,
  chili: landing.chili,
  mint: landing.mint,
  turmeric: landing.turmeric,
  paper: landing.paper,
}

const FLOATS = {
  a: css`
    animation: ${bobA} 5s ease-in-out infinite;
  `,
  b: css`
    animation: ${bobB} 6.2s ease-in-out infinite;
  `,
  c: css`
    animation: ${spinSlow} 9s linear infinite;
  `,
} as const

interface PlacedProps {
  $top?: string
  $right?: string
  $bottom?: string
  $left?: string
}

const placed = css<PlacedProps>`
  position: absolute;
  top: ${({ $top }) => $top ?? 'auto'};
  right: ${({ $right }) => $right ?? 'auto'};
  bottom: ${({ $bottom }) => $bottom ?? 'auto'};
  left: ${({ $left }) => $left ?? 'auto'};
`

export const Grain = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 5;
  opacity: 0.05;
  mix-blend-mode: multiply;
  background-image: radial-gradient(circle, ${landing.ink} 1px, transparent 1px);
  background-size: 3px 3px;
`

export const Doodle = styled.span<
  PlacedProps & {
    $size: number
    $tone?: DoodleTone
    $float?: FloatKind
    $onMobile?: boolean
    $fade?: number
  }
>`
  ${placed};
  display: ${({ $onMobile }) => ($onMobile ? 'block' : 'none')};
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  opacity: ${({ $fade }) => $fade ?? 0.5};
  pointer-events: none;
  z-index: 1;
  ${({ $float }) => ($float ? FLOATS[$float] : null)};

  svg {
    width: 100%;
    height: 100%;
    fill: none;
    stroke: ${({ $tone }) => TONES[$tone ?? 'ink']};
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  ${({ theme }) => theme.media.sm} {
    display: block;
  }
`

export const GhostType = styled.span<PlacedProps & { $tone?: 'ink' | 'paper' }>`
  ${placed};
  display: none;
  font-family: ${landingFonts.display};
  font-size: clamp(70px, 26vw, 240px);
  color: transparent;
  -webkit-text-stroke: 1.5px ${({ $tone }) => ($tone === 'paper' ? landing.paper : landing.ink)};
  opacity: 0.06;
  white-space: nowrap;
  z-index: 0;
  line-height: 1;
  pointer-events: none;
  user-select: none;

  ${({ theme }) => theme.media.md} {
    display: block;
  }
`

export const Blob = styled.span<PlacedProps & { $size: number; $tone: DoodleTone; $fade: number }>`
  ${placed};
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  filter: blur(2px);
  z-index: 0;
  opacity: ${({ $fade }) => $fade};
  background: radial-gradient(circle, ${({ $tone }) => TONES[$tone]}, transparent 70%);
  pointer-events: none;
`

export const FoodChip = styled.span<PlacedProps>`
  ${placed};
  display: none;
  z-index: 1;
  width: 54px;
  height: 54px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${landing.paper};
  border: 2px solid ${landing.ink};
  box-shadow: 4px 4px 0 ${landing.ink};

  svg {
    width: 30px;
    height: 30px;
  }

  ${({ theme }) => theme.media.md} {
    display: flex;
  }
`

export const Perf = styled.div<{ $dark?: boolean }>`
  height: 22px;
  position: relative;
  z-index: 2;
  background-repeat: repeat-x;
  background-size: 24px 22px;
  background-image: radial-gradient(
    circle at 12px 11px,
    transparent 6px,
    ${({ $dark }) => ($dark ? landing.ink : landing.paper)} 6.5px
  );
`

export const MarqueeBand = styled.div<{ $light?: boolean }>`
  overflow: hidden;
  white-space: nowrap;
  padding: 14px 0;
  position: relative;
  z-index: 3;
  background: ${({ $light }) => ($light ? landing.turmeric : landing.ink)};
  border-top: 2px solid ${landing.ink};
  border-bottom: 2px solid ${landing.ink};

  > div > span {
    font-family: ${landingFonts.display};
    font-size: clamp(16px, 4.4vw, 26px);
    color: ${({ $light }) => ($light ? landing.ink : landing.paper)};
    padding: 0 22px;
    display: inline-flex;
    align-items: center;
    gap: 14px;
  }

  i {
    font-style: normal;
    color: ${landing.chili};
  }
`

export const MarqueeTrack = styled.div<{ $reverse?: boolean }>`
  display: inline-flex;
  animation: ${marqueeSlide} 18s linear infinite;
  animation-direction: ${({ $reverse }) => ($reverse ? 'reverse' : 'normal')};
`

export const Eyebrow = styled.p<{ $tone?: DoodleTone }>`
  font-size: 12px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${({ $tone }) => TONES[$tone ?? 'chili']};
  font-weight: 700;
`

export const Head = styled.div`
  text-align: center;
  padding: 0 ${spacing.xl};
  margin-bottom: 36px;
  position: relative;
  z-index: 2;
`

export const HeadTitle = styled.h2<{ $tone?: DoodleTone }>`
  font-family: ${landingFonts.display};
  font-size: clamp(24px, 6.5vw, 38px);
  line-height: 1.02;
  letter-spacing: -0.01em;
  margin-top: 10px;
  color: ${({ $tone }) => TONES[$tone ?? 'ink']};
`

export const ScrollHint = styled.p<{ $tone?: DoodleTone }>`
  text-align: center;
  font-size: 10px;
  color: ${({ $tone }) => TONES[$tone ?? 'ink']};
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-top: -14px;
  position: relative;
  z-index: 2;

  span {
    display: inline-block;
    animation: ${nudge} 1.6s ease-in-out infinite;
  }

  ${({ theme }) => theme.media.md} {
    display: none;
  }
`

export const IconFrame = styled.div`
  width: 104px;
  height: 104px;
  border: 2px solid ${landing.ink};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${landing.paper};
  box-shadow: ${landing.shadow};
  flex-shrink: 0;

  svg {
    width: 52px;
    height: 52px;
    stroke: ${landing.ink};
    fill: none;
    stroke-width: 2.4;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`
