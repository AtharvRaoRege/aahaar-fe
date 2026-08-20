import styled, { css } from 'styled-components'

import { landing, landingFonts, spacing } from '@/styles/theme'
import { revealUp } from '@/styles/mixins'

import type { LandingSkin } from '@/constants/landing'

const SKINS: Record<LandingSkin, ReturnType<typeof css>> = {
  paper: css`
    background: ${landing.paper};
    color: ${landing.ink};
  `,
  ink: css`
    background: ${landing.ink};
    color: ${landing.paper};
  `,
  chili: css`
    background: ${landing.chili};
    color: ${landing.paper};
  `,
  turmeric: css`
    background: ${landing.turmeric};
    color: ${landing.ink};
  `,
  mint: css`
    background: ${landing.mint};
    color: ${landing.paper};
  `,
}

export const Section = styled.section<{ $dark?: boolean }>`
  position: relative;
  overflow: hidden;
  padding: 8vh 0;
  background: ${({ $dark }) => ($dark ? landing.ink : 'transparent')};

  ${({ theme }) => theme.media.md} {
    padding: 12vh 0;
  }
`

export const Scroller = styled.div`
  display: flex;
  gap: 18px;
  overflow-x: auto;
  padding: 6px ${spacing.xl} 30px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  position: relative;
  z-index: 2;

  &::-webkit-scrollbar {
    display: none;
  }

  ${({ theme }) => theme.media.md} {
    justify-content: center;
    flex-wrap: wrap;
    overflow-x: visible;
    padding: 6px ${spacing['4xl']} 10px;
  }
`

export const Card = styled.article<{ $skin: LandingSkin; $in: boolean; $delay: number }>`
  flex: 0 0 auto;
  scroll-snap-align: start;
  width: 240px;
  min-height: 260px;
  border: 2px solid ${landing.ink};
  border-radius: ${landing.radius};
  padding: 26px ${spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.lg};
  text-align: center;
  box-shadow: 6px 6px 0 ${landing.ink};
  ${({ $skin }) => SKINS[$skin]};
  ${({ $in, $delay }) => revealUp($in, $delay)};

  ${({ theme }) => theme.media.md} {
    width: 250px;
    min-height: 280px;
  }
`

export const CardIcon = styled.span<{ $skin: LandingSkin }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid ${({ $skin }) => ($skin === 'paper' ? landing.ink : landing.paper)};
  background: ${({ $skin }) => ($skin === 'paper' ? landing.paperDim : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 32px;
    height: 32px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2.2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`

export const CardTitle = styled.h3`
  font-family: ${landingFonts.display};
  font-size: 18px;
  line-height: 1.02;
`

export const CardBody = styled.p`
  font-size: 16px;
  line-height: 1.5;
`
