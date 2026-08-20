import styled from 'styled-components'

import { landing, landingFonts, spacing } from '@/styles/theme'
import { revealUp } from '@/styles/mixins'

import type { LandingSkin } from '@/constants/landing'

const AVATARS: Record<LandingSkin, { bg: string; fg: string }> = {
  paper: { bg: landing.paper, fg: landing.ink },
  ink: { bg: landing.ink, fg: landing.paper },
  chili: { bg: landing.chili, fg: landing.paper },
  turmeric: { bg: landing.turmeric, fg: landing.ink },
  mint: { bg: landing.mint, fg: landing.paper },
}

export const Section = styled.section`
  padding: 9vh 0;
  text-align: center;
  overflow: hidden;
  position: relative;

  ${({ theme }) => theme.media.md} {
    padding: 14vh 0;
  }
`

export const Row = styled.div`
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
  }
`

export const Quote = styled.figure<{ $in: boolean; $delay: number }>`
  flex: 0 0 auto;
  scroll-snap-align: start;
  width: 280px;
  background: ${landing.paper};
  border: 2px solid ${landing.ink};
  border-radius: ${landing.radius};
  padding: ${spacing['2xl']} ${spacing.xl};
  text-align: left;
  box-shadow: 6px 6px 0 ${landing.ink};
  display: flex;
  flex-direction: column;
  gap: 14px;
  ${({ $in, $delay }) => revealUp($in, $delay)};

  ${({ theme }) => theme.media.md} {
    width: 300px;
  }
`

export const Stars = styled.span`
  color: ${landing.turmeric};
  font-size: 16px;
  letter-spacing: 3px;
`

export const Text = styled.blockquote`
  font-size: 15px;
  line-height: 1.6;
`

export const Who = styled.figcaption`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
`

export const Avatar = styled.span<{ $skin: LandingSkin }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${landing.ink};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${landingFonts.display};
  font-size: 16px;
  flex-shrink: 0;
  background: ${({ $skin }) => AVATARS[$skin].bg};
  color: ${({ $skin }) => AVATARS[$skin].fg};
`

export const Name = styled.span`
  display: block;
  font-family: ${landingFonts.display};
  font-size: 13px;
`

export const Role = styled.span`
  display: block;
  font-size: 10px;
  color: ${landing.inkSoft};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`
