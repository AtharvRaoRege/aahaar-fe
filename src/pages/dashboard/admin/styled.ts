import styled from 'styled-components'

import { dashboardHint, dashboardPage, dashboardTitle } from '@/pages/dashboard/shared'
import { hideScrollbar } from '@/styles/mixins'
import { palette, radii, shadows, fontSizes, spacing } from '@/styles/theme'

export const Page = styled.div`
  ${dashboardPage};
  max-width: 1320px;
  margin-inline: auto;
`

export const Shell = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.md};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.sm} ${spacing.md};
    margin-bottom: ${spacing.md};
  }

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.md} ${spacing.lg};
    margin-bottom: ${spacing.xl};
  }

  ${({ theme }) => theme.media.lg} {
    margin-bottom: ${spacing.xl};
  }

  ${({ theme }) => theme.media.xl} {
    margin-bottom: ${spacing['2xl']};
  }
`

export const BrandBlock = styled.div`
  display: grid;
  gap: 4px;
  min-width: 0;
`

export const Brand = styled.p`
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.03em;
`

export const Title = styled.h1`
  ${dashboardTitle};
  font-size: 1.375rem;

  ${({ theme }) => theme.media.sm} {
    font-size: 1.5rem;
  }

  ${({ theme }) => theme.media.md} {
    font-size: clamp(1.5rem, 3vw, 2rem);
  }

  ${({ theme }) => theme.media.lg} {
    font-size: clamp(1.5rem, 3vw, 2rem);
  }

  ${({ theme }) => theme.media.xl} {
    font-size: clamp(1.5rem, 3vw, 2rem);
  }
`

export const Subtitle = styled.p`
  display: none;

  ${({ theme }) => theme.media.sm} {
    display: none;
  }

  ${({ theme }) => theme.media.md} {
    display: block;
    ${dashboardHint};
    margin-bottom: 0;
  }

  ${({ theme }) => theme.media.lg} {
    display: block;
  }

  ${({ theme }) => theme.media.xl} {
    display: block;
  }
`

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${spacing.xs};
  margin-bottom: ${spacing.md};
  ${hideScrollbar};

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.md} {
    display: flex;
    gap: ${spacing.sm};
    overflow-x: auto;
    margin-bottom: ${spacing.lg};
    padding-bottom: 2px;
  }

  ${({ theme }) => theme.media.lg} {
    display: flex;
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.xl} {
    display: flex;
    gap: ${spacing.sm};
  }
`

export const Tab = styled.button<{ $active: boolean }>`
  min-height: 36px;
  padding: 0 ${spacing.sm};
  font-size: ${fontSizes.micro};
  font-weight: 700;
  white-space: nowrap;
  border-radius: ${radii.md};
  background: ${({ $active }) => ($active ? palette.mango : palette.white)};
  color: ${palette.ink};
  border: 1.5px solid ${({ $active }) => ($active ? palette.mango : palette.line)};

  ${({ theme }) => theme.media.sm} {
    min-height: 38px;
    padding: 0 ${spacing.md};
    font-size: ${fontSizes.labelSm};
  }

  ${({ theme }) => theme.media.md} {
    min-height: 40px;
    padding: 0 14px;
    font-size: ${fontSizes.body};
    font-weight: 600;
  }

  ${({ theme }) => theme.media.lg} {
    min-height: 40px;
  }

  ${({ theme }) => theme.media.xl} {
    min-height: 40px;
  }
`

export const TabCount = styled.span`
  margin-left: 4px;
  font-size: ${fontSizes.micro};
  font-weight: 800;

  ${({ theme }) => theme.media.sm} {
    font-size: ${fontSizes.micro};
  }

  ${({ theme }) => theme.media.md} {
    margin-left: 6px;
    font-size: ${fontSizes.labelSm};
  }

  ${({ theme }) => theme.media.lg} {
    font-size: ${fontSizes.labelSm};
  }

  ${({ theme }) => theme.media.xl} {
    font-size: ${fontSizes.labelSm};
  }
`

