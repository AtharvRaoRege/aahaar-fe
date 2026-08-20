import styled from 'styled-components'

import { landing, landingFonts, spacing } from '@/styles/theme'
import { revealUp } from '@/styles/mixins'

export const Section = styled.section`
  position: relative;
  overflow: hidden;
  background: ${landing.ink};
  padding: 8vh ${spacing.xl};
  color: ${landing.paper};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;

  ${({ theme }) => theme.media.md} {
    padding: 12vh ${spacing.xl};
    gap: ${spacing['4xl']};
  }
`

export const Title = styled.h2`
  font-family: ${landingFonts.display};
  font-size: clamp(24px, 6vw, 38px);
  line-height: 1.02;
  text-align: center;
  max-width: 480px;
  position: relative;
  z-index: 2;
  color: ${landing.paper};
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacing.xl};
  max-width: 680px;
  width: 100%;
  position: relative;
  z-index: 2;

  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(4, 1fr);
  }
`

export const Tile = styled.div<{ $in: boolean; $delay: number }>`
  border: 2px solid ${landing.paper};
  border-radius: ${landing.radius};
  padding: ${spacing['2xl']} 18px;
  text-align: center;
  box-shadow: 5px 5px 0 ${landing.turmeric};
  ${({ $in, $delay }) => revealUp($in, $delay)};
`

export const Num = styled.span`
  display: block;
  font-family: ${landingFonts.display};
  font-size: clamp(30px, 9vw, 50px);
  color: ${landing.turmeric};
  font-variant-numeric: tabular-nums;
`

export const Label = styled.span`
  display: block;
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: 6px;
  opacity: 0.85;
`
