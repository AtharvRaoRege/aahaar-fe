import styled from 'styled-components'

import { palette } from '@/styles/theme'

export const Shell = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background: ${palette.canvas};
  overflow-x: hidden;
`

export const Centered = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
  text-align: center;
`

export const LoadingGrid = styled.div`
  width: 100%;
  max-width: 420px;
  display: grid;
  gap: 12px;
`
