import styled from 'styled-components'

import { fadeIn } from '@/styles/mixins'
import { fontSizes, fontWeights, palette, radii, shadows, spacing } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: ${spacing.lg};
  background: color-mix(in srgb, ${palette.ink} 38%, transparent);
  animation: ${fadeIn} 160ms ease-out;

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.xl};
  }

  ${({ theme }) => theme.media.md} {
    align-items: center;
    padding: ${spacing['2xl']};
    backdrop-filter: blur(16px) saturate(160%);
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing['3xl']};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing['4xl']};
  }

  @media (prefers-reduced-transparency: reduce) {
    backdrop-filter: none;
    background: color-mix(in srgb, ${palette.ink} 62%, transparent);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const Card = styled.div`
  width: 100%;
  max-width: 420px;
  display: grid;
  gap: ${spacing.md};
  padding: ${spacing.xl} ${spacing.lg} calc(${spacing.xl} + env(safe-area-inset-bottom, 0px));
  background: ${palette.cream};
  border: 1.5px solid ${palette.ink};
  border-radius: ${radii.lg} ${radii.lg} 0 0;
  box-shadow: ${shadows.lg};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.xl};
  }

  ${({ theme }) => theme.media.md} {
    border-radius: ${radii.lg};
    padding: ${spacing['2xl']};
    gap: ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing['2xl']};
  }
`

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.xs};
  width: fit-content;
  padding: 2px ${spacing.sm};
  border-radius: ${radii.sm};
  border: 1.5px solid ${palette.ink};
  background: ${brandVar.primary};
  color: ${brandVar.onPrimary};
  font-size: ${fontSizes.micro};
  font-weight: ${fontWeights.black};
  letter-spacing: 0.04em;
  text-transform: uppercase;

  svg {
    width: 12px;
    height: 12px;
  }
`

export const Title = styled.h2`
  margin: 0;
  font-size: ${fontSizes.h3};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: ${palette.ink};
`

export const Message = styled.p`
  margin: 0;
  font-size: ${fontSizes.body};
  font-weight: ${fontWeights.medium};
  line-height: 1.45;
  color: ${palette.ink};
`

export const Body = styled.p`
  margin: 0;
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  line-height: 1.45;
  color: ${palette.inkSoft};
`

export const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.sm};
  margin-top: ${spacing.xs};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.lg} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.xl} {
    gap: ${spacing.md};
  }
`
