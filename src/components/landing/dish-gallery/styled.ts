import styled from 'styled-components'

import { landing, landingFonts, spacing } from '@/styles/theme'
import { revealUp } from '@/styles/mixins'

const ART_BACKGROUNDS: Record<string, string> = {
  paperDim: landing.paperDim,
  ink: landing.ink,
  turmeric: landing.turmeric,
  chili: landing.chili,
  mint: landing.mint,
}

export const Section = styled.section`
  padding: 8vh 0;
  overflow: hidden;
  position: relative;

  ${({ theme }) => theme.media.md} {
    padding: 12vh 0;
  }
`

export const Row = styled.div`
  display: flex;
  gap: 14px;
  overflow-x: auto;
  padding: 6px ${spacing.xl} 30px;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
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

export const Dish = styled.article<{ $in: boolean; $delay: number }>`
  flex: 0 0 auto;
  scroll-snap-align: start;
  width: 180px;
  border: 2px solid ${landing.ink};
  border-radius: ${landing.radius};
  background: ${landing.paper};
  box-shadow: 6px 6px 0 ${landing.ink};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  ${({ $in, $delay }) => revealUp($in, $delay)};
`

export const DishArtBox = styled.div<{ $skin: string }>`
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $skin }) => ART_BACKGROUNDS[$skin] ?? landing.paperDim};

  span {
    display: block;
    width: 80px;
    height: 80px;
  }
`

export const DishBody = styled.div`
  padding: ${spacing.lg};
  text-align: center;
`

export const DishName = styled.h3`
  font-family: ${landingFonts.display};
  font-size: 16px;
  line-height: 1.02;
`

export const DishPrice = styled.p`
  font-family: ${landingFonts.display};
  font-size: 18px;
  color: ${landing.chili};
  margin-top: 4px;
`

export const DishTag = styled.p`
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${landing.inkSoft};
  margin-top: 4px;
`
