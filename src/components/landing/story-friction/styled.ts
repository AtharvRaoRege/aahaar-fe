import styled from 'styled-components'

import { cardGrid } from '@/styles/mixins'
import { fontSizes, fontWeights, palette, radii, spacing } from '@/styles/theme'

/**
 * The dark chapter.
 *
 * `palette.ink` as a surface is already in the system — the kitchen alert toast
 * uses it — so inverting here buys real narrative contrast without inventing a
 * second theme. Everything inside flips to cream on ink.
 */
export const Section = styled.section`
  scroll-snap-align: start;
  display: grid;
  align-content: center;
  gap: ${spacing['2xl']};
  min-height: 100dvh;
  min-height: 100svh;
  padding: ${spacing['5xl']} ${spacing.xl};
  background: ${palette.ink};

  ${({ theme }) => theme.media.md} {
    gap: ${spacing['3xl']};
    padding: ${spacing['6xl']} ${spacing['3xl']};
  }
`

export const Inner = styled.div`
  display: grid;
  gap: ${spacing['2xl']};
  width: 100%;
  max-width: 68rem;
  margin-inline: auto;

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: minmax(0, 22rem) minmax(0, 1fr);
    align-items: start;
    gap: ${spacing['4xl']};
  }
`

export const Head = styled.header`
  display: grid;
  gap: ${spacing.md};

  ${({ theme }) => theme.media.lg} {
    position: sticky;
    top: ${spacing['4xl']};
  }
`

export const Chapter = styled.p`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.black};
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${palette.mango};
`

export const Title = styled.h2`
  font-size: ${fontSizes.h1};
  font-weight: ${fontWeights.black};
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: ${palette.cream};
  text-wrap: balance;
`

export const Lede = styled.p`
  max-width: 42ch;
  font-size: ${fontSizes.body};
  font-weight: ${fontWeights.medium};
  line-height: 1.55;
  color: ${palette.line};
`

export const List = styled.div`
  ${cardGrid('15rem')};
  gap: ${spacing.md};

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.lg};
  }
`

export const Item = styled.article`
  display: grid;
  gap: ${spacing.sm};
  padding: ${spacing.xl};
  border-radius: ${radii.lg};
  border: 1.5px solid ${palette.inkSoft};
  background: ${palette.chiliWash};

  ${({ theme }) => theme.media.md} {
    padding: ${spacing['2xl']};
  }
`

export const Num = styled.span`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.black};
  letter-spacing: 0.12em;
  color: ${palette.mango};
  font-variant-numeric: tabular-nums;
`

export const Name = styled.h3`
  font-size: ${fontSizes.h3};
  font-weight: ${fontWeights.black};
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: ${palette.cream};
  text-wrap: balance;
`

export const Body = styled.p`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  line-height: 1.55;
  color: ${palette.line};
`
