import styled from 'styled-components'

import { dashboardHint, dashboardPage, dashboardTitle } from '@/pages/dashboard/shared'
import { fontSizes, fontWeights, palette, radii, shadows, spacing } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export const Page = styled.div`
  ${dashboardPage};
  max-width: none;
`

export const Title = styled.h1`
  ${dashboardTitle};
`

export const Hint = styled.p`
  ${dashboardHint};
`

export const RangeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.xl};
`

export const SectionLabel = styled.h2`
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${spacing.sm};
  font-size: ${fontSizes.label};
  font-weight: 600;
  color: ${brandVar.accentText};
  margin: ${spacing['2xl']} 0 ${spacing.md};

  ${({ theme }) => theme.media.md} {
    margin-top: ${spacing['3xl']};
  }
`

export const TileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${spacing.md};
  align-items: start;

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.lg};
  }

  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (min-width: 1600px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
`

export const Tile = styled.div`
  display: grid;
  gap: ${spacing.xs};
  padding: ${spacing.md};
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.lg};
  }
`

export const TileValue = styled.p`
  font-size: ${fontSizes.h2};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.03em;
  line-height: 1.1;
`

export const TileLabel = styled.p`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
`

export const SavingsCard = styled.section`
  display: grid;
  gap: ${spacing.md};
  padding: ${spacing.lg};
  background: ${palette.chutney};
  color: ${palette.white};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.md};

  ${({ theme }) => theme.media.md} {
    padding: ${spacing['2xl']};
  }
`

export const SavingsTitle = styled.h3`
  font-size: ${fontSizes.h3};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.02em;
`

export const SavingsBody = styled.p`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  opacity: 0.9;
  max-width: 56ch;
`

export const SavingsHeadline = styled.p`
  font-size: ${fontSizes.display};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.04em;
  line-height: 1;
`

export const SavingsRows = styled.dl`
  display: grid;
  gap: ${spacing.sm};

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: ${spacing.lg};
  }
`

export const SavingsRow = styled.div`
  display: grid;
  gap: 2px;
`

export const SavingsKey = styled.dt`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  opacity: 0.85;
`

export const SavingsValue = styled.dd`
  font-size: ${fontSizes.subheading};
  font-weight: ${fontWeights.bold};
`

export const ListCard = styled.section`
  display: grid;
  gap: ${spacing.sm};
  padding: ${spacing.lg};
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};
`

export const ListTitle = styled.h3`
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${spacing.sm};
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.bold};
  color: ${palette.inkSoft};
`

export const ListRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${spacing.md};
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
`

export const ListName = styled.span`
  min-width: 0;
  overflow-wrap: anywhere;
`

export const ListCount = styled.span`
  font-weight: ${fontWeights.bold};
  white-space: nowrap;
`

export const CardGrid = styled.div`
  display: grid;
  align-items: start;
  gap: ${spacing.md};

  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${spacing.lg};
  }

  ${({ theme }) => theme.media.xl} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 1600px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`

export const HourBars = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 96px;
  overflow-x: auto;
`

export const HourBar = styled.div<{ $ratio: number }>`
  flex: 1 0 12px;
  min-width: 12px;
  height: ${({ $ratio }) => Math.max(4, Math.round($ratio * 96))}px;
  border-radius: ${radii.sm} ${radii.sm} 0 0;
  background: ${brandVar.primary};
`

export const HourLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
`

export const ProCard = styled.section`
  display: grid;
  gap: ${spacing.md};
  padding: ${spacing.lg};
  background: ${palette.mangoWash};
  border: 1.5px solid ${palette.mangoDark};
  border-radius: ${radii.lg};

  ${({ theme }) => theme.media.md} {
    padding: ${spacing['2xl']};
  }
`

export const ProTitle = styled.h3`
  font-size: ${fontSizes.h3};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.02em;
`

export const ProBody = styled.p`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
  max-width: 56ch;
`

export const ProActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
`

export const DishList = styled.div`
  display: grid;
  gap: ${spacing.md};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    gap: ${spacing.lg};
  }

  ${({ theme }) => theme.media.xl} {
    gap: ${spacing.xl};
  }
`

export const DishRowItem = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.md} ${spacing.lg};
  background: ${palette.white};
  border: 1px solid ${palette.line};
  border-radius: ${radii.md};
`

export const DishMain = styled.div`
  display: grid;
  gap: 2px;
  min-width: 0;
`

export const DishName = styled.p`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.bold};
  overflow-wrap: anywhere;
`

export const DishMeta = styled.p`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
`

export const DishNumbers = styled.div`
  flex-shrink: 0;
  display: grid;
  justify-items: end;
  gap: 2px;
`

export const DishUnits = styled.p`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.black};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`

export const VerdictPill = styled.span<{ $tone: 'ok' | 'warn' | 'muted' }>`
  padding: 2px ${spacing.sm};
  border-radius: ${radii.full};
  font-size: 0.6875rem;
  font-weight: ${fontWeights.bold};
  white-space: nowrap;
  color: ${({ $tone }) => ($tone === 'ok' ? palette.white : palette.ink)};
  background: ${({ $tone }) =>
    $tone === 'ok' ? palette.chutney : $tone === 'warn' ? palette.mango : palette.line};
`
