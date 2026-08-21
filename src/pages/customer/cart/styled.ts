import styled, { keyframes } from 'styled-components'

import { fontSizes, palette, radii, shadows, spacing } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export const Page = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 180px;
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.lg};
  padding-top: max(${spacing.lg}, env(safe-area-inset-top, 0px));

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.xl};
    padding-top: max(${spacing.xl}, env(safe-area-inset-top, 0px));
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.xl} ${spacing['2xl']};
    padding-top: max(${spacing.xl}, env(safe-area-inset-top, 0px));
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing['2xl']} ${spacing['3xl']};
  }
`

export const Title = styled.h1`
  font-size: ${fontSizes.h2};
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${palette.ink};
`

export const Hint = styled.p`
  margin: 0 ${spacing.lg} ${spacing.md};
  font-size: ${fontSizes.label};
  font-weight: 600;
  color: ${palette.inkSoft};

  ${({ theme }) => theme.media.sm} {
    margin: 0 ${spacing.xl} ${spacing.md};
  }

  ${({ theme }) => theme.media.md} {
    margin: 0 ${spacing['2xl']} ${spacing.md};
    font-size: ${fontSizes.body};
  }

  ${({ theme }) => theme.media.lg} {
    margin: 0 ${spacing['2xl']} ${spacing.lg};
  }

  ${({ theme }) => theme.media.xl} {
    margin: 0 ${spacing['3xl']} ${spacing.lg};
  }
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  padding: 0 ${spacing.lg} ${spacing.lg};

  ${({ theme }) => theme.media.sm} {
    padding: 0 ${spacing.xl} ${spacing.lg};
  }

  ${({ theme }) => theme.media.md} {
    max-width: 640px;
    width: 100%;
    margin-inline: auto;
    padding: 0 ${spacing['2xl']} ${spacing.xl};
    gap: ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    padding: 0 ${spacing['2xl']} ${spacing.xl};
  }

  ${({ theme }) => theme.media.xl} {
    padding: 0 ${spacing['3xl']} ${spacing['2xl']};
  }
`

export const NotesWrap = styled.div`
  padding: 0 ${spacing.lg} ${spacing.lg};

  ${({ theme }) => theme.media.sm} {
    padding: 0 ${spacing.xl} ${spacing.lg};
  }

  ${({ theme }) => theme.media.md} {
    max-width: 640px;
    width: 100%;
    margin-inline: auto;
    padding: 0 ${spacing['2xl']} ${spacing.xl};
  }

  ${({ theme }) => theme.media.lg} {
    padding: 0 ${spacing['2xl']} ${spacing.xl};
  }

  ${({ theme }) => theme.media.xl} {
    padding: 0 ${spacing['3xl']} ${spacing['2xl']};
  }
`

export const CouponWrap = styled.div`
  position: relative;
  display: grid;
  gap: ${spacing.sm};
  padding: 0 ${spacing.lg} ${spacing.lg};

  ${({ theme }) => theme.media.sm} {
    padding: 0 ${spacing.xl} ${spacing.lg};
  }

  ${({ theme }) => theme.media.md} {
    max-width: 640px;
    width: 100%;
    margin-inline: auto;
    padding: 0 ${spacing['2xl']} ${spacing.xl};
  }

  ${({ theme }) => theme.media.lg} {
    padding: 0 ${spacing['2xl']} ${spacing.xl};
  }

  ${({ theme }) => theme.media.xl} {
    padding: 0 ${spacing['3xl']} ${spacing['2xl']};
  }
`

export const CouponRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${spacing.sm};
  align-items: end;
`

export const CouponSuccess = styled.p`
  margin: 0;
  padding: ${spacing.md} ${spacing.lg};
  border-radius: ${radii.md};
  background: ${palette.mangoWash};
  border: 1.5px solid ${palette.mangoDark};
  color: ${palette.ink};
  font-size: ${fontSizes.label};
  font-weight: 700;
`

export const CouponError = styled.p`
  margin: 0;
  color: ${palette.chili};
  font-size: ${fontSizes.labelSm};
  font-weight: 600;
`

export const DiscountLine = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-weight: 700;
  font-size: ${fontSizes.label};
  color: ${brandVar.accentText};
`

const confettiFall = keyframes`
  0% {
    transform: translate3d(0, -12vh, 0) rotate(0deg) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate3d(var(--dx), 110vh, 0) rotate(720deg) scale(0.85);
    opacity: 0.15;
  }
