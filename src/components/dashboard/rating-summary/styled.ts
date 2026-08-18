import styled from 'styled-components'

import { fontSizes, palette, radii, shadows, spacing } from '@/styles/theme'

export const Grid = styled.div`
  display: grid;
  gap: ${spacing.sm};
  grid-template-columns: 1fr;

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.lg} {
    gap: ${spacing.lg};
  }

  ${({ theme }) => theme.media.xl} {
    gap: ${spacing.lg};
  }
`

export const Card = styled.div`
  display: grid;
  gap: ${spacing.xs};
  padding: ${spacing.lg};
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.sm};

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.xl};
  }
`

export const Hero = styled.div`
  display: grid;
  gap: ${spacing.sm};
  padding: ${spacing.xl};
  background: ${palette.mango};
  color: ${palette.white};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.md};

  ${({ theme }) => theme.media.md} {
    padding: ${spacing['2xl']};
  }
`

export const Average = styled.p`
  margin: 0;
  font-size: ${fontSizes.h1};
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
`

export const Label = styled.p`
  margin: 0;
  font-size: ${fontSizes.label};
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${palette.inkSoft};
`

export const HeroLabel = styled(Label)`
  color: ${palette.white};
`

export const Value = styled.p`
  margin: 0;
  font-size: ${fontSizes.h2};
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${palette.ink};
`

export const Bars = styled.div`
  display: grid;
  gap: ${spacing.xs};
`

export const BarRow = styled.div`
  display: grid;
  grid-template-columns: 16px minmax(0, 1fr) 28px;
  gap: ${spacing.sm};
  align-items: center;
  font-size: ${fontSizes.label};
  font-weight: 700;
  color: ${palette.ink};
`

export const Track = styled.div`
  height: 8px;
  overflow: hidden;
  background: ${palette.cream};
  border-radius: ${radii.full};
`

export const Fill = styled.span<{ $width: number }>`
  display: block;
  height: 100%;
  width: ${({ $width }) => `${$width}%`};
  background: ${palette.mango};
`
