import styled, { css } from 'styled-components'

import { punch } from '@/styles/mixins'
import { fontSizes, fontWeights, palette, radii, spacing } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export const Page = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: max(${spacing.md}, env(safe-area-inset-top, 0px)) ${spacing.md}
    calc(${spacing['3xl']} + env(safe-area-inset-bottom, 0px));

  ${({ theme }) => theme.media.sm} {
    padding: max(${spacing.lg}, env(safe-area-inset-top, 0px)) ${spacing.lg}
      calc(${spacing['3xl']} + env(safe-area-inset-bottom, 0px));
  }

  ${({ theme }) => theme.media.md} {
    max-width: 480px;
    width: 100%;
    margin-inline: auto;
    padding: max(${spacing.xl}, env(safe-area-inset-top, 0px)) ${spacing.xl}
      calc(${spacing['4xl']} + env(safe-area-inset-bottom, 0px));
  }

  ${({ theme }) => theme.media.lg} {
    padding-bottom: calc(${spacing['4xl']} + env(safe-area-inset-bottom, 0px));
  }

  ${({ theme }) => theme.media.xl} {
    padding-bottom: calc(${spacing['5xl']} + env(safe-area-inset-bottom, 0px));
  }
`

export const Header = styled.header`
  display: grid;
  gap: ${spacing.xs};
  margin-bottom: ${spacing.md};
`

export const Kicker = styled.p`
  margin: 0;
  font-size: ${fontSizes.micro};
  font-weight: ${fontWeights.black};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${brandVar.accentText};
`

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.md};
  min-width: 0;
`

export const Title = styled.h1`
  margin: 0;
  min-width: 0;
  font-size: ${fontSizes.h2};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.03em;
  color: ${palette.ink};
  line-height: 1.1;

  ${({ theme }) => theme.media.md} {
    font-size: clamp(1.75rem, 3vw, 2.1rem);
  }
`

export const Hint = styled.p`
  margin: 0;
  font-weight: ${fontWeights.bold};
  font-size: ${fontSizes.labelSm};
  color: ${palette.inkSoft};
`

export const BadgeSlot = styled.div`
  margin-top: ${spacing.xs};
  width: fit-content;
`

export const Timeline = styled.ol`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: min(100%, 320px);
  margin: 0 auto ${spacing.lg};
  padding: ${spacing.sm} 0;
`

export const Step = styled.li<{ $state: 'done' | 'current' | 'upcoming' }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.xs};
  color: ${({ $state }) => ($state === 'upcoming' ? palette.inkSoft : palette.ink)};
  opacity: ${({ $state }) => ($state === 'upcoming' ? 0.7 : 1)};
`

export const Dot = styled.span<{ $state: 'done' | 'current' | 'upcoming' }>`
  width: 12px;
  height: 12px;
  border-radius: ${radii.full};
  border: 2px solid
    ${({ $state }) =>
      $state === 'upcoming' ? palette.line : $state === 'done' ? palette.chutney : brandVar.primary};
  background: ${({ $state }) =>
    $state === 'done' ? palette.chutney : $state === 'current' ? brandVar.primary : palette.white};
  z-index: 1;

  ${({ $state }) =>
    $state === 'current' &&
    css`
      animation: ${punch} 1.8s ease-out infinite;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const Rail = styled.span<{ $done: boolean }>`
  position: absolute;
  top: 5px;
  left: calc(50% + 8px);
  width: calc(100% - 16px);
  height: 2px;
  background: ${({ $done }) => ($done ? palette.chutney : palette.line)};
`

export const StepLabel = styled.span`
  font-size: ${fontSizes.micro};
  font-weight: ${fontWeights.bold};
  text-align: center;
  color: ${palette.ink};

  ${({ theme }) => theme.media.sm} {
    font-size: ${fontSizes.labelSm};
  }

  ${({ theme }) => theme.media.md} {
    font-size: ${fontSizes.label};
  }

  ${({ theme }) => theme.media.lg} {
    font-size: ${fontSizes.label};
  }

  ${({ theme }) => theme.media.xl} {
    font-size: ${fontSizes.label};
  }
`

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  margin-top: ${spacing.md};

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.lg};
    margin-top: ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    margin-top: ${spacing.xl};
  }

  ${({ theme }) => theme.media.xl} {
    margin-top: ${spacing.xl};
  }
`

export const RateSlot = styled.div`
  margin-top: ${spacing.lg};

  ${({ theme }) => theme.media.md} {
    margin-top: ${spacing.xl};
  }

  ${({ theme }) => theme.media.lg} {
    margin-top: ${spacing.xl};
  }

  ${({ theme }) => theme.media.xl} {
    margin-top: ${spacing.xl};
  }
`
