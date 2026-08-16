import styled from 'styled-components'

import { palette } from '@/styles/theme'

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  padding: 48px 24px;
`

export const Emoji = styled.div`
  font-size: 3.5rem;
  line-height: 1;
`

export const Title = styled.h3`
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${palette.ink};
`

export const Hint = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: ${palette.inkSoft};
  max-width: 36ch;
`

export const Action = styled.div`
  margin-top: 8px;
`
