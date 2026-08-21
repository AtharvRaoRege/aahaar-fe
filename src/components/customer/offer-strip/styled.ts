import styled, { keyframes } from 'styled-components'

import { neoPressable } from '@/styles/mixins'
import { fontSizes, fontWeights, palette, radii, shadows, spacing } from '@/styles/theme'

const shimmer = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`

export const Wrap = styled.section`
  display: grid;
  gap: ${spacing.md};
  padding: ${spacing.lg} ${spacing.lg} 0;

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.lg} ${spacing.xl} 0;
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.xl} ${spacing['2xl']} 0;
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.xl} ${spacing['3xl']} 0;
  }
`

export const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  color: ${palette.tomato};
`

export const Label = styled.h2`
  margin: 0;
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: inherit;
`

export const Rail = styled.div`
  display: flex;
  gap: ${spacing.md};
  overflow-x: auto;
  padding-bottom: ${spacing.xs};
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.lg};
    overflow-x: visible;
    flex-wrap: wrap;
  }
`

export const Banner = styled.button`
  ${neoPressable};
  flex: 0 0 auto;
  scroll-snap-align: start;
  position: relative;
  overflow: hidden;
  display: grid;
  gap: ${spacing.xs};
  min-width: min(88vw, 320px);
  max-width: 380px;
  padding: ${spacing.xl} ${spacing.lg};
  text-align: left;
  color: ${palette.white};
  border: 2px solid ${palette.ink};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.md};
  background: linear-gradient(
    125deg,
    ${palette.tomato} 0%,
    ${palette.chili} 45%,
    ${palette.mangoDark} 100%
  );
  background-size: 180% 180%;
  animation: ${shimmer} 8s ease-in-out infinite alternate;

  ${({ theme }) => theme.media.md} {
    min-width: 280px;
    padding: ${spacing['2xl']} ${spacing.xl};
  }

  &::after {
    content: '';
    position: absolute;
    inset: auto -20% -40% auto;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: ${palette.mangoWash};
    pointer-events: none;
  }
`

export const BannerTop = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`

export const BannerIcon = styled.span`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: ${radii.full};
  background: ${palette.creamFog};
  color: ${palette.ink};
`

export const BannerKicker = styled.span`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.9;
`

export const BannerHeadline = styled.span`
  position: relative;
  z-index: 1;
  font-size: ${fontSizes.h1};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.04em;
  line-height: 1.05;
  overflow-wrap: anywhere;
`

export const BannerTitle = styled.span`
  position: relative;
  z-index: 1;
  font-size: ${fontSizes.bodyLg};
  font-weight: ${fontWeights.bold};
  line-height: 1.25;
`

export const BannerMeta = styled.span`
  position: relative;
  z-index: 1;
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  opacity: 0.92;
`

export const BannerCode = styled.span`
  position: relative;
  z-index: 1;
  margin-top: ${spacing.xs};
  display: inline-flex;
  align-self: start;
  padding: ${spacing.xs} ${spacing.md};
  border-radius: ${radii.full};
  background: ${palette.creamFog};
  color: ${palette.ink};
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.black};
  letter-spacing: 0.06em;
`

export const SheetBody = styled.div`
  display: grid;
  gap: ${spacing.md};
`

export const SheetHead = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing.md};
`

export const SheetIcon = styled.span`
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: ${radii.md};
  background: ${palette.mangoWash};
  color: ${palette.tomato};
`

export const SheetTitle = styled.h3`
  margin: 0;
  font-size: ${fontSizes.h2};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.03em;
  line-height: 1.2;
`

export const SheetText = styled.p`
  font-size: ${fontSizes.body};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
  line-height: 1.5;
`

export const CodeBox = styled.p`
  display: grid;
  gap: ${spacing.xs};
  padding: ${spacing.lg};
  border: 2px dashed ${palette.tomato};
  border-radius: ${radii.md};
  color: ${palette.tomato};
  font-size: ${fontSizes.h2};
  font-weight: ${fontWeights.black};
  letter-spacing: 0.1em;
  text-align: center;
`

export const CodeHint = styled.span`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  letter-spacing: 0;
  color: ${palette.inkSoft};
`

export const TermsLabel = styled.h4`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${palette.inkSoft};
`

export const RuleList = styled.ul`
  margin: 0;
  padding-left: ${spacing.lg};
  display: grid;
  gap: ${spacing.xs};
  color: ${palette.inkSoft};
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
`
