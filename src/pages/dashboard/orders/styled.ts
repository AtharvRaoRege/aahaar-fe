import styled from 'styled-components'

import { dashboardHint, dashboardPage, dashboardTitle } from '@/pages/dashboard/shared'
import { cardGrid } from '@/styles/mixins'
import { fontSizes, palette, radii, spacing } from '@/styles/theme'

export const Page = styled.div`
  ${dashboardPage};
  max-width: none;
  padding-top: ${spacing.md};
  padding-bottom: ${spacing.xl};

  ${({ theme }) => theme.media.sm} {
    padding-top: ${spacing.lg};
    padding-bottom: ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.md} {
    padding-top: ${spacing.lg};
    padding-bottom: ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.lg} {
    padding-top: ${spacing.xl};
    padding-bottom: ${spacing['3xl']};
  }

  ${({ theme }) => theme.media.xl} {
    padding-top: ${spacing.xl};
    padding-bottom: ${spacing['3xl']};
  }
`

export const Title = styled.h1`
  ${dashboardTitle};
  font-size: clamp(1.25rem, 2.6vw, 1.65rem);
`

export const Hint = styled.p`
  ${dashboardHint};
  margin: ${spacing.xs} 0 ${spacing.md};
  font-size: ${fontSizes.label};
`

export const HeadRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: ${spacing.sm};
`

export const LiveCount = styled.p`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.xs};
  padding: 2px ${spacing.sm};
  border-radius: ${radii.full};
  background: ${palette.white};
  border: 1px solid ${palette.line};
  font-size: ${fontSizes.labelSm};
  font-weight: 700;
  white-space: nowrap;

  strong {
    font-variant-numeric: tabular-nums;
  }
`

export const ErrorBanner = styled.p`
  padding: ${spacing.sm} ${spacing.md};
  margin-bottom: ${spacing.md};
  background: ${palette.chili};
  color: ${palette.white};
  border-radius: ${radii.md};
  font-weight: 600;
  font-size: ${fontSizes.labelSm};
  line-height: 1.4;
`

export const OfflineNote = styled.p`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.xs} ${spacing.sm};
  margin-bottom: ${spacing.md};
  background: ${palette.mangoWash};
  border: 1px solid ${palette.mangoDark};
  border-radius: ${radii.sm};
  font-size: ${fontSizes.micro};
  font-weight: 600;
  color: ${palette.ink};
`

export const Toolbar = styled.div`
  display: grid;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.sm};
`

export const FilterGrid = styled.div`
  display: grid;
  gap: ${spacing.sm};
  align-items: end;

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto;
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: minmax(140px, 200px) minmax(140px, 200px) auto;
    justify-content: start;
  }
`

export const TabRow = styled.div`
  display: flex;
  gap: ${spacing.xs};
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: none;
  padding-bottom: 2px;
  margin-bottom: ${spacing.sm};

  &::-webkit-scrollbar {
    display: none;
  }

  ${({ theme }) => theme.media.md} {
    overflow-x: visible;
    flex-wrap: wrap;
    gap: ${spacing.sm};
  }
`

export const Tab = styled.button<{ $active: boolean }>`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: ${spacing.xs};
  min-height: 34px;
  padding: 0 ${spacing.md};
  border-radius: ${radii.full};
  border: 1px solid ${({ $active }) => ($active ? palette.ink : palette.line)};
  background: ${({ $active }) => ($active ? palette.ink : palette.white)};
  color: ${({ $active }) => ($active ? palette.white : palette.ink)};
  font-size: ${fontSizes.labelSm};
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
`

export const TabCount = styled.span<{ $active: boolean }>`
  min-width: 18px;
  padding: 0 ${spacing.xs};
  border-radius: ${radii.full};
  background: ${({ $active }) => ($active ? palette.white : palette.line)};
  color: ${palette.ink};
  font-size: ${fontSizes.micro};
  font-weight: 800;
  font-variant-numeric: tabular-nums;
`

export const ResultCount = styled.p`
  font-size: ${fontSizes.micro};
  font-weight: 600;
  color: ${palette.inkSoft};
  margin-bottom: ${spacing.sm};
`

export const Grid = styled.div`
  ${cardGrid('280px')};
  gap: ${spacing.sm};
  padding-bottom: ${spacing.lg};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.md} {
    ${cardGrid('260px')};
    gap: ${spacing.md};
  }
`
