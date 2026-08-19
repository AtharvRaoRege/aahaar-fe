import styled from 'styled-components'

import { fontSizes, fontWeights, palette, radii, shadows, spacing } from '@/styles/theme'

export const List = styled.div`
  display: grid;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.lg};

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.md};
  }
`

export const Card = styled.div`
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr) auto;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.md} ${spacing.lg};
  background: ${palette.mangoWash};
  border: 1.5px solid ${palette.mangoDark};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};

  svg {
    width: 18px;
    height: 18px;
    color: ${palette.ink};
  }
`

export const Title = styled.p`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.bold};
`

export const Meta = styled.p`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
`
