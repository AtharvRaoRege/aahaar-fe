import styled, { css } from 'styled-components'

import { punch } from '@/styles/mixins'
import { fontSizes, fontWeights, palette, radii, shadows, spacing } from '@/styles/theme'
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

export const Ticket = styled.section`
  position: relative;
  display: grid;
  gap: ${spacing.xs};
  margin: 0 0 ${spacing.lg};
  padding: ${spacing.lg} ${spacing.md} ${spacing.xl};
  background: ${palette.cream};
  color: ${palette.ink};
  border: 1.5px solid ${palette.ink};
  box-shadow: ${shadows.md};
  clip-path: polygon(
    0% 0%,
    100% 0%,
    100% 96%,
    95% 100%,
    90% 96%,
    85% 100%,
    80% 96%,
    75% 100%,
    70% 96%,
    65% 100%,
    60% 96%,
    55% 100%,
    50% 96%,
    45% 100%,
    40% 96%,
    35% 100%,
    30% 96%,
    25% 100%,
    20% 96%,
    15% 100%,
    10% 96%,
    5% 100%,
    0% 96%
  );

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.lg} ${spacing.lg} ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.xl} ${spacing.xl} ${spacing['2xl']};
  }
`

export const TicketHead = styled.p`
  margin: 0 0 ${spacing.sm};
  padding-bottom: ${spacing.sm};
  border-bottom: 1px dashed ${palette.line};
  text-align: center;
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  letter-spacing: 0.14em;
  text-transform: uppercase;
`

export const TicketRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${spacing.md};
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  line-height: 1.35;

  ${({ theme }) => theme.media.md} {
    font-size: ${fontSizes.body};
  }
`

export const TicketNote = styled.p`
  margin: ${spacing.xs} 0 0;
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
  line-height: 1.4;
`

export const TicketTotal = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${spacing.md};
  margin-top: ${spacing.sm};
  padding-top: ${spacing.sm};
  border-top: 1px dashed ${palette.line};
  font-size: ${fontSizes.body};
  font-weight: ${fontWeights.black};
`

export const TicketStamp = styled.span`
  margin: ${spacing.md} auto 0;
  display: block;
  width: fit-content;
  padding: 3px ${spacing.md};
  border: 2px solid ${palette.chutney};
  border-radius: ${radii.sm};
  color: ${palette.chutney};
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.black};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transform: rotate(-6deg);
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
