import styled, { css } from 'styled-components'

import { punch } from '@/styles/mixins'
import { fontSizes, palette, radii, shadows, spacing } from '@/styles/theme'

export const Page = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: max(${spacing.xl}, env(safe-area-inset-top, 0px)) ${spacing.lg}
    calc(${spacing['4xl']} + env(safe-area-inset-bottom, 0px));

  ${({ theme }) => theme.media.sm} {
    padding: max(${spacing.xl}, env(safe-area-inset-top, 0px)) ${spacing.xl}
      calc(${spacing['4xl']} + env(safe-area-inset-bottom, 0px));
  }

  ${({ theme }) => theme.media.md} {
    max-width: 560px;
    width: 100%;
    margin-inline: auto;
    padding: max(${spacing['2xl']}, env(safe-area-inset-top, 0px)) ${spacing['2xl']}
      calc(${spacing['5xl']} + env(safe-area-inset-bottom, 0px));
  }

  ${({ theme }) => theme.media.lg} {
    padding-bottom: calc(${spacing['5xl']} + env(safe-area-inset-bottom, 0px));
  }

  ${({ theme }) => theme.media.xl} {
    padding-bottom: calc(${spacing['6xl']} + env(safe-area-inset-bottom, 0px));
  }
`

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  margin-bottom: ${spacing['2xl']};
`

export const Kicker = styled.p`
  margin: 0;
  font-size: ${fontSizes.labelSm};
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${palette.tomato};
`

export const Title = styled.h1`
  margin: 0;
  font-size: ${fontSizes.h1};
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${palette.ink};
`

export const Hint = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: ${fontSizes.label};
  color: ${palette.inkSoft};
`

export const Timeline = styled.ol`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin: 0 0 ${spacing['2xl']};
  padding: ${spacing.lg} 0;
`

export const Step = styled.li<{ $state: 'done' | 'current' | 'upcoming' }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.sm};
  color: ${({ $state }) => ($state === 'upcoming' ? palette.inkSoft : palette.ink)};
  opacity: ${({ $state }) => ($state === 'upcoming' ? 0.7 : 1)};
`

export const Dot = styled.span<{ $state: 'done' | 'current' | 'upcoming' }>`
  width: 14px;
  height: 14px;
  border-radius: ${radii.full};
  border: 2px solid
    ${({ $state }) =>
      $state === 'upcoming' ? palette.line : $state === 'done' ? palette.chutney : palette.tomato};
  background: ${({ $state }) =>
    $state === 'done' ? palette.chutney : $state === 'current' ? palette.tomato : palette.white};
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
  top: 6px;
  left: calc(50% + 10px);
  width: calc(100% - 20px);
  height: 2px;
  background: ${({ $done }) => ($done ? palette.chutney : palette.line)};
`

export const StepLabel = styled.span`
  font-size: ${fontSizes.labelSm};
  font-weight: 700;
  text-align: center;
  color: ${palette.ink};

  ${({ theme }) => theme.media.sm} {
    font-size: ${fontSizes.label};
  }

  ${({ theme }) => theme.media.md} {
    font-size: ${fontSizes.label};
  }

  ${({ theme }) => theme.media.lg} {
    font-size: ${fontSizes.label};
  }

  ${({ theme }) => theme.media.xl} {
    font-size: ${fontSizes.body};
  }
`

export const Summary = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  padding: ${spacing.lg};
  background: ${palette.white};
  border: 1px solid ${palette.line};
  border-radius: ${radii.md};
  box-shadow: ${shadows.card};
  margin-bottom: ${spacing.xl};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.xl};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.xl};
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing['2xl']};
  }
`

export const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${spacing.md};
  font-weight: 600;
  font-size: ${fontSizes.body};
  color: ${palette.ink};
`

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${spacing.sm};
  padding-top: ${spacing.md};
  border-top: 1px solid ${palette.line};
  font-weight: 800;
  font-size: ${fontSizes.bodyLg};
`

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`

export const RateSlot = styled.div`
  margin-top: ${spacing.xl};

  ${({ theme }) => theme.media.sm} {
    margin-top: ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.md} {
    margin-top: ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.lg} {
    margin-top: ${spacing['3xl']};
  }

  ${({ theme }) => theme.media.xl} {
    margin-top: ${spacing['3xl']};
  }
`
