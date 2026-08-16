import styled from 'styled-components'

import { palette } from '@/styles/theme'

export const Page = styled.div`
  flex: 1;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${palette.canvas};
`

export const Centered = styled.div`
  text-align: center;
  padding: 32px 20px;
`

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 900;
  text-transform: uppercase;
`
