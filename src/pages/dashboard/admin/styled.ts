import styled from 'styled-components'

import { dashboardHint, dashboardPage, dashboardTitle } from '@/pages/dashboard/shared'
import { palette, radii, shadows } from '@/styles/theme'

export const Page = styled.div`
  ${dashboardPage};
  max-width: 1120px;
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
  gap: 12px 16px;
  margin-bottom: 20px;
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
`

export const Subtitle = styled.p`
  ${dashboardHint};
  margin-bottom: 0;
`

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const Tabs = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  margin-bottom: 14px;
  padding-bottom: 2px;
`

export const Tab = styled.button<{ $active: boolean }>`
  min-height: 40px;
  padding: 0 14px;
  font-weight: 600;
  white-space: nowrap;
  border-radius: ${radii.md};
  background: ${({ $active }) => ($active ? palette.mango : palette.white)};
  color: ${palette.ink};
  border: 1.5px solid ${({ $active }) => ($active ? palette.mango : palette.line)};
`

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
`

export const Count = styled.p`
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${palette.inkSoft};
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

export const Pill = styled.span<{ $tone?: 'wait' | 'ok' | 'muted' }>`
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
    $tone === 'wait' ? palette.mango : $tone === 'ok' ? '#DCEBDD' : palette.cream};
  color: ${palette.ink};
`

export const CardList = styled.div`
  display: grid;
  gap: 10px;

  ${({ theme }) => theme.media.md} {
    display: none;
  }
`

export const Card = styled.article`
  display: grid;
  gap: 8px;
  padding: 16px;
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};
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
