import styled from 'styled-components'

import { fontSizes, fontWeights, palette, spacing } from '@/styles/theme'

export const Wrap = styled.div<{ $compact?: boolean }>`
  display: grid;
  justify-items: ${({ $compact }) => ($compact ? 'center' : 'end')};
  gap: ${spacing.xs};
  flex-shrink: 0;
`

export const Note = styled.p`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${palette.chili};
  text-align: right;
`
