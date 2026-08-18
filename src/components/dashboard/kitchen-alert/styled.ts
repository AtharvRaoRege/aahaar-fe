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
`

export const Toast = styled.div`
  position: fixed;
  top: calc(12px + env(safe-area-inset-top, 0px));
  left: 12px;
  right: 12px;
  z-index: ${({ theme }) => theme.zIndex.toast};
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: ${spacing.md};
  align-items: center;
  padding: ${spacing.lg};
  background: ${palette.ink};
  color: ${palette.white};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.xl};
  animation: ${slide} 180ms ease-out;

  ${Body} {
    color: ${palette.line};
  }

  ${({ theme }) => theme.media.sm} {
    left: auto;
    right: 20px;
    width: min(400px, calc(100vw - 40px));
  }

  ${({ theme }) => theme.media.md} {
    top: 20px;
    right: 28px;
  }

  ${({ theme }) => theme.media.lg} {
    right: 36px;
  }

  ${({ theme }) => theme.media.xl} {
    right: 40px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const IconBubble = styled.span<{ $kind: 'order' | 'review' }>`
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: ${radii.md};
  background: ${({ $kind }) => ($kind === 'order' ? palette.tomato : palette.mango)};
  color: ${palette.white};
  flex-shrink: 0;

  svg {
    width: 22px;
    height: 22px;
  }
`

export const Copy = styled.div`
  display: grid;
  gap: 2px;
  min-width: 0;
`

export const Dismiss = styled.button`
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  color: ${palette.white};
  border-radius: ${radii.full};

  svg {
    width: 18px;
    height: 18px;
  }
`

export const SetupBar = styled.div`
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: calc(72px + env(safe-area-inset-bottom, 0px));
  z-index: ${({ theme }) => theme.zIndex.toast};
  display: grid;
  gap: ${spacing.sm};
  padding: ${spacing.md} ${spacing.lg};
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.lg};

  ${Body} {
    color: ${palette.inkSoft};
  }

  ${({ theme }) => theme.media.sm} {
    left: auto;
    right: 20px;
    width: min(400px, calc(100vw - 40px));
  }

  ${({ theme }) => theme.media.md} {
    bottom: 20px;
    right: 28px;
  }

  ${({ theme }) => theme.media.lg} {
    right: 36px;
  }

  ${({ theme }) => theme.media.xl} {
    right: 40px;
  }
`

export const SetupActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
`
