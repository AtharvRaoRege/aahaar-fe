import styled from 'styled-components'

import { fontSizes, palette, spacing } from '@/styles/theme'

export const Page = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  padding: max(20px, env(safe-area-inset-top, 0px)) ${spacing.lg}
    calc(${spacing['4xl']} + env(safe-area-inset-bottom, 0px));

  ${({ theme }) => theme.media.sm} {
    padding-inline: ${spacing.xl};
  }

  ${({ theme }) => theme.media.md} {
    max-width: 560px;
    width: 100%;
    margin-inline: auto;
    gap: ${spacing.xl};
  }

  ${({ theme }) => theme.media.lg} {
    max-width: 600px;
  }

  ${({ theme }) => theme.media.xl} {
    max-width: 640px;
  }
`

export const Kicker = styled.p`
  margin: 0;
  font-size: ${fontSizes.label};
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${palette.tomato};
`

export const Title = styled.h1`
  margin: 0;
  font-size: ${fontSizes.h1};
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: ${palette.ink};
`

export const Hint = styled.p`
  margin: 0;
  font-weight: 600;
  color: ${palette.inkSoft};
`