export const FilterRow = styled.div`
  display: flex;
  gap: ${spacing.xs};
  overflow-x: auto;
  margin: 0 0 ${spacing.md};
  padding-bottom: 2px;
  ${hideScrollbar};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.md} {
    flex-wrap: wrap;
    gap: ${spacing.sm};
    margin: -4px 0 ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    margin: -4px 0 ${spacing.lg};
  }

  ${({ theme }) => theme.media.xl} {
    margin: -4px 0 ${spacing.lg};
  }
`

export const FilterChip = styled.button<{ $active: boolean }>`
  flex: 0 0 auto;
  min-height: 32px;
  padding: 0 ${spacing.md};
  font-size: ${fontSizes.micro};
  font-weight: 700;
  white-space: nowrap;
  border-radius: ${radii.full};
  background: ${({ $active }) => ($active ? palette.mango : palette.cream)};
  color: ${palette.ink};
  border: 1.5px solid ${({ $active }) => ($active ? palette.mango : palette.line)};

  ${({ theme }) => theme.media.sm} {
    min-height: 32px;
    font-size: ${fontSizes.labelSm};
  }

  ${({ theme }) => theme.media.md} {
    min-height: 36px;
    font-size: ${fontSizes.label};
  }

  ${({ theme }) => theme.media.lg} {
    min-height: 36px;
  }

  ${({ theme }) => theme.media.xl} {
    min-height: 36px;
  }
`

export const Toolbar = styled.div`
  display: grid;
  gap: ${spacing.xs};
  margin-bottom: ${spacing.md};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.md} {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: ${spacing.md};
    margin-bottom: ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    display: flex;
    margin-bottom: ${spacing.lg};
  }

  ${({ theme }) => theme.media.xl} {
    display: flex;
  }
`

export const Count = styled.p`
  font-size: ${fontSizes.labelSm};
  font-weight: 600;
  color: ${palette.inkSoft};

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
    font-size: ${fontSizes.label};
  }
`

export const ErrorText = styled.p`
  color: ${palette.chili};
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 12px;
`

export const TableWrap = styled.div`
  display: none;
  overflow-x: auto;
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.sm};

  ${({ theme }) => theme.media.md} {
    display: block;
  }

  ${({ theme }) => theme.media.lg} {
    display: block;
  }

  ${({ theme }) => theme.media.xl} {
    display: block;
  }
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9375rem;

  th,
  td {
    text-align: left;
    padding: 12px 14px;
    vertical-align: middle;
  }

  th {
    font-size: 0.6875rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${palette.inkSoft};
    border-bottom: 1.5px solid ${palette.line};
    white-space: nowrap;
  }

  td {
    border-bottom: 1px solid ${palette.line};
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  td:last-child {
    white-space: nowrap;
  }
`

export const Strong = styled.p`
  font-weight: 700;
  line-height: 1.3;
`

export const Meta = styled.p`
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${palette.inkSoft};
  line-height: 1.35;
`

export const Pill = styled.span<{ $tone?: 'wait' | 'ok' | 'muted' | 'bad' }>`
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 8px;
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-radius: ${radii.full};
  background: ${({ $tone }) =>
    $tone === 'wait'
      ? palette.mango
      : $tone === 'ok'
        ? palette.chutneyWash
        : $tone === 'bad'
          ? palette.chiliWash
          : palette.cream};
  color: ${palette.ink};
`

export const CardList = styled.div`
  display: grid;
  gap: ${spacing.sm};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.md} {
    display: none;
  }

  ${({ theme }) => theme.media.lg} {
    display: none;
  }

  ${({ theme }) => theme.media.xl} {
    display: none;
  }
`

export const CardHead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${spacing.sm};

  ${Strong} {
    flex: 1;
    min-width: 0;
  }
`

export const PillRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.xs};
`

export const Card = styled.article`
  display: grid;
  gap: ${spacing.xs};
  padding: ${spacing.md};
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.sm};
    padding: ${spacing.md} ${spacing.lg};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.lg};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.lg};
  }
`

export const CardActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`

export const InlineActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
`

export const SearchSlot = styled.div`
  flex: 1;
  min-width: min(100%, 260px);

  & > div {
    border-width: 1.5px;
    border-color: ${palette.line};
    border-radius: ${radii.md};
    box-shadow: none;
  }
`
