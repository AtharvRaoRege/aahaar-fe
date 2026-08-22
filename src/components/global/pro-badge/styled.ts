import styled from 'styled-components'

import { fontSizes, fontWeights, palette, radii, spacing } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 1px ${spacing.sm};
  border-radius: ${radii.sm};
  border: 1.5px solid ${palette.ink};
  background: ${brandVar.primary};
  color: ${brandVar.onPrimary};
  font-size: ${fontSizes.micro};
  font-weight: ${fontWeights.black};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1.4;
  white-space: nowrap;
  vertical-align: middle;

  svg {
    width: 10px;
    height: 10px;
    flex-shrink: 0;
  }
`

export const TitleRow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  flex-wrap: wrap;
`
