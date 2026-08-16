import styled from 'styled-components'

import { palette } from '@/styles/theme'

export const Row = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  background: ${palette.white};
  border: 4px solid ${palette.ink};
`

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
`

export const TopLine = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Name = styled.h3`
  font-size: 1rem;
  font-weight: 900;
`

export const Meta = styled.p`
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${palette.inkSoft};
`

export const Notes = styled.p`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${palette.tomato};
`

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
`

export const Price = styled.span`
  font-size: 1.125rem;
  font-weight: 900;
`

export const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`
