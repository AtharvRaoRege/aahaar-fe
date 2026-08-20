import styled from 'styled-components'

import { landing, landingFonts, spacing } from '@/styles/theme'

import type { LandingSkin } from '@/constants/landing'

const DOTS: Record<LandingSkin, string> = {
  paper: landing.paper,
  ink: landing.ink,
  chili: landing.chili,
  turmeric: landing.turmeric,
  mint: landing.mint,
}

export const Section = styled.section`
  padding: 8vh ${spacing.xl};
  overflow: hidden;
  position: relative;

  ${({ theme }) => theme.media.md} {
    padding: 14vh ${spacing.xl};
  }
`

export const Timeline = styled.ol`
  max-width: 560px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    left: 24px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: repeating-linear-gradient(
      180deg,
      ${landing.ink} 0 8px,
      transparent 8px 18px
    );
    opacity: 0.3;
  }
`

export const Stop = styled.li<{ $in: boolean; $delay?: number }>`
  position: relative;
  padding-left: 64px;
  margin-bottom: 28px;
  opacity: ${({ $in }) => ($in ? 1 : 0)};
  transform: translate3d(${({ $in }) => ($in ? '0' : '-24px')}, 0, 0);
  transition:
    opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${({ $delay = 0 }) => $delay}ms,
    transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${({ $delay = 0 }) => $delay}ms;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }
`

export const StopDot = styled.span<{ $skin: LandingSkin }>`
  position: absolute;
  left: 14px;
  top: 4px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 3px solid ${landing.ink};
  background: ${({ $skin }) => DOTS[$skin]};
`

export const StopTitle = styled.h3`
  font-family: ${landingFonts.display};
  font-size: 19px;
  line-height: 1.02;
  margin-bottom: 4px;
`

export const StopBody = styled.p`
  font-size: 14px;
  color: ${landing.inkSoft};
  line-height: 1.55;
`
