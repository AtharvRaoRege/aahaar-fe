import styled, { keyframes } from 'styled-components'

import { fontSizes, palette, radii, shadows, spacing } from '@/styles/theme'

const slide = keyframes`
  from {
    transform: translateY(-12px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

export const Title = styled.p`
  margin: 0;
  font-size: ${fontSizes.body};
  font-weight: 800;
  letter-spacing: -0.02em;
`

export const Body = styled.p`
  margin: 0;
  font-size: ${fontSizes.label};
  font-weight: 500;
  color: ${palette.line};
`

export const Toast = styled.div`
  position: fixed;
  top: calc(${spacing.md} + env(safe-area-inset-top, 0px));
  left: ${spacing.md};
  right: ${spacing.md};
  z-index: ${({ theme }) => theme.zIndex.toast};
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: ${spacing.md};
  align-items: center;
  padding: ${spacing.md} ${spacing.lg};
  background: ${palette.ink};
  color: ${palette.white};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.xl};
  animation: ${slide} 180ms ease-out;

  ${({ theme }) => theme.media.sm} {
    left: ${spacing.lg};
    right: ${spacing.lg};
    padding: ${spacing.lg} ${spacing.xl};
  }

  ${({ theme }) => theme.media.md} {
    left: auto;
    right: ${spacing['2xl']};
    width: min(400px, calc(100vw - 48px));
  }

  ${({ theme }) => theme.media.lg} {
    right: ${spacing['3xl']};
  }

  ${({ theme }) => theme.media.xl} {
    right: ${spacing['4xl']};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const IconBubble = styled.span`
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: ${radii.md};
  background: ${palette.chili};
  color: ${palette.white};

  svg {
    width: 22px;
    height: 22px;
  }

  ${({ theme }) => theme.media.sm} {
    width: 42px;
    height: 42px;
  }

  ${({ theme }) => theme.media.md} {
    width: 44px;
    height: 44px;
  }

  ${({ theme }) => theme.media.lg} {
    width: 44px;
    height: 44px;
  }

  ${({ theme }) => theme.media.xl} {
    width: 48px;
    height: 48px;
  }
`

export const Copy = styled.div`
  display: grid;
  gap: 2px;
  min-width: 0;
`

export const Dismiss = styled.button`
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background: none;
  border: none;
  color: ${palette.white};
  border-radius: ${radii.full};
  cursor: pointer;

  svg {
    width: 18px;
    height: 18px;
  }

  ${({ theme }) => theme.media.sm} {
    width: 32px;
    height: 32px;
  }

  ${({ theme }) => theme.media.md} {
    width: 36px;
    height: 36px;
  }

  ${({ theme }) => theme.media.lg} {
    width: 36px;
    height: 36px;
  }

  ${({ theme }) => theme.media.xl} {
    width: 36px;
    height: 36px;
  }
`
