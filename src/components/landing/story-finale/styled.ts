import styled from 'styled-components'

import { fontSizes, fontWeights, palette, radii, shadows, spacing } from '@/styles/theme'

export const Section = styled.section`
  scroll-snap-align: start;
  display: grid;
  align-content: center;
  gap: ${spacing['2xl']};
  min-height: 100dvh;
  min-height: 100svh;
  padding: ${spacing['5xl']} ${spacing.xl};
  background: ${palette.canvas};

  ${({ theme }) => theme.media.md} {
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
    grid-template-columns: minmax(0, 1fr) minmax(0, 24rem);
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
  color: ${palette.inkSoft};
`

export const Title = styled.h2`
  font-size: ${fontSizes.h1};
  font-weight: ${fontWeights.black};
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: ${palette.ink};
  text-wrap: balance;
`

export const Lede = styled.p`
  max-width: 42ch;
  font-size: ${fontSizes.body};
  font-weight: ${fontWeights.medium};
  line-height: 1.55;
  color: ${palette.inkSoft};
`

export const Playground = styled.form`
  display: grid;
  gap: ${spacing.md};
  padding: ${spacing.xl};
  border-radius: ${radii.lg};
  border: 1.5px solid ${palette.line};
  background: ${palette.white};
  box-shadow: ${shadows.md};
  min-width: 0;

  ${({ theme }) => theme.media.md} {
    padding: ${spacing['2xl']};
  }
`

export const TableRow = styled.div`
  display: grid;
  gap: ${spacing.md};
  align-items: end;

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: minmax(0, 1fr) auto;
  }
`

export const Divider = styled.p`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${palette.inkSoft};
  text-align: center;
`

export const Actions = styled.div`
  display: grid;
  gap: ${spacing.md};

  ${({ theme }) => theme.media.sm} {
    grid-auto-flow: column;
    justify-content: start;
    align-items: center;
  }
`

export const Note = styled.p`
  max-width: 52ch;
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  line-height: 1.5;
  color: ${palette.inkSoft};
`
