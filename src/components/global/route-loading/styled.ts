import styled from 'styled-components'

import { fontSizes, fontWeights, palette, spacing } from '@/styles/theme'

export const Page = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
  min-height: 100dvh;
  padding: ${spacing.xl};
  background: ${palette.canvas};
`

export const Panel = styled.div`
  display: grid;
  justify-items: center;
  gap: ${spacing.lg};
  width: min(100%, 320px);
`

export const Label = styled.p`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.bold};
  color: ${palette.inkSoft};
  text-align: center;
`
