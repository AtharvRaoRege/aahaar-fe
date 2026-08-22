import styled from 'styled-components'

import { fontSizes, fontWeights, palette, radii, shadows, spacing } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export const Wrap = styled.section`
  display: grid;
  gap: ${spacing.lg};
  margin-bottom: ${spacing.xl};
`

export const Head = styled.div`
  display: grid;
  gap: ${spacing.sm};
`

export const Title = styled.h2`
  margin: 0;
  font-size: ${fontSizes.h3};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.02em;
  color: ${palette.ink};
`

export const Hint = styled.p`
  margin: 0;
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
  line-height: 1.4;
`

export const RangeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
`

export const TileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${spacing.sm};

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  ${({ theme }) => theme.media.xl} {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`

export const Tile = styled.div`
  display: grid;
  gap: ${spacing.xs};
  min-height: 84px;
  padding: ${spacing.md};
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};
`

export const TileValue = styled.span`
  font-size: ${fontSizes.h3};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: ${palette.ink};
  word-break: break-word;
`

export const TileLabel = styled.span`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  color: ${palette.inkSoft};
`

export const SplitGrid = styled.div`
  display: grid;
  gap: ${spacing.md};

  ${({ theme }) => theme.media.md} {
    grid-template-columns: 1.2fr 1fr;
    gap: ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: 1.35fr 1fr;
  }

  ${({ theme }) => theme.media.xl} {
    grid-template-columns: 1.4fr 1fr;
  }
`

export const Card = styled.div`
  display: grid;
  gap: ${spacing.md};
  padding: ${spacing.lg};
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};
`

export const CardTitle = styled.h3`
  margin: 0;
  font-size: ${fontSizes.body};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.02em;
  color: ${palette.ink};
`

export const MixRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.sm};
`

export const MixCard = styled.div<{ $tone: 'pro' | 'basic' }>`
  display: grid;
  gap: ${spacing.xs};
  padding: ${spacing.md};
  border-radius: ${radii.md};
  border: 1.5px solid ${({ $tone }) => ($tone === 'pro' ? brandVar.primary : palette.line)};
  background: ${({ $tone }) => ($tone === 'pro' ? palette.chiliWash : palette.cream)};
`

export const MixValue = styled.span`
  font-size: ${fontSizes.h2};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.03em;
  color: ${palette.ink};
  line-height: 1;
`

export const MixLabel = styled.span`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  color: ${palette.inkSoft};
`

export const DayList = styled.div`
  display: grid;
  gap: ${spacing.sm};
  max-height: 320px;
  overflow: auto;
`

export const DayRow = styled.div`
  display: grid;
  grid-template-columns: 64px 1fr auto;
  gap: ${spacing.sm};
  align-items: center;
`

export const DayLabel = styled.span`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  color: ${palette.inkSoft};
`

export const DayTrack = styled.div`
  height: 10px;
  border-radius: ${radii.full};
  background: ${palette.line};
  overflow: hidden;
`

export const DayFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => `${Math.max(0, Math.min(100, $pct))}%`};
  border-radius: inherit;
  background: linear-gradient(90deg, ${brandVar.primary}, ${palette.mango});
`

export const DayMeta = styled.span`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  color: ${palette.ink};
  white-space: nowrap;
`

export const VenueList = styled.div`
  display: grid;
  gap: ${spacing.sm};
`

export const VenueRow = styled.div`
  display: grid;
  gap: ${spacing.xs};
  padding: ${spacing.md};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.md};
  background: ${palette.cream};
`

export const VenueTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.sm};
  min-width: 0;
`

export const VenueName = styled.strong`
  min-width: 0;
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.black};
  color: ${palette.ink};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const VenueBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.xs};
`

export const Badge = styled.span<{ $tone?: 'pro' | 'live' | 'draft' }>`
  padding: 2px ${spacing.sm};
  border-radius: ${radii.full};
  border: 1.5px solid
    ${({ $tone }) =>
      $tone === 'pro' ? brandVar.primary : $tone === 'live' ? palette.chutney : palette.line};
  background: ${({ $tone }) =>
    $tone === 'pro' ? palette.chiliWash : $tone === 'live' ? palette.chutneyWash : palette.white};
  color: ${palette.ink};
  font-size: ${fontSizes.micro};
  font-weight: ${fontWeights.black};
  letter-spacing: 0.04em;
  text-transform: uppercase;
`

export const VenueStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.md};
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  color: ${palette.inkSoft};
`

export const Empty = styled.p`
  margin: 0;
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
`
