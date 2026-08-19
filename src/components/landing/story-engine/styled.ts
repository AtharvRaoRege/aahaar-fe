import styled from 'styled-components'

import { hideScrollbar } from '@/styles/mixins'
import { fontSizes, fontWeights, palette, radii, shadows, spacing } from '@/styles/theme'

export const Section = styled.section`
  scroll-snap-align: start;
  display: grid;
  align-content: center;
  gap: ${spacing['2xl']};
  min-height: 100dvh;
  min-height: 100svh;
  padding: ${spacing['5xl']} 0;
  background: ${palette.cream};

  ${({ theme }) => theme.media.md} {
    gap: ${spacing['3xl']};
    padding: ${spacing['6xl']} 0;
  }
`

export const Inner = styled.div`
  display: grid;
  gap: ${spacing['2xl']};
  width: 100%;
  max-width: 68rem;
  margin-inline: auto;
  padding-inline: ${spacing.xl};

  ${({ theme }) => theme.media.md} {
    padding-inline: ${spacing['3xl']};
  }

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: center;
    gap: ${spacing['4xl']};
  }
`

export const Head = styled.header`
  display: grid;
  gap: ${spacing.md};
`

export const Chapter = styled.p`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.black};
  letter-spacing: 0.18em;
  text-transform: uppercase;
  /* tomato is only 3.77:1 on cream, which fails AA at label size. tomatoDark is
     the same hue already in the palette and clears it at 4.90:1. */
  color: ${palette.tomatoDark};
`

export const Title = styled.h2`
  font-size: ${fontSizes.h1};
  font-weight: ${fontWeights.black};
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: ${palette.ink};
  text-wrap: balance;
`

export const Lede = styled.p`
  max-width: 44ch;
  font-size: ${fontSizes.body};
  font-weight: ${fontWeights.medium};
  line-height: 1.55;
  color: ${palette.inkSoft};
`

/** The trace panel. Inverted, so the engine chapter still has a dark heart. */
export const Trace = styled.div`
  display: grid;
  gap: ${spacing.md};
  padding: ${spacing.xl};
  border-radius: ${radii.lg};
  background: ${palette.ink};
  box-shadow: ${shadows.lg};
  min-width: 0;

  ${({ theme }) => theme.media.md} {
    padding: ${spacing['2xl']};
  }
`

export const TraceLabel = styled.p`
  font-size: ${fontSizes.micro};
  font-weight: ${fontWeights.black};
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${palette.mango};
`

export const TraceList = styled.ol`
  display: grid;
  gap: ${spacing.sm};
  margin: 0;
  padding: 0;
  list-style: none;
`

export const TraceRow = styled.li`
  display: grid;
  grid-template-columns: 5.5rem minmax(0, 1fr);
  gap: ${spacing.sm};
  align-items: baseline;
  min-width: 0;

  ${({ theme }) => theme.media.md} {
    grid-template-columns: 6.5rem minmax(0, 1fr);
    gap: ${spacing.md};
  }
`

export const TraceActor = styled.span`
  font-size: ${fontSizes.micro};
  font-weight: ${fontWeights.black};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${palette.mango};
  overflow-wrap: anywhere;
`

export const TraceEvent = styled.span`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  line-height: 1.45;
  color: ${palette.line};
  overflow-wrap: anywhere;
  font-variant-numeric: tabular-nums;
`

/**
 * Swipe rail on a phone, plain grid from the tablet breakpoint up. The cards are
 * peeked rather than full-width so the gesture is discoverable without a hint.
 */
export const Rail = styled.div`
  ${hideScrollbar};
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 82%;
  gap: ${spacing.md};
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  padding-inline: ${spacing.xl};
  margin-inline: calc(-1 * ${spacing.xl});

  ${({ theme }) => theme.media.sm} {
    grid-auto-columns: 46%;
  }

  ${({ theme }) => theme.media.md} {
    grid-auto-flow: row;
    grid-auto-columns: auto;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    overflow-x: visible;
    scroll-snap-type: none;
    padding-inline: 0;
    margin-inline: 0;
    gap: ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: minmax(0, 1fr);
    gap: ${spacing.md};
  }
`

export const Part = styled.article`
  scroll-snap-align: center;
  display: grid;
  gap: ${spacing.xs};
  align-content: start;
  min-width: 0;
  padding: ${spacing.lg};
  border-radius: ${radii.md};
  border: 1.5px solid ${palette.line};
  background: ${palette.white};
  box-shadow: ${shadows.sm};

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.xl};
  }
`

export const PartName = styled.h3`
  font-size: ${fontSizes.subheading};
  font-weight: ${fontWeights.black};
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: ${palette.ink};
  text-wrap: balance;
`

export const PartBody = styled.p`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  line-height: 1.5;
  color: ${palette.inkSoft};
`

export const SwipeHint = styled.p`
  padding-inline: ${spacing.xl};
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${palette.inkSoft};

  ${({ theme }) => theme.media.md} {
    display: none;
  }
`

export const Column = styled.div`
  display: grid;
  gap: ${spacing.lg};
  min-width: 0;
`
