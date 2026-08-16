import styled from 'styled-components'

import { palette } from '@/styles/theme'

export const Mark = styled.span<{ $veg: boolean; $size: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border: 2px solid ${({ $veg }) => ($veg ? palette.chutney : palette.chili)};
  border-radius: 0;
  flex-shrink: 0;
`

export const Dot = styled.span<{ $veg: boolean }>`
  width: 45%;
  height: 45%;
  border-radius: 9999px;
  background: ${({ $veg }) => ($veg ? palette.chutney : palette.chili)};
`
