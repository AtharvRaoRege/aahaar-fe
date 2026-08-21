import styled, { css } from 'styled-components'

import { fontSizes, palette, radii, shadows, spacing, transitions } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export const Row = styled.div<{ $inline?: boolean }>`
  display: flex;
  flex-wrap: nowrap;
  gap: ${spacing.sm};
  padding: 0 ${spacing.lg} ${spacing.md};
  overflow-x: auto;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${({ $inline }) =>
    $inline &&
    css`
      flex-shrink: 0;
      padding: 0;
      overflow: visible;
    `}

  ${({ theme }) => theme.media.sm} {
    padding: 0 ${spacing.xl} ${spacing.md};
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.md} {
    padding: 0 ${spacing['2xl']} ${spacing.md};
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.lg} {
    padding: 0 ${spacing['2xl']} ${spacing.lg};
  }

  ${({ theme }) => theme.media.xl} {
    padding: 0 ${spacing['3xl']} ${spacing.lg};
  }
`

export const Chip = styled.button<{ $active: boolean; $tone?: 'veg' | 'nonveg' | 'plain' }>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  gap: ${spacing.xs};
  min-height: 36px;
  padding: 0 ${spacing.md};
  background: ${({ $active, $tone }) => {
    if (!$active) return palette.white
    if ($tone === 'veg') return palette.chutney
    if ($tone === 'nonveg') return palette.chili
    return brandVar.primary
  }};
  color: ${({ $active, $tone }) => {
    if (!$active) return palette.ink
    if ($tone === 'veg' || $tone === 'nonveg') return palette.white
    return brandVar.onPrimary
  }};
  border: 1px solid
    ${({ $active, $tone }) => {
      if (!$active) return palette.line
      if ($tone === 'veg') return palette.chutney
      if ($tone === 'nonveg') return palette.chili
      return brandVar.primary
    }};
  border-radius: ${radii.full};
  box-shadow: ${({ $active }) => ($active ? shadows.sm : 'none')};
  font-weight: 700;
  font-size: ${fontSizes.labelSm};
  letter-spacing: 0.01em;
  white-space: nowrap;
  transition: transform ${transitions.fast}, background ${transitions.fast}, color ${transitions.fast};

  &:active {
    transform: scale(0.98);
  }

  ${({ theme }) => theme.media.sm} {
    min-height: 38px;
    padding: 0 ${spacing.md};
    font-size: ${fontSizes.label};
  }

  ${({ theme }) => theme.media.md} {
    min-height: 40px;
    padding: 0 ${spacing.lg};
    font-size: ${fontSizes.label};
  }

  ${({ theme }) => theme.media.lg} {
    min-height: 40px;
  }

  ${({ theme }) => theme.media.xl} {
    min-height: 42px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: background ${transitions.fast}, color ${transitions.fast};

    &:active {
      transform: none;
    }
  }
`
