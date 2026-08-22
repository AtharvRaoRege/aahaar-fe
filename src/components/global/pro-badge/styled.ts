import styled from 'styled-components'

import { fontSizes, fontWeights, palette, radii, shadows, spacing } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px ${spacing.sm};
  border-radius: ${radii.sm};
  border: 1.5px solid ${palette.ink};
  background: ${brandVar.primary};
  color: ${brandVar.onPrimary};
  font-size: ${fontSizes.micro};
  font-weight: ${fontWeights.black};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  line-height: 1.35;
  white-space: nowrap;
  vertical-align: middle;
  flex-shrink: 0;
  box-shadow: ${shadows.sm};

  svg {
    width: 11px;
    height: 11px;
    flex-shrink: 0;
  }
`

export const TitleRow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  flex-wrap: wrap;
  min-width: 0;
`
