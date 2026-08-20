import styled from 'styled-components'

import { landing, landingFonts, spacing } from '@/styles/theme'
import { revealUp } from '@/styles/mixins'

export const Section = styled.section`
  padding: 9vh ${spacing.xl};
  text-align: center;
  overflow: hidden;
  position: relative;

  ${({ theme }) => theme.media.md} {
    padding: 16vh ${spacing.xl};
  }
`

export const Plans = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  max-width: 340px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  ${({ theme }) => theme.media.md} {
    flex-direction: row;
    max-width: 760px;
  }
`

export const Plan = styled.article<{ $pro?: boolean; $in: boolean; $delay: number }>`
  flex: 1;
  border: 2px solid ${landing.ink};
  border-radius: ${landing.radius};
  padding: ${spacing['2xl']} 22px;
  text-align: left;
  position: relative;
  background: ${({ $pro }) => ($pro ? landing.ink : landing.paper)};
  color: ${({ $pro }) => ($pro ? landing.paper : landing.ink)};
  box-shadow: 8px 8px 0 ${({ $pro }) => ($pro ? landing.turmeric : landing.line)};
  ${({ $in, $delay }) => revealUp($in, $delay)};
`

export const Ribbon = styled.span`
  position: absolute;
  top: -12px;
  right: ${spacing.lg};
  background: ${landing.chili};
  color: ${landing.paper};
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 3px;
  transform: rotate(3deg);
`

export const PlanName = styled.h3`
  font-family: ${landingFonts.display};
  font-size: 26px;
  line-height: 1.02;
`

export const Price = styled.p`
  font-family: ${landingFonts.display};
  font-size: 34px;
  margin-top: 6px;

  small {
    font-family: ${landingFonts.body};
    font-size: 12px;
    font-weight: 400;
    opacity: 0.7;
  }
`

export const Limit = styled.p<{ $pro?: boolean }>`
  margin-top: 6px;
  font-size: 11px;
  color: ${({ $pro }) => ($pro ? landing.turmeric : landing.mint)};
`

export const Features = styled.ul<{ $pro?: boolean }>`
  padding: 0;
  margin: ${spacing.lg} 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;

  li {
    display: flex;
    gap: ${spacing.sm};
    align-items: flex-start;
  }

  svg {
    width: 14px;
    height: 14px;
    flex: 0 0 auto;
    margin-top: 2px;
    fill: none;
    stroke: ${({ $pro }) => ($pro ? landing.turmeric : landing.mint)};
    stroke-width: 2.4;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`
