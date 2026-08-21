import styled from 'styled-components'

import { focusRing } from '@/styles/mixins'
import { palette, spacing } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export const Row = styled.div<{ $size: 'sm' | 'md' | 'lg' }>`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.xs};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.xs};
  }

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.lg} {
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.xl} {
    gap: ${spacing.sm};
  }

  svg {
    width: ${({ $size }) => ($size === 'sm' ? '18px' : $size === 'lg' ? '36px' : '28px')};
    height: ${({ $size }) => ($size === 'sm' ? '18px' : $size === 'lg' ? '36px' : '28px')};
    stroke-width: 1.75;
  }
`

export const StarButton = styled.button<{ $on: boolean; $interactive: boolean; $light?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: ${({ $on, $light }) =>
    $on ? ($light ? brandVar.onPrimary : brandVar.accentText) : $light ? palette.cream : palette.line};
  cursor: ${({ $interactive }) => ($interactive ? 'pointer' : 'default')};
  ${focusRing};

  svg {
    fill: ${({ $on }) => ($on ? 'currentColor' : 'none')};
  }

  ${({ $interactive, $on }) =>
    $interactive &&
    `
      @media (hover: hover) {
        &:hover {
          color: ${brandVar.accentText};
        }
        &:hover svg {
          fill: ${$on ? 'currentColor' : brandVar.accentText};
        }
      }
    `}
`
