import styled, { keyframes } from 'styled-components'

import { palette, radii } from '@/styles/theme'

const sweep = keyframes`
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
`

export const Block = styled.div<{ $width: string; $height: string; $radius: string }>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border-radius: ${({ $radius }) => $radius};
  background-image: linear-gradient(
    90deg,
    ${palette.line} 25%,
    ${palette.cream} 50%,
    ${palette.line} 75%
  );
  background-size: 200% 100%;
  animation: ${sweep} 1.4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    background-image: none;
    background-color: ${palette.line};
  }
`

export const DEFAULT_RADIUS = radii.sm
