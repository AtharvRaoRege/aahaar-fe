import styled, { keyframes } from 'styled-components'

import { landing, landingFonts, spacing } from '@/styles/theme'

import { TICKER_SCREENS } from '@/constants/landing'

const nudge = keyframes`
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(6px); }
`

export const Section = styled.section`
  position: relative;
  background: ${landing.ink};
  color: ${landing.paper};
  height: calc(100svh * ${TICKER_SCREENS + 1});
`

export const Pin = styled.div`
  position: sticky;
  top: 0;
  height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${spacing.md};
  overflow: hidden;
  padding: 64px ${spacing.md} 28px;

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.lg};
    padding: 72px ${spacing.lg} 32px;
  }

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.xl};
    padding: 80px ${spacing.xl} 40px;
  }

  ${({ theme }) => theme.media.lg} {
    gap: ${spacing['2xl']};
    padding: 88px ${spacing['2xl']} 48px;
  }

  ${({ theme }) => theme.media.xl} {
    gap: ${spacing['2xl']};
  }
`

export const Intro = styled.div<{ $fade: number }>`
  text-align: center;
  position: relative;
  z-index: 3;
  padding: 0 ${spacing.md};
  flex-shrink: 0;
  opacity: ${({ $fade }) => Math.max(0, 1 - $fade)};
  transform: translate3d(0, ${({ $fade }) => -$fade * 16}px, 0);
  max-height: ${({ $fade }) => ($fade > 0.55 ? '0' : '160px')};
  margin-bottom: ${({ $fade }) => ($fade > 0.55 ? '0' : spacing.sm)};
  overflow: hidden;
  pointer-events: ${({ $fade }) => ($fade > 0.55 ? 'none' : 'auto')};
  transition:
    opacity 160ms linear,
    max-height 220ms ease,
    margin 220ms ease;

  ${({ theme }) => theme.media.md} {
    padding: 0 ${spacing.xl};
    max-height: ${({ $fade }) => ($fade > 0.7 ? '0' : '200px')};
  }
`

export const IntroTitle = styled.h2`
  font-family: ${landingFonts.display};
  font-size: clamp(18px, 5vw, 34px);
  line-height: 1.05;
  color: ${landing.paper};
  margin-top: ${spacing.sm};
`

export const IntroLede = styled.p`
  font-size: 13px;
  color: ${landing.line};
  margin: 8px auto 0;
  max-width: 280px;
  line-height: 1.45;

  ${({ theme }) => theme.media.md} {
    font-size: 15px;
    max-width: 300px;
  }
`

export const Viewport = styled.div`
  overflow: hidden;
  width: 100%;
  position: relative;
  z-index: 2;
  flex: 0 0 auto;
`

export const Track = styled.div<{ $x: number }>`
  display: inline-flex;
  align-items: center;
  gap: 0.22em;
  white-space: nowrap;
  width: max-content;
  max-width: none;
  padding: 0 7vw;
  transform: translate3d(${({ $x }) => $x}px, 0, 0);
  will-change: transform;
`

export const Word = styled.span<{ $accent?: 'turmeric' | 'chili' | 'mint' }>`
  font-family: ${landingFonts.display};
  font-size: clamp(28px, 9vw, 132px);
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${({ $accent }) =>
    $accent === 'turmeric'
      ? landing.turmeric
      : $accent === 'chili'
        ? landing.chili
        : $accent === 'mint'
          ? landing.mint
          : landing.paper};
`

export const Mark = styled.span`
  flex: 0 0 auto;
  width: clamp(26px, 7vw, 88px);
  height: clamp(26px, 7vw, 88px);
  opacity: 0.92;
`

export const Hint = styled.p`
  flex-shrink: 0;
  text-align: center;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${landing.line};
  z-index: 3;
  margin: ${spacing.md} 0 0;
  position: relative;

  span {
    display: inline-block;
    animation: ${nudge} 1.6s ease-in-out infinite;
  }

  ${({ theme }) => theme.media.md} {
    font-size: 12px;
    margin-top: ${spacing.lg};
  }
`
