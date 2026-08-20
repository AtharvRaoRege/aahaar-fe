import styled from 'styled-components'

import { landing, landingFonts, spacing } from '@/styles/theme'
import { focusRing, revealUp } from '@/styles/mixins'

export const Section = styled.section`
  padding: 11vh ${spacing.xl} 9vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing['2xl']};
  overflow: hidden;
  position: relative;
  background: radial-gradient(circle at 50% 0%, ${landing.chiliGlow}, transparent 60%);

  ${({ theme }) => theme.media.md} {
    padding: 18vh ${spacing.xl} 14vh;
  }
`

export const Title = styled.h2<{ $in: boolean }>`
  font-family: ${landingFonts.display};
  font-size: clamp(30px, 9vw, 58px);
  line-height: 1.02;
  letter-spacing: -0.01em;
  max-width: 540px;
  position: relative;
  z-index: 2;
  ${({ $in }) => revealUp($in)};
`

export const Sub = styled.p`
  font-size: 15px;
  color: ${landing.inkSoft};
  max-width: 300px;
  position: relative;
  z-index: 2;
`

export const Cta = styled.button`
  ${focusRing};
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: ${landing.chili};
  color: ${landing.paper};
  border: none;
  border-radius: 3px;
  padding: 16px 30px;
  font-family: ${landingFonts.body};
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  box-shadow: 6px 6px 0 ${landing.ink};
  transition:
    transform 150ms ease,
    box-shadow 150ms ease;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0 ${landing.ink};
  }

  &:active {
    transform: translate(0, 0);
    box-shadow: 3px 3px 0 ${landing.ink};
  }
`

export const Footer = styled.footer`
  text-align: center;
  padding: 28px ${spacing.xl} ${spacing['4xl']};
  font-size: 10px;
  color: ${landing.inkSoft};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`
