import styled from 'styled-components'

import { palette } from '@/styles/theme'

export const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 14px;
`

export const Meta = styled.p`
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${palette.inkSoft};
`
