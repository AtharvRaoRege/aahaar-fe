import styled, { css } from 'styled-components'

import { landing, landingFonts, spacing } from '@/styles/theme'
import { revealUp } from '@/styles/mixins'

import type { LandingSkin } from '@/constants/landing'

const SKINS: Record<LandingSkin, ReturnType<typeof css>> = {
  paper: css`
    background: ${landing.paper};
    color: ${landing.ink};
    box-shadow: 6px 6px 0 ${landing.ink};
  `,
  ink: css`
    background: ${landing.ink};
    color: ${landing.paper};
    box-shadow: 6px 6px 0 ${landing.turmeric};
  `,
  chili: css`
    background: ${landing.chili};
    color: ${landing.paper};
    box-shadow: 6px 6px 0 ${landing.ink};
  `,
  turmeric: css`
    background: ${landing.turmeric};
    color: ${landing.ink};
    box-shadow: 6px 6px 0 ${landing.ink};
  `,
  mint: css`
    background: ${landing.mint};
    color: ${landing.paper};
    box-shadow: 6px 6px 0 ${landing.ink};
  `,
}

export const Section = styled.section`
  padding: 9vh ${spacing.xl};
  overflow: hidden;
  position: relative;

  ${({ theme }) => theme.media.md} {
    padding: 14vh ${spacing.xl};
  }
`

export const Grid = styled.div`
  max-width: 760px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.lg};
  position: relative;
  z-index: 2;

  ${({ theme }) => theme.media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const Cell = styled.article<{ $skin: LandingSkin; $in: boolean; $delay: number }>`
  border: 2px solid ${landing.ink};
  border-radius: ${landing.radius};
  padding: ${spacing['2xl']} ${spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  ${({ $skin }) => SKINS[$skin]};
  ${({ $in, $delay }) => revealUp($in, $delay)};
`

export const CellIcon = styled.span<{ $skin: LandingSkin }>`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 2px solid ${({ $skin }) => ($skin === 'paper' ? landing.ink : landing.paper)};
  background: ${({ $skin }) => ($skin === 'paper' ? landing.paperDim : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 28px;
    height: 28px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2.2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`

export const CellTitle = styled.h3`
  font-family: ${landingFonts.display};
  font-size: 19px;
  line-height: 1.02;
`

export const CellBody = styled.p`
  font-size: 14px;
  line-height: 1.55;
  opacity: 0.9;
`
