import styled, { css } from 'styled-components'

import { punch } from '@/styles/mixins'
import { palette } from '@/styles/theme'

export const Pill = styled.span<{ $bg: string; $fg: string; $pulse?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  border: 3px solid ${palette.ink};
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;

  svg {
    width: 14px;
    height: 14px;
    stroke-width: 3;
  }

  ${({ $pulse }) =>
    $pulse &&
    css`
      animation: ${punch} 1.6s ease-out infinite;
    `}
`
