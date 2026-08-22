import styled, { keyframes } from 'styled-components'

import { fontSizes, fontWeights, palette, radii, shadows, spacing } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

const popIn = keyframes`
  from { transform: translateY(28px) scale(0.96); opacity: 0; }
  to { transform: translateY(0) scale(1); opacity: 1; }
`

const idleBounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`

const popScore = keyframes`
  0% { transform: translate(-50%, 0) scale(0.6); opacity: 0; }
  20% { transform: translate(-50%, -8px) scale(1.15); opacity: 1; }
  100% { transform: translate(-50%, -36px) scale(1); opacity: 0; }
`

const pulseCombo = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.06); }
  100% { transform: scale(1); }
`

const snapPulse = keyframes`
  0% { transform: scale(1); }
  40% { transform: scale(0.94); }
  100% { transform: scale(1); }
`

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: grid;
  place-items: end center;
  padding: ${spacing.lg};
  padding-bottom: max(${spacing.lg}, env(safe-area-inset-bottom, 0px));
  background: rgba(28, 25, 22, 0.5);

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.xl};
    padding-bottom: max(${spacing.xl}, env(safe-area-inset-bottom, 0px));
  }

  ${({ theme }) => theme.media.md} {
    place-items: center;
    padding: ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing['3xl']};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing['4xl']};
  }
`

export const Sheet = styled.div`
  width: min(100%, 400px);
  display: grid;
  grid-template-columns: 1fr;
  justify-items: stretch;
  gap: ${spacing.md};
  padding: ${spacing.xl};
  background: ${palette.cream};
  border: 2px solid ${palette.ink};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.lg};
  animation: ${popIn} 280ms ease-out;

  ${({ theme }) => theme.media.md} {
    width: min(100%, 440px);
    gap: ${spacing.lg};
    padding: ${spacing['2xl']};
  }
`

export const Header = styled.header`
  display: grid;
  gap: ${spacing.xs};
  text-align: center;
  justify-items: center;
`

export const Kicker = styled.p`
  margin: 0;
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${brandVar.accentText};
`

export const Title = styled.h2`
  margin: 0;
  font-size: ${fontSizes.h2};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.03em;
  line-height: 1.15;
  color: ${palette.ink};
  text-wrap: balance;
`

export const Subtitle = styled.p`
  margin: 0;
  max-width: 28ch;
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
  line-height: 1.45;
`

export const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${spacing.sm};
  width: 100%;
`

export const StatCard = styled.div<{ $accent?: boolean; $flash?: boolean }>`
  display: grid;
  gap: 2px;
  justify-items: center;
  align-content: center;
  min-height: 64px;
  padding: ${spacing.sm};
  text-align: center;
  border-radius: ${radii.md};
  border: 1.5px solid ${({ $accent }) => ($accent ? brandVar.primary : palette.ink)};
  background: ${({ $accent }) => ($accent ? palette.chiliWash : palette.white)};
  box-shadow: ${shadows.sm};
  animation: ${({ $flash }) => ($flash ? pulseCombo : 'none')} 280ms ease-out;
`

export const StatLabel = styled.span`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${palette.inkSoft};
`

export const StatValue = styled.span`
  font-size: ${fontSizes.h3};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.03em;
  color: ${palette.ink};
  line-height: 1;
`

export const TimerTrack = styled.div`
  width: 100%;
  height: 8px;
  overflow: hidden;
  border-radius: ${radii.full};
  background: ${palette.line};
`

export const TimerFill = styled.div<{ $progress: number; $urgent?: boolean }>`
  height: 100%;
  width: ${({ $progress }) => `${Math.max(0, Math.min(100, $progress * 100))}%`};
  border-radius: inherit;
  background: ${({ $urgent }) =>
    $urgent
      ? `linear-gradient(90deg, ${palette.chili}, ${palette.mango})`
      : `linear-gradient(90deg, ${brandVar.primary}, ${palette.mango})`};
  transition:
    width 80ms linear,
    background 200ms ease;
`

export const Arena = styled.div<{ $chaos?: boolean }>`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  display: grid;
  align-content: center;
  justify-items: center;
  gap: ${spacing.lg};
  padding: ${spacing.lg};
  border-radius: ${radii.md};
  border: 2px solid ${palette.ink};
  background:
    radial-gradient(circle at 50% 0%, ${palette.chiliWash} 0%, transparent 55%),
    linear-gradient(
      180deg,
      ${palette.cream} 0%,
      ${({ $chaos }) => ($chaos ? palette.chiliWash : palette.mangoWash)} 100%
    );
  box-shadow: inset 0 -18px 0 ${palette.chiliWash};
  transition: background 400ms ease;

  ${({ theme }) => theme.media.md} {
    height: 320px;
  }
`

export const IdleState = styled.div`
  display: grid;
  place-content: center;
  justify-items: center;
  gap: ${spacing.sm};
  text-align: center;
`

