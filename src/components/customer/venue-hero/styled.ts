import styled from 'styled-components'

import { focusRing, hideScrollbar, neoPressable } from '@/styles/mixins'
import { fontSizes, fontWeights, palette, radii, shadows, spacing } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export const Hero = styled.header`
  position: relative;
  display: grid;
`

export const Cover = styled.div`
  position: relative;
  height: 132px;
  overflow: hidden;
  background-color: ${brandVar.primaryHover};

  ${({ theme }) => theme.media.sm} {
    height: 156px;
  }

  ${({ theme }) => theme.media.md} {
    height: 184px;
  }

  ${({ theme }) => theme.media.lg} {
    height: 216px;
  }

  ${({ theme }) => theme.media.xl} {
    height: 248px;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(28, 25, 22, 0.1) 0%,
      rgba(28, 25, 22, 0.05) 45%,
      ${palette.canvas} 100%
    );
  }
`

export const CoverImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const CoverPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(${palette.white} 1.5px, transparent 1.5px);
  background-size: 22px 22px;
  opacity: 0.16;
`

export const Plate = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  gap: ${spacing.sm};
  margin-top: -34px;
  padding: 0 ${spacing.lg} ${spacing.md};

  ${({ theme }) => theme.media.sm} {
    margin-top: -38px;
    padding: 0 ${spacing.xl} ${spacing.md};
  }

  ${({ theme }) => theme.media.md} {
    margin-top: -42px;
    padding: 0 ${spacing['2xl']} ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    padding: 0 ${spacing['2xl']} ${spacing.lg};
  }

  ${({ theme }) => theme.media.xl} {
    padding: 0 ${spacing['3xl']} ${spacing.lg};
  }
`

export const Medallion = styled.div`
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  overflow: hidden;
  background: ${palette.cream};
  border: 2px solid ${palette.canvas};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.md};
  font-size: ${fontSizes.subheading};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.02em;
  color: ${brandVar.accentText};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${({ theme }) => theme.media.md} {
    width: 72px;
    height: 72px;
  }
`

export const Name = styled.h1`
  font-size: clamp(1.5rem, 6vw, 2.25rem);
  font-weight: ${fontWeights.black};
  letter-spacing: -0.035em;
  line-height: 1.1;
  text-wrap: balance;
  color: ${palette.ink};
`

export const Tagline = styled.p`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  line-height: 1.45;
  color: ${palette.inkSoft};
  max-width: 60ch;
`

export const Facts = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${spacing.xs} ${spacing.sm};
`

export const Rating = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px ${spacing.sm};
  background: ${palette.chutney};
  color: ${palette.white};
  border-radius: ${radii.full};
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};

  svg {
    width: 12px;
    height: 12px;
    fill: currentColor;
    stroke: none;
  }
`

export const RatingCount = styled.span`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
`

export const OpenState = styled.span<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  color: ${({ $open }) => ($open ? palette.chutney : palette.chili)};

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: ${radii.full};
    background: currentColor;
  }
`

export const TablePill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 3px ${spacing.sm};
  background: ${brandVar.surfaceTint};
  border: 1px solid ${brandVar.border};
  color: ${palette.ink};
  border-radius: ${radii.full};
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  letter-spacing: 0.02em;
  white-space: nowrap;
`

export const Dot = styled.span`
  color: ${palette.line};
  font-weight: ${fontWeights.bold};
`

export const Actions = styled.div`
  ${hideScrollbar};
  display: flex;
  gap: ${spacing.sm};
  margin-top: ${spacing.xs};
  overflow-x: auto;

  ${({ theme }) => theme.media.md} {
    overflow-x: visible;
    flex-wrap: wrap;
  }
`

export const Action = styled.a`
  ${neoPressable};
  ${focusRing};
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 40px;
  padding: 0 ${spacing.lg};
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.full};
  color: ${palette.ink};
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.bold};
  white-space: nowrap;

  svg {
    width: 15px;
    height: 15px;
  }
`
