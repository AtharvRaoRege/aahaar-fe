import styled, { keyframes } from 'styled-components'

import { palette } from '@/styles/theme'

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
`

export const Block = styled.div`
  background: ${palette.cream};
  border: 3px solid ${palette.ink};
  animation: ${pulse} 1.1s ease-in-out infinite;
`
