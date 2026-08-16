import styled, { keyframes } from 'styled-components'

import { faintHalftone, hideScrollbar, neoLiftOnHover } from '@/styles/mixins'
import { palette, shadows } from '@/styles/theme'

export const Page = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${palette.canvas};
`

export const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  padding-top: max(12px, env(safe-area-inset-top, 0px));
  border-bottom: 4px solid ${palette.ink};
  background: ${palette.cream};
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};

  ${({ theme }) => theme.media.md} {
    padding: 18px 32px;
    padding-top: max(18px, env(safe-area-inset-top, 0px));
  }

  ${({ theme }) => theme.media.lg} {
    padding: 20px 64px;
    padding-top: max(20px, env(safe-area-inset-top, 0px));
  }

  ${({ theme }) => theme.media.xl} {
    padding: 20px 80px;
    padding-top: max(20px, env(safe-area-inset-top, 0px));
  }
`

export const Brand = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  text-transform: uppercase;

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    flex-shrink: 0;
  }
`

export const Hero = styled.section`
  position: relative;
  display: grid;
  gap: 32px;
  padding: 48px 20px 72px;
  min-height: 88dvh;
  ${faintHalftone};

  ${({ theme }) => theme.media.sm} {
    padding: 56px 28px 80px;
  }

  ${({ theme }) => theme.media.md} {
    padding: 72px 32px 96px;
    min-height: 92dvh;
  }

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: 1.15fr 0.85fr;
    align-items: center;
    padding: 80px 64px 120px;
  }

  ${({ theme }) => theme.media.xl} {
    padding: 96px 80px 140px;
    gap: 48px;
  }
`

export const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px 16px;
  background: ${palette.cream};
  border: 4px solid ${palette.ink};
  box-shadow: ${shadows.lg};

  ${({ theme }) => theme.media.sm} {
    padding: 28px 24px;
  }

  ${({ theme }) => theme.media.md} {
    padding: 36px 32px;
    max-width: 720px;
  }

  ${({ theme }) => theme.media.lg} {
    max-width: none;
  }
`

export const StickerRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`

export const Headline = styled.h1`
  font-size: clamp(2.75rem, 12vw, 7rem);
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: -0.03em;
  text-transform: uppercase;

  span {
    color: transparent;
    -webkit-text-stroke: 2px ${palette.ink};
  }
`

export const Lede = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  max-width: 46ch;
  color: ${palette.inkSoft};
`

export const CtaRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  > button {
    width: 100%;
  }

  ${({ theme }) => theme.media.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;

    > button {
      width: auto;
    }
  }
`

export const HeroArt = styled.div`
  position: relative;
  z-index: 1;
  display: none;

  ${({ theme }) => theme.media.lg} {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12rem;
    background: ${palette.mango};
    border: 8px solid ${palette.ink};
    box-shadow: 16px 16px 0 ${palette.ink};
    aspect-ratio: 4 / 3;
    transform: rotate(-2deg);
  }
`

const marqueeMove = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`

export const Marquee = styled.div`
  overflow: hidden;
  border-top: 4px solid ${palette.ink};
  border-bottom: 4px solid ${palette.ink};
  background: ${palette.tomato};
  color: ${palette.white};
  ${hideScrollbar};
`

export const MarqueeTrack = styled.div`
  display: flex;
  width: max-content;
  animation: ${marqueeMove} 22s linear infinite;
`

export const MarqueeItem = styled.span`
  flex-shrink: 0;
  padding: 18px 28px;
  font-size: clamp(1.25rem, 3vw, 2rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;

  ${({ theme }) => theme.media.md} {
    padding: 22px 40px;
  }
`

export const Flow = styled.section`
  padding: 64px 20px;
  background: ${palette.canvas};

  ${({ theme }) => theme.media.sm} {
    padding: 72px 28px;
  }

  ${({ theme }) => theme.media.md} {
    padding: 88px 32px;
  }

  ${({ theme }) => theme.media.lg} {
    padding: 104px 64px;
  }

  ${({ theme }) => theme.media.xl} {
    padding: 120px 80px;
  }
`

