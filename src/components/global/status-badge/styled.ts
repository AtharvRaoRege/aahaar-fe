import styled, { css } from 'styled-components'

import { punch } from '@/styles/mixins'
import { fontSizes, radii } from '@/styles/theme'

export const Pill = styled.span<{ $bg: string; $fg: string; $pulse?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  border: 1px solid ${({ $bg }) => $bg};
  border-radius: ${radii.full};
  font-size: ${fontSizes.labelSm};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;

  svg {
    width: 14px;
    height: 14px;
    stroke-width: 2.25;
  }

  ${({ $pulse }) =>
    $pulse &&
    css`
      animation: ${punch} 1.6s ease-out infinite;
    `}

  ${({ theme }) => theme.media.sm} {
    padding: 4px 10px;
    font-size: ${fontSizes.labelSm};
  }

  ${({ theme }) => theme.media.md} {
    padding: 6px 12px;
    font-size: ${fontSizes.label};
  }

  ${({ theme }) => theme.media.lg} {
    padding: 6px 12px;
  }

  ${({ theme }) => theme.media.xl} {
    padding: 6px 14px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`
