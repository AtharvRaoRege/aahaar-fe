import styled, { keyframes } from 'styled-components'

import { landing } from '@/styles/theme'

const dashMove = keyframes`
  to { stroke-dashoffset: -16; }
`

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.25; }
`

export const ArtSvg = styled.svg`
  display: block;
  width: 100%;
  height: 100%;
  fill: none;
  stroke: ${landing.ink};
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;

  [data-fill='paper'] {
    fill: ${landing.paper};
  }

  [data-fill='paper-dim'] {
    fill: ${landing.paperDim};
  }

  [data-fill='ink'] {
    fill: ${landing.ink};
  }

  [data-fill='chili'] {
    fill: ${landing.chili};
  }

  [data-fill='turmeric'] {
    fill: ${landing.turmeric};
  }

  [data-fill='mint'] {
    fill: ${landing.mint};
  }

  [data-fill='none'] {
    fill: none;
  }

  [data-stroke='paper'] {
    stroke: ${landing.paper};
  }

  [data-stroke='ink'] {
    stroke: ${landing.ink};
  }

  [data-stroke='none'] {
    stroke: none;
  }

  [data-hair] {
    stroke-width: 1.4;
  }

  [data-thick] {
    stroke-width: 2.5;
  }

  text {
    stroke: none;
    fill: ${landing.ink};
    font-size: 11px;
  }

  [data-slot] {
    stroke-dasharray: 4 4;
    animation: ${dashMove} 1.2s linear infinite;
  }

  [data-light] {
    animation: ${blink} 1.6s ease-in-out infinite;
  }
`
