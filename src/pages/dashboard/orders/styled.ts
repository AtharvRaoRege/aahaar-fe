import styled from 'styled-components'

import { dashboardHint, dashboardPage, dashboardTitle } from '@/pages/dashboard/shared'
import { cardGrid } from '@/styles/mixins'
import { fontSizes, palette, radii, spacing } from '@/styles/theme'

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

export const HeadRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: ${spacing.md};
`

export const LiveCount = styled.p`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.xs} ${spacing.md};
  border-radius: ${radii.full};
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  font-size: ${fontSizes.label};
  font-weight: 700;
  white-space: nowrap;

  strong {
    font-variant-numeric: tabular-nums;
  }
`

export const ErrorBanner = styled.p`
  padding: ${spacing.md} ${spacing.lg};
  margin-bottom: ${spacing.lg};
  background: ${palette.chili};
  color: ${palette.white};
  border-radius: ${radii.md};
  font-weight: 600;
  font-size: ${fontSizes.label};
  line-height: 1.4;
`

export const OfflineNote = styled.p`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.md};
  margin-bottom: ${spacing.lg};
  background: ${palette.mangoWash};
  border: 1px solid ${palette.mangoDark};
  border-radius: ${radii.sm};
  font-size: ${fontSizes.labelSm};
  font-weight: 600;
  color: ${palette.ink};
`

export const Toolbar = styled.div`
  display: grid;
  gap: ${spacing.md};
  margin-bottom: ${spacing.md};
`

export const FilterGrid = styled.div`
  display: grid;
  gap: ${spacing.sm};
  align-items: end;

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto;
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: minmax(160px, 240px) minmax(160px, 240px) auto;
    justify-content: start;
  }
`

export const TabRow = styled.div`
  display: flex;
  gap: ${spacing.sm};
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: none;
  padding-bottom: ${spacing.xs};
  margin-bottom: ${spacing.md};

  &::-webkit-scrollbar {
    display: none;
  }

  ${({ theme }) => theme.media.md} {
    overflow-x: visible;
    flex-wrap: wrap;
  }
`

export const Tab = styled.button<{ $active: boolean }>`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  min-height: 40px;
  padding: 0 ${spacing.lg};
  border-radius: ${radii.full};
  border: 1.5px solid ${({ $active }) => ($active ? palette.ink : palette.line)};
  background: ${({ $active }) => ($active ? palette.ink : palette.white)};
  color: ${({ $active }) => ($active ? palette.white : palette.ink)};
  font-size: ${fontSizes.label};
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
`

export const TabCount = styled.span<{ $active: boolean }>`
  min-width: 20px;
  padding: 1px ${spacing.sm};
  border-radius: ${radii.full};
  background: ${({ $active }) => ($active ? palette.white : palette.line)};
  color: ${palette.ink};
  font-size: ${fontSizes.micro};
  font-weight: 800;
  font-variant-numeric: tabular-nums;
`

export const ResultCount = styled.p`
  font-size: ${fontSizes.labelSm};
  font-weight: 600;
  color: ${palette.inkSoft};
  margin-bottom: ${spacing.md};
`

export const Grid = styled.div`
  ${cardGrid('320px')};
  gap: ${spacing.md};
  padding-bottom: ${spacing.xl};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.lg};
  }
`
