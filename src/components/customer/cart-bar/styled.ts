import styled from 'styled-components'

import { fadeIn } from '@/styles/mixins'
import { palette, shadows } from '@/styles/theme'

export const Bar = styled.button`
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: calc(12px + env(safe-area-inset-bottom, 0px));
  z-index: ${({ theme }) => theme.zIndex.cartBar};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
  padding: 14px 16px;
  background: ${palette.tomato};
  color: ${palette.white};
  border: 4px solid ${palette.ink};
  box-shadow: ${shadows.md};
  animation: ${fadeIn} 160ms ease-out;
  transition: transform 100ms ease-out;

  &:active {
    transform: translate(2px, 2px);
    box-shadow: ${shadows.sm};
  }

  ${({ theme }) => theme.media.sm} {
    left: 16px;
    right: 16px;
    padding: 16px 20px;
    gap: 16px;
  }

  ${({ theme }) => theme.media.lg} {
    left: auto;
    right: 32px;
    min-width: 360px;
  }
`

export const Left = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.04em;

  svg {
    width: 20px;
    height: 20px;
    stroke-width: 3;
  }
`

export const Right = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 900;
  font-size: 1.125rem;
`
