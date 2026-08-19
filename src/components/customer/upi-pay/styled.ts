import styled from 'styled-components'

import { fontSizes, fontWeights, palette, radii, shadows, spacing } from '@/styles/theme'

export const Card = styled.section`
  display: grid;
  gap: ${spacing.sm};
  padding: ${spacing.lg};
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.xl};
  }
`

export const Title = styled.h3`
  font-size: ${fontSizes.subheading};
  font-weight: ${fontWeights.bold};
  letter-spacing: -0.02em;
`

export const Hint = styled.p`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
  line-height: 1.45;
`

export const Warning = styled.p`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  color: ${palette.chili};
`
