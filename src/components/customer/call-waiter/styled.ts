import styled from 'styled-components'

import { fontSizes, fontWeights, palette, spacing } from '@/styles/theme'

export const Wrap = styled.div`
  display: grid;
  justify-items: end;
  gap: ${spacing.xs};
`

export const Note = styled.p`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${palette.chili};
  text-align: right;
`
