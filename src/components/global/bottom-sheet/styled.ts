import styled from 'styled-components'

import { fadeIn, hideScrollbar } from '@/styles/mixins'
import { palette, radii, shadows } from '@/styles/theme'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(28, 25, 22, 0.38);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.sheet};
  animation: ${fadeIn} 160ms ease-out;

  ${({ theme }) => theme.media.md} {
    align-items: center;
    padding: 24px;
    backdrop-filter: blur(16px) saturate(160%);
  }

  @media (prefers-reduced-transparency: reduce) {
    backdrop-filter: none;
    background: rgba(28, 25, 22, 0.62);
  }
`

export const Sheet = styled.div<{ $offset: number; $dragging: boolean }>`
  position: relative;
  width: 100%;
  max-height: 88vh;
  display: flex;
  flex-direction: column;
  background: rgba(251, 248, 242, 0.92);
  backdrop-filter: blur(22px) saturate(180%);
  border: 1.5px solid rgba(255, 255, 255, 0.55);
  border-bottom: none;
  border-radius: ${radii.lg} ${radii.lg} 0 0;
  box-shadow: ${shadows.lg};
  transform: translate3d(0, ${({ $offset }) => $offset}px, 0);
  transition: ${({ $dragging }) =>
    $dragging ? 'none' : 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)'};
  will-change: transform;

  ${({ theme }) => theme.media.md} {
    max-width: 480px;
    border-bottom: 1.5px solid ${palette.line};
    border-radius: ${radii.lg};
    max-height: 82vh;
    touch-action: auto;
  }

  @media (prefers-reduced-transparency: reduce) {
    background: ${palette.cream};
    backdrop-filter: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: opacity 180ms ease;
  }
`

export const Grabber = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0 4px;
  cursor: grab;
  touch-action: none;

  &::after {
    content: '';
    width: 40px;
    height: 5px;
    background: ${palette.inkSoft};
    opacity: 0.45;
    border-radius: 9999px;
  }

  ${({ theme }) => theme.media.md} {
    display: none;
  }
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 20px 12px;
`

export const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
`

export const Body = styled.div`
  padding: 8px 20px calc(24px + env(safe-area-inset-bottom, 0px));
  overflow-y: auto;
  ${hideScrollbar};
`
