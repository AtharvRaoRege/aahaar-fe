import styled from 'styled-components'

import { landing, landingFonts, spacing } from '@/styles/theme'

export const Section = styled.section`
  background: ${landing.turmeric};
  padding: 9vh ${spacing.xl};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  position: relative;
  overflow: hidden;

  ${({ theme }) => theme.media.md} {
    padding: 16vh ${spacing.xl};
  }
`

export const Title = styled.h2`
  font-family: ${landingFonts.display};
  font-size: clamp(26px, 7vw, 44px);
  line-height: 1.02;
  letter-spacing: -0.01em;
  max-width: 460px;
  position: relative;
  z-index: 2;
`

export const Coins = styled.span`
  width: 120px;
  margin: 0 auto;
  display: block;
  position: relative;
  z-index: 2;
`

export const Compare = styled.div`
  display: flex;
  gap: 26px;
  align-items: flex-end;
  margin-top: ${spacing.xl};
  position: relative;
  z-index: 2;

  ${({ theme }) => theme.media.md} {
    gap: 60px;
  }
`

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.sm};
`

export const BarWrap = styled.div`
  width: 56px;
  height: 180px;
  background: ${landing.inkWash};
  border-radius: 6px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;

  ${({ theme }) => theme.media.md} {
    width: 80px;
    height: 220px;
  }
`

export const Fill = styled.span<{ $in: boolean; $to: number; $skin: 'ink' | 'chili' }>`
  width: 100%;
  border-radius: 6px 6px 0 0;
  height: ${({ $in, $to }) => ($in ? $to : 0)}%;
  background: ${({ $skin }) => ($skin === 'chili' ? landing.chili : landing.ink)};
  transition: height 1400ms cubic-bezier(0.2, 0.7, 0.2, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const Value = styled.span`
  font-family: ${landingFonts.display};
  font-size: 24px;
`

export const Label = styled.span`
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`
