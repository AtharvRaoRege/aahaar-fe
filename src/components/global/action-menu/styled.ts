import styled from 'styled-components'

import { fontFamily, fontSizes, palette, radii, shadows, spacing } from '@/styles/theme'

export const Wrap = styled.div`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
`

export const Menu = styled.div<{ $top: number; $left: number; $width: number }>`
  position: fixed;
  top: ${({ $top }) => `${$top}px`};
  left: ${({ $left }) => `${$left}px`};
  width: ${({ $width }) => `${$width}px`};
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  padding: ${spacing.xs};
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.md};
  box-shadow: ${shadows.lg};
  max-height: min(320px, 50vh);
  overflow-y: auto;
  font-family: ${fontFamily.body};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.sm};
  }

  ${({ theme }) => theme.media.md} {
    max-height: min(360px, 50vh);
  }

  ${({ theme }) => theme.media.lg} {
    max-height: min(400px, 48vh);
  }

  ${({ theme }) => theme.media.xl} {
    max-height: min(420px, 46vh);
  }
`

export const Item = styled.button<{ $busy?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 44px;
  padding: ${spacing.sm} ${spacing.md};
  text-align: left;
  color: ${palette.ink};
  background: transparent;
  border-radius: ${radii.sm};
  font-size: ${fontSizes.body};
  font-weight: 600;
  font-family: ${fontFamily.body};
  opacity: ${({ $busy }) => ($busy ? 0.55 : 1)};

  ${({ theme }) => theme.media.sm} {
    min-height: 44px;
  }

  ${({ theme }) => theme.media.md} {
    min-height: 44px;
  }

  ${({ theme }) => theme.media.lg} {
    min-height: 48px;
  }

  ${({ theme }) => theme.media.xl} {
    min-height: 48px;
  }

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background: ${palette.cream};
    }
  }

  &:disabled {
    cursor: not-allowed;
  }
`
