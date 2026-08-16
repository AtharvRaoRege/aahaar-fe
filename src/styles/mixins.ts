import { css, keyframes } from 'styled-components'

import { palette, radii, shadows, transitions } from '@/styles/theme'

export const neoSurface = (background: string = palette.white) => css`
  background: ${background};
  border: 1.5px solid ${palette.ink};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};
`

export const neoShadowResponsive = css`
  box-shadow: ${shadows.sm};
  ${({ theme }) => theme.media.md} {
    box-shadow: ${shadows.md};
  }
`

export const neoPressable = css`
  transition: transform ${transitions.fast}, box-shadow ${transitions.fast}, background ${transitions.fast};
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${shadows.md};
  }
  &:active {
    transform: translateY(1px) scale(0.97);
    box-shadow: ${shadows.sm};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  @media (prefers-reduced-motion: reduce) {
    transition: background ${transitions.fast};
    &:hover,
    &:active {
      transform: none;
    }
  }
`

export const neoLiftOnHover = css`
  transition: transform ${transitions.standard}, box-shadow ${transitions.standard};
  @media (hover: hover) {
    &:hover {
      transform: translateY(-3px);
      box-shadow: ${shadows.md};
    }
  }
`

export const focusRing = css`
  outline: none;
  &:focus-visible {
    outline: 2px solid ${palette.tomato};
    outline-offset: 2px;
  }
`

export const faintHalftone = css`
  position: relative;
  isolation: isolate;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image: radial-gradient(${palette.ink} 1px, transparent 1px);
    background-size: 18px 18px;
    opacity: 0.04;
  }
  > * {
    position: relative;
    z-index: 1;
  }
`

export const gridTexture = css`
  background-size: 40px 40px;
  background-image: linear-gradient(to right, rgba(28, 25, 22, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(28, 25, 22, 0.04) 1px, transparent 1px);
`

export const hideScrollbar = css`
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const srOnly = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

export const punch = keyframes`
  0%   { transform: scale(1); }
  40%  { transform: scale(1.06); }
  100% { transform: scale(1); }
`

export const slideUp = keyframes`
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
`

export const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`
