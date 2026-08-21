import { createGlobalStyle } from 'styled-components'

import { fontFamily, palette } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    min-height: 100%;
  }

  html {
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: ${fontFamily.body};
    font-weight: 500;
    background: ${palette.canvas};
    color: ${palette.ink};
    line-height: 1.45;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
  }

  #root {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }

  button, input, textarea, select {
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul, ol {
    list-style: none;
  }

  img, svg {
    display: block;
    max-width: 100%;
  }

  ::selection {
    background: ${brandVar.primary};
    color: ${palette.white};
  }

  /* Respect reduced-motion (design.md §40). */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`
