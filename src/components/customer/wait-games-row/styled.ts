import styled from 'styled-components'

import { fontSizes, fontWeights, palette, radii, spacing } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export const Wrap = styled.div`
  display: grid;
  gap: ${spacing.sm};
  width: 100%;
`

export const Label = styled.p`
  margin: 0;
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${brandVar.accentText};
  text-align: center;
`

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.sm};

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: 1fr 1fr;
  }
`

export const GameCard = styled.button`
  display: grid;
  gap: 2px;
  justify-items: start;
  width: 100%;
  min-height: 64px;
  padding: ${spacing.md};
  text-align: left;
  border: 2px solid ${palette.ink};
  border-radius: ${radii.md};
  background: ${palette.white};
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:active {
    transform: scale(0.98);
  }
`

export const GameEmoji = styled.span`
  font-size: 1.35rem;
  line-height: 1;
`

export const GameName = styled.span`
  font-size: ${fontSizes.body};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.02em;
  color: ${palette.ink};
`

export const GameBlurb = styled.span`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
  line-height: 1.3;
`
