import styled from 'styled-components'

import { neoLiftOnHover } from '@/styles/mixins'
import { palette, radii, shadows } from '@/styles/theme'

export const StyledCard = styled.div<{ $interactive?: boolean; $surface?: string }>`
  background: ${({ $surface }) => $surface ?? palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};
  ${({ $interactive }) => $interactive && neoLiftOnHover};
`
