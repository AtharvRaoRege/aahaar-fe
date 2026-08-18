import styled from 'styled-components'

import { dashboardHint, dashboardPage, dashboardTitle } from '@/pages/dashboard/shared'
import { palette, shadows, spacing } from '@/styles/theme'

export const Page = styled.div`
  ${dashboardPage};
`

export const Title = styled.h1`
  ${dashboardTitle};
`

export const Hint = styled.p`
  ${dashboardHint};
`

export const ErrorBanner = styled.p`
  padding: 12px 14px;
  margin-bottom: 16px;
  background: ${palette.chili};
  color: ${palette.white};
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.4;
`

export const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 16px;

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: repeat(4, 1fr);
  }
`

export const Stat = styled.div`
  padding: 12px 14px;
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: 12px;
  box-shadow: ${shadows.sm};

  strong {
    display: block;
    font-size: 1.5rem;
    font-weight: 900;
    line-height: 1;
  }

  span {
    font-size: 0.6875rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${palette.inkSoft};
  }
`

export const Filters = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`

export const FilterBtn = styled.button<{ $active: boolean }>`
  min-height: 40px;
  padding: 0 14px;
  font-weight: 600;
  border-radius: 12px;
  background: ${({ $active }) => ($active ? palette.tomato : palette.white)};
  color: ${({ $active }) => ($active ? palette.white : palette.ink)};
  border: 1.5px solid ${({ $active }) => ($active ? palette.tomato : palette.line)};
  box-shadow: ${shadows.sm};
  transition: transform 100ms ease-out;

  &:active {
    transform: scale(0.97);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:active {
      transform: none;
    }
  }
`

export const Grid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: minmax(0, 1fr);
  padding-bottom: ${spacing.xl};

  ${({ theme }) => theme.media.sm} {
    gap: 16px;
    padding-bottom: ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding-bottom: ${spacing['2xl']};
  }

  ${({ theme }) => theme.media.lg} {
    padding-bottom: ${spacing['3xl']};
  }

  ${({ theme }) => theme.media.xl} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding-bottom: ${spacing['3xl']};
  }
`