export const IdleEmoji = styled.span`
  font-size: 2.75rem;
  line-height: 1;
  animation: ${idleBounce} 1.6s ease-in-out infinite;
`

export const Hint = styled.p`
  margin: 0;
  max-width: 26ch;
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
  line-height: 1.4;
  text-align: center;
`

export const Gauge = styled.div`
  position: relative;
  width: 100%;
  max-width: 280px;
  height: 44px;
  border-radius: ${radii.full};
  border: 2px solid ${palette.ink};
  background: ${palette.white};
  box-shadow: ${shadows.sm};
  overflow: hidden;
`

export const Zone = styled.div<{ $width: number }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ $width }) => `${50 - $width / 2}%`};
  width: ${({ $width }) => `${$width}%`};
  background: ${palette.chutneyWash};
  border-left: 1.5px dashed ${palette.chutney};
  border-right: 1.5px dashed ${palette.chutney};
`

export const ZoneCore = styled.div<{ $width: number }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ $width }) => `${50 - ($width * 0.35) / 2}%`};
  width: ${({ $width }) => `${$width * 0.35}%`};
  background: ${palette.chutney};
  opacity: 0.35;
`

export const Needle = styled.div<{ $left: number }>`
  position: absolute;
  top: 2px;
  bottom: 2px;
  left: ${({ $left }) => `${$left}%`};
  width: 28px;
  margin-left: -14px;
  display: grid;
  place-items: center;
  border-radius: ${radii.full};
  border: 2px solid ${palette.ink};
  background: ${palette.mango};
  box-shadow: ${shadows.md};
  font-size: 1.1rem;
  line-height: 1;
  z-index: 2;
  will-change: left;
`

export const SnapButton = styled.button<{ $busy?: boolean }>`
  width: min(100%, 200px);
  min-height: 56px;
  border: 2px solid ${palette.ink};
  border-radius: ${radii.full};
  background: ${brandVar.primary};
  color: ${palette.white};
  font-size: ${fontSizes.bodyLg};
  font-weight: ${fontWeights.black};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  box-shadow: ${shadows.md};
  opacity: ${({ $busy }) => ($busy ? 0.75 : 1)};
  animation: ${({ $busy }) => ($busy ? snapPulse : 'none')} 280ms ease-out;

  &:active {
    transform: scale(0.96);
  }
`

export const PopLabel = styled.span<{ $tone: 'good' | 'bad' | 'bonus' }>`
  position: absolute;
  left: 50%;
  top: 18%;
  z-index: 4;
  pointer-events: none;
  color: ${({ $tone }) =>
    $tone === 'bad' ? palette.chili : $tone === 'bonus' ? palette.mangoDark : brandVar.accentText};
  font-size: ${fontSizes.bodyLg};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.02em;
  animation: ${popScore} 560ms ease-out both;
`

export const WaveBanner = styled.p`
  position: absolute;
  inset: auto 12% 42%;
  z-index: 4;
  margin: 0;
  padding: ${spacing.sm} ${spacing.md};
  text-align: center;
  border-radius: ${radii.md};
  border: 1.5px solid ${palette.ink};
  background: ${palette.white};
  color: ${palette.ink};
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.02em;
  box-shadow: ${shadows.md};
  pointer-events: none;
  animation: ${pulseCombo} 900ms ease-out both;
`

export const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.sm};
  width: 100%;
  align-items: stretch;

  & > * {
    width: 100%;
  }
`

export const ResultBanner = styled.p`
  position: absolute;
  left: ${spacing.sm};
  right: ${spacing.sm};
  bottom: ${spacing.sm};
  z-index: 4;
  margin: 0;
  padding: ${spacing.sm} ${spacing.md};
  text-align: center;
  border-radius: ${radii.md};
  border: 1.5px solid ${palette.mangoDark};
  background: ${palette.mangoWash};
  color: ${palette.ink};
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.bold};
  pointer-events: none;
  box-shadow: ${shadows.sm};
`

export const ResultModal = styled.div`
  position: absolute;
  inset: 0;
  z-index: 5;
  display: grid;
  place-items: center;
  padding: ${spacing.lg};
  background: rgba(28, 25, 22, 0.55);
  border-radius: inherit;
`

export const ResultCard = styled.div`
  width: min(100%, 280px);
  display: grid;
  gap: ${spacing.md};
  justify-items: center;
  padding: ${spacing.xl};
  text-align: center;
  background: ${palette.cream};
  border: 2px solid ${palette.ink};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.lg};
`

export const ResultScore = styled.p`
  margin: 0;
  font-size: ${fontSizes.h1};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.04em;
  color: ${brandVar.accentText};
  line-height: 1;
`

export const ResultActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.sm};
  width: 100%;

  & > * {
    width: 100%;
  }
`
