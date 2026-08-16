import styled from 'styled-components'

import { focusRing } from '@/styles/mixins'
import { palette, transitions } from '@/styles/theme'

export const Wrap = styled.div<{ $size: 'sm' | 'md' }>`
  display: inline-flex;
  align-items: stretch;
  border: 4px solid ${palette.ink};
  background: ${palette.white};
  height: ${({ $size }) => ($size === 'sm' ? '40px' : '48px')};
`

export const QtyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  background: ${palette.mango};
  color: ${palette.ink};
  transition: background ${transitions.fast};
  ${focusRing};

  &:active {
    background: ${palette.tomato};
    color: ${palette.white};
  }

  svg {
    width: 18px;
    height: 18px;
    stroke-width: 3.5;
  }

  &:first-child {
    border-right: 3px solid ${palette.ink};
  }
  &:last-child {
    border-left: 3px solid ${palette.ink};
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
