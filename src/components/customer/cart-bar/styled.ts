import styled from 'styled-components'

import { fadeIn } from '@/styles/mixins'
import { fontSizes, radii, shadows, spacing, transitions } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export const Bar = styled.button`
  position: fixed;
  left: ${spacing.md};
  right: ${spacing.md};
  bottom: calc(${spacing.md} + env(safe-area-inset-bottom, 0px));
  z-index: ${({ theme }) => theme.zIndex.cartBar};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.md};
  min-width: 0;
  padding: ${spacing.md} ${spacing.lg};
  background: ${brandVar.primary};
  color: ${brandVar.onPrimary};
  border: none;
  border-radius: ${radii.md};
  box-shadow: ${shadows.lg};
  animation: ${fadeIn} 160ms ease-out;
  transition: transform ${transitions.fast}, background ${transitions.fast};

  &:hover {
    background: ${brandVar.primaryHover};
  }

  &:active {
    transform: scale(0.98);
  }

  ${({ theme }) => theme.media.sm} {
    left: ${spacing.lg};
    right: ${spacing.lg};
    padding: ${spacing.lg} ${spacing.xl};
    gap: ${spacing.lg};
  }

  ${({ theme }) => theme.media.md} {
    left: ${spacing.xl};
    right: ${spacing.xl};
  }

  ${({ theme }) => theme.media.lg} {
    left: auto;
    right: ${spacing['3xl']};
    min-width: 360px;
  }

  ${({ theme }) => theme.media.xl} {
    right: ${spacing['4xl']};
    min-width: 380px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: background ${transitions.fast};

    &:active {
      transform: none;
    }
  }
`

export const Left = styled.span`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  font-weight: 700;
  font-size: ${fontSizes.label};
  letter-spacing: 0.02em;

  svg {
    width: 20px;
    height: 20px;
    stroke-width: 2;
  }
`

export const Right = styled.span`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  font-weight: 800;
  font-size: ${fontSizes.body};
`
