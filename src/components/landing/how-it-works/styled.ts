import styled from 'styled-components'

import { landing, landingFonts, spacing } from '@/styles/theme'
import type { LandingSkin } from '@/constants/landing'

const NUM_SKINS: Record<LandingSkin, { bg: string; fg: string }> = {
  paper: { bg: landing.paper, fg: landing.ink },
  ink: { bg: landing.ink, fg: landing.paper },
  chili: { bg: landing.chili, fg: landing.paper },
  turmeric: { bg: landing.turmeric, fg: landing.ink },
  mint: { bg: landing.mint, fg: landing.paper },
}

export const Section = styled.section`
  padding: 9vh ${spacing.xl};
  text-align: center;
  overflow: hidden;
  position: relative;

  ${({ theme }) => theme.media.md} {
    padding: 14vh ${spacing.xl};
  }
`

export const Steps = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 680px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`

export const Step = styled.li<{ $in: boolean; $delay?: number }>`
  display: flex;
  align-items: flex-start;
  gap: 18px;
  text-align: left;
  border: 2px solid ${landing.ink};
  border-radius: ${landing.radius};
  padding: 22px ${spacing.xl};
  background: ${landing.paper};
  box-shadow: 6px 6px 0 ${landing.ink};
  opacity: ${({ $in }) => ($in ? 1 : 0)};
  transform: translate3d(${({ $in }) => ($in ? '0' : '-30px')}, 0, 0);
  transition:
    opacity 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${({ $delay = 0 }) => $delay}ms,
    transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${({ $delay = 0 }) => $delay}ms;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }
`

export const StepNum = styled.span<{ $skin: LandingSkin }>`
  flex: 0 0 auto;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ $skin }) => NUM_SKINS[$skin].bg};
  color: ${({ $skin }) => NUM_SKINS[$skin].fg};
  font-family: ${landingFonts.display};
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StepTitle = styled.h3`
  font-family: ${landingFonts.display};
  font-size: 20px;
  line-height: 1.02;
  margin-bottom: 6px;
`

export const StepBody = styled.p`
  font-size: 14px;
  color: ${landing.inkSoft};
  line-height: 1.55;
`
