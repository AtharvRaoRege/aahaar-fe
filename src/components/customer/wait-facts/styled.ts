import styled, { keyframes } from 'styled-components'

import { fontSizes, fontWeights, palette, radii, shadows, spacing } from '@/styles/theme'

import { FACT_ROTATE_MS } from './helper'
import { brandVar } from '@/utils/theme/brand-palette'

const fade = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
`

const drain = keyframes`
  from { transform: scaleX(1); }
  to { transform: scaleX(0); }
`

export const FactCard = styled.aside`
  display: grid;
  gap: ${spacing.sm};
  margin: 0 0 ${spacing.lg};
  padding: ${spacing.md} ${spacing.md} ${spacing.sm};
  background: ${palette.white};
  border: 1.5px solid ${palette.ink};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.md} ${spacing.lg} ${spacing.sm};
  }

  ${({ theme }) => theme.media.md} {
    margin-bottom: ${spacing.xl};
    padding: ${spacing.lg} ${spacing.lg} ${spacing.md};
  }

  ${({ theme }) => theme.media.lg} {
    margin-bottom: ${spacing.xl};
  }

  ${({ theme }) => theme.media.xl} {
    margin-bottom: ${spacing.xl};
  }
`

export const FactKicker = styled.p`
  margin: 0;
  font-size: ${fontSizes.micro};
  font-weight: ${fontWeights.bold};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${brandVar.accentText};

  ${({ theme }) => theme.media.md} {
    font-size: ${fontSizes.labelSm};
  }
`

export const FactText = styled.p`
  margin: 0;
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  line-height: 1.4;
  color: ${palette.ink};
  animation: ${fade} 280ms ease-out;

  ${({ theme }) => theme.media.md} {
    font-size: ${fontSizes.body};
    line-height: 1.45;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const TimerTrack = styled.div`
  margin-top: ${spacing.xs};
  height: 3px;
  overflow: hidden;
  border-radius: ${radii.full};
  background: ${palette.line};
`

export const TimerFill = styled.span`
  display: block;
  width: 100%;
  height: 100%;
  transform-origin: left center;
  background: ${brandVar.primary};
  border-radius: inherit;
  animation: ${drain} ${FACT_ROTATE_MS}ms linear forwards;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: scaleX(1);
    opacity: 0.55;
  }
`
