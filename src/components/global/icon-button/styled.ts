import styled, { css } from 'styled-components'

import { focusRing, neoPressable } from '@/styles/mixins'
import { palette, shadows } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export type IconButtonTone = 'default' | 'primary' | 'secondary' | 'danger'
export type IconButtonSize = 'sm' | 'md'

interface Props {
  $tone: IconButtonTone
  $size: IconButtonSize
}

const tones: Record<IconButtonTone, ReturnType<typeof css>> = {
  default: css`
    background: ${palette.white};
    color: ${palette.ink};
  `,
  primary: css`
    background: ${brandVar.primary};
    color: ${brandVar.onPrimary};
  `,
  secondary: css`
    background: ${brandVar.primary};
    color: ${brandVar.onPrimary};
  `,
  danger: css`
    background: ${palette.chili};
    color: ${palette.white};
  `,
}

export const StyledIconButton = styled.button<Props>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => ($size === 'sm' ? '40px' : '48px')};
  height: ${({ $size }) => ($size === 'sm' ? '40px' : '48px')};
  border: 1.5px solid ${palette.ink};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${shadows.sm};
  ${({ $tone }) => tones[$tone]};
  ${neoPressable};
  ${focusRing};

  svg {
    width: 1.4em;
    height: 1.4em;
    stroke-width: 1.75;
  }
`
