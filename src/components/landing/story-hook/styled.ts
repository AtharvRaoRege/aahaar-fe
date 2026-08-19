import styled from 'styled-components'

import { focusRing } from '@/styles/mixins'
import { fontSizes, fontWeights, palette, radii, spacing, transitions } from '@/styles/theme'

export const Section = styled.section`
  scroll-snap-align: start;
  display: grid;
  align-content: center;
  gap: ${spacing.xl};
  min-height: 100dvh;
  min-height: 100svh;
  padding: ${spacing['6xl']} ${spacing.xl} ${spacing['5xl']};
  background: ${palette.canvas};

  ${({ theme }) => theme.media.md} {
    align-content: center;
    justify-items: start;
    max-width: 68rem;
    margin-inline: auto;
    padding: ${spacing['6xl']} ${spacing['3xl']};
  }
`

export const Chapter = styled.p`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.black};
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${palette.inkSoft};
`

export const Headline = styled.h1`
  font-size: ${fontSizes.display};
  font-weight: ${fontWeights.black};
  line-height: 0.95;
  letter-spacing: -0.04em;
  color: ${palette.ink};
  text-wrap: balance;

  span {
    display: block;
  }

  span:last-child {
    color: ${palette.tomato};
  }
`

export const Lede = styled.p`
  max-width: 34ch;
  font-size: ${fontSizes.bodyLg};
  font-weight: ${fontWeights.medium};
  line-height: 1.5;
  color: ${palette.inkSoft};

  ${({ theme }) => theme.media.md} {
    max-width: 46ch;
  }
`

export const Prompt = styled.button`
  ${focusRing};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.md};
  min-height: 56px;
  padding: 0 ${spacing['2xl']};
  border-radius: ${radii.full};
  background: ${palette.ink};
  color: ${palette.cream};
  font-size: ${fontSizes.bodyLg};
  font-weight: ${fontWeights.bold};
  cursor: pointer;
  transition: transform ${transitions.fast};

  svg {
    width: 20px;
    height: 20px;
    stroke-width: 2.5;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:active {
      transform: none;
    }
  }
`

export const PromptRow = styled.div`
  display: grid;
  gap: ${spacing.md};
  justify-items: stretch;

  ${({ theme }) => theme.media.sm} {
    grid-auto-flow: column;
    justify-items: start;
    align-items: center;
  }
`

export const ScrollHint = styled.p`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${palette.inkSoft};
`
