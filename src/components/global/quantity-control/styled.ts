import styled from 'styled-components'

import { focusRing } from '@/styles/mixins'
import { palette, radii, transitions } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export const Wrap = styled.div<{ $size: 'sm' | 'md' }>`
  display: inline-flex;
  align-items: stretch;
  overflow: hidden;
  border: 1.5px solid ${palette.ink};
  border-radius: ${radii.full};
  background: ${palette.white};
  height: ${({ $size }) => ($size === 'sm' ? '36px' : '44px')};
`

export const QtyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  background: ${brandVar.surfaceTint};
  color: ${palette.ink};
  transition: background ${transitions.fast};
  ${focusRing};

  &:active {
    background: ${brandVar.primary};
    color: ${brandVar.onPrimary};
  }

  svg {
    width: 18px;
    height: 18px;
    stroke-width: 3;
  }

  &:first-child {
    border-right: 1.5px solid ${palette.ink};
  }
  &:last-child {
    border-left: 1.5px solid ${palette.ink};
  }
`

export const Value = styled.span`
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-variant-numeric: tabular-nums;
  padding: 0 6px;
`