export const SectionKicker = styled.p`
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${palette.tomato};
  margin-bottom: 8px;
`

export const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  line-height: 0.95;
  max-width: 16ch;
  margin-bottom: 40px;

  ${({ theme }) => theme.media.md} {
    margin-bottom: 56px;
  }
`

export const FlowList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const FlowItem = styled.article<{ $shift?: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  padding: 20px 16px;
  background: ${palette.white};
  border: 4px solid ${palette.ink};
  box-shadow: ${shadows.md};
  ${neoLiftOnHover};

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: 88px 1fr;
    gap: 16px;
    padding: 24px;
  }

  ${({ theme }) => theme.media.md} {
    grid-template-columns: 110px 1fr;
    padding: 28px;
    width: min(100%, 720px);
    margin-left: ${({ $shift }) => ($shift ? 'auto' : '0')};
  }

  ${({ theme }) => theme.media.lg} {
    width: min(100%, 780px);
  }

  ${({ theme }) => theme.media.xl} {
    width: min(100%, 840px);
  }
`

export const FlowNum = styled.span`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  line-height: 0.85;
  letter-spacing: -0.04em;
  color: ${palette.tomato};
`

export const FlowName = styled.h3`
  font-size: clamp(1.375rem, 3vw, 2rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
`

export const FlowBody = styled.p`
  font-weight: 700;
  color: ${palette.inkSoft};
  max-width: 42ch;
`

export const Split = styled.section`
  display: grid;
  border-top: 4px solid ${palette.ink};

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: 1.15fr 0.85fr;
  }
`

export const SplitPane = styled.div<{ $tone: 'cream' | 'mango' }>`
  padding: 64px 20px;
  background: ${({ $tone }) => ($tone === 'mango' ? palette.mango : palette.cream)};
  border-bottom: 4px solid ${palette.ink};

  ${({ theme }) => theme.media.sm} {
    padding: 72px 28px;
  }

  ${({ theme }) => theme.media.md} {
    padding: 88px 32px;
  }

  ${({ theme }) => theme.media.lg} {
    padding: 104px 48px;
    border-bottom: none;
    &:last-child {
      border-left: 4px solid ${palette.ink};
    }
  }

  ${({ theme }) => theme.media.xl} {
    padding: 120px 64px;
  }
`

export const SplitTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 0.95;
  margin: 8px 0 16px;
`

export const SplitBody = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  max-width: 36ch;
  color: ${palette.ink};
`

export const CtaBand = styled.section`
  padding: 72px 20px;
  background: ${palette.ink};
  color: ${palette.white};
  border-top: 4px solid ${palette.ink};

  ${({ theme }) => theme.media.sm} {
    padding: 80px 28px;
  }

  ${({ theme }) => theme.media.md} {
    padding: 96px 32px;
  }

  ${({ theme }) => theme.media.lg} {
    padding: 112px 64px;
  }

  ${({ theme }) => theme.media.xl} {
    padding: 128px 80px;
  }
`

export const CtaKicker = styled.p`
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${palette.mango};
  margin-bottom: 8px;
`

export const CtaTitle = styled.h2`
  font-size: clamp(2.25rem, 6vw, 4.5rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 0.95;
  max-width: 14ch;
  margin-bottom: 16px;
`

export const CtaBody = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  max-width: 42ch;
  margin-bottom: 28px;
  color: ${palette.cream};
`

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 28px 20px 40px;
  background: ${palette.cream};
  border-top: 4px solid ${palette.ink};
  font-weight: 700;
  color: ${palette.inkSoft};

  ${({ theme }) => theme.media.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 32px 32px 48px;
  }

  ${({ theme }) => theme.media.lg} {
    padding: 32px 64px 56px;
  }

  ${({ theme }) => theme.media.xl} {
    padding: 36px 80px 64px;
  }
`

export const FooterBrand = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 900;
  text-transform: uppercase;
  color: ${palette.ink};
  font-size: 1.125rem;

  img {
    width: 28px;
    height: 28px;
    object-fit: contain;
  }
`