`

const celebrateIn = keyframes`
  0% { opacity: 0; }
  12% { opacity: 1; }
  75% { opacity: 1; }
  100% { opacity: 0; }
`

const popMessage = keyframes`
  0% { transform: scale(0.72); opacity: 0; }
  18% { transform: scale(1.08); opacity: 1; }
  32% { transform: scale(1); opacity: 1; }
  78% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0.96); opacity: 0; }
`

export const CelebrateLayer = styled.div`
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.toast};
  overflow: hidden;
  display: grid;
  place-items: center;
  background: rgba(28, 25, 22, 0.42);
  animation: ${celebrateIn} 2.6s ease-out both;
`

export const CelebrateMessage = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  gap: ${spacing.sm};
  justify-items: center;
  max-width: min(90vw, 420px);
  padding: ${spacing.xl} ${spacing['2xl']};
  text-align: center;
  background: ${palette.cream};
  border: 2.5px solid ${palette.ink};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.xl};
  animation: ${popMessage} 2.6s ease-out both;
`

export const CelebrateKicker = styled.p`
  margin: 0;
  font-size: ${fontSizes.labelSm};
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${brandVar.accentText};
`

export const CelebrateTitle = styled.p`
  margin: 0;
  font-size: ${fontSizes.h1};
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1.05;
  color: ${palette.ink};
`

export const CelebrateSave = styled.p`
  margin: 0;
  font-size: ${fontSizes.h2};
  font-weight: 800;
  color: ${brandVar.accentText};
`

export const ConfettiBit = styled.span<{
  $delay: number
  $left: number
  $dx: number
  $tone: number
  $size: number
  $duration: number
}>`
  position: absolute;
  top: -8vh;
  left: ${({ $left }) => `${$left}%`};
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${Math.round($size * 1.35)}px`};
  border-radius: ${({ $tone }) => ($tone % 4 === 0 ? '50%' : '3px')};
  background: ${({ $tone }) =>
    $tone % 4 === 0
      ? palette.mango
      : $tone % 4 === 1
        ? brandVar.primary
        : $tone % 4 === 2
          ? palette.chili
          : palette.mangoDark};
  --dx: ${({ $dx }) => `${$dx}px`};
  animation: ${confettiFall} ${({ $duration }) => `${$duration}ms`} linear
    ${({ $delay }) => `${$delay}ms`} both;
`

export const Footer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.cartBar};
  padding: ${spacing.md} ${spacing.lg} calc(${spacing.md} + env(safe-area-inset-bottom, 0px));
  background: ${palette.creamFog};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-top: 1px solid ${palette.line};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.lg} ${spacing.xl} calc(${spacing.lg} + env(safe-area-inset-bottom, 0px));
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.lg} ${spacing['2xl']} calc(${spacing.lg} + env(safe-area-inset-bottom, 0px));
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.xl} ${spacing['2xl']} calc(${spacing.xl} + env(safe-area-inset-bottom, 0px));
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.xl} ${spacing['3xl']} calc(${spacing.xl} + env(safe-area-inset-bottom, 0px));
  }

  @media (prefers-reduced-transparency: reduce) {
    background: ${palette.cream};
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
`

export const FooterInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  max-width: 640px;
  margin-inline: auto;
`

export const PayHint = styled.p`
  margin: 0;
  font-size: ${fontSizes.labelSm};
  font-weight: 600;
  color: ${palette.inkSoft};
`

export const Totals = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`

export const TotalLine = styled.div<{ $emphasis?: boolean }>`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-weight: ${({ $emphasis }) => ($emphasis ? 800 : 600)};
  font-size: ${({ $emphasis }) => ($emphasis ? fontSizes.bodyLg : fontSizes.label)};
  color: ${palette.ink};
`

export const TotalValue = styled.span`
  font-size: ${fontSizes.h3};
  font-weight: 800;
`

export const ErrorBanner = styled.p`
  margin: 0;
  padding: ${spacing.md} ${spacing.lg};
  background: ${palette.chili};
  color: ${palette.white};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};
  font-weight: 700;
  font-size: ${fontSizes.label};
`

export const EmptyWrap = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing['3xl']} ${spacing.lg};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing['3xl']} ${spacing.xl};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing['4xl']} ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing['4xl']} ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing['5xl']} ${spacing['3xl']};
  }
`
