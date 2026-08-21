import styled from 'styled-components'

import { focusRing, neoLiftOnHover } from '@/styles/mixins'
import { fontSizes, fontWeights, palette, radii, shadows, spacing } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export const Tag = styled.span<{ $tone: 'sold' | 'best' }>`
  padding: 2px ${spacing.sm};
  border-radius: ${radii.sm};
  font-size: ${fontSizes.micro};
  font-weight: ${fontWeights.black};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${({ $tone }) => ($tone === 'sold' ? palette.white : palette.ink)};
  background: ${({ $tone }) => ($tone === 'sold' ? palette.chili : brandVar.primary)};
  color: ${({ $tone }) => ($tone === 'sold' ? palette.white : brandVar.onPrimary)};
`

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${spacing.sm};
  min-width: 0;
`

export const Spice = styled.span`
  font-size: ${fontSizes.labelSm};
  letter-spacing: -0.05em;
`

export const Name = styled.span`
  display: block;
  font-size: ${fontSizes.body};
  font-weight: ${fontWeights.black};
  line-height: 1.25;
  letter-spacing: -0.02em;
  text-align: left;
  text-wrap: balance;
  overflow-wrap: anywhere;
  color: ${palette.ink};

  ${({ theme }) => theme.media.md} {
    font-size: ${fontSizes.bodyLg};
  }
`

export const Desc = styled.p`
  overflow-wrap: anywhere;
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: left;
`

export const Price = styled.span`
  font-size: ${fontSizes.subheading};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.03em;
  color: ${palette.ink};
  font-variant-numeric: tabular-nums;
`

export const CustomTag = styled.span`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
`

export const PriceBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
  margin-top: auto;
  padding-top: ${spacing.sm};
`

export const TitleHit = styled.button`
  ${focusRing};
  display: grid;
  gap: ${spacing.xs};
  min-width: 0;
  padding: 0;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  min-width: 0;
  padding: ${spacing.md} 0 ${spacing.md} ${spacing.md};

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.lg};
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.xl};
  }
`

export const Media = styled.div`
  position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: ${spacing.md} ${spacing.md} ${spacing.md} 0;
  width: 118px;

  ${({ theme }) => theme.media.sm} {
    width: 132px;
  }

  ${({ theme }) => theme.media.md} {
    order: -1;
    width: 100%;
    padding: 0;
  }
`

export const Thumb = styled.button<{ $empty: boolean }>`
  ${focusRing};
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  padding: 0;
  border: none;
  border-radius: ${radii.md};
  background: ${({ $empty }) => ($empty ? palette.cream : palette.line)};
  cursor: pointer;
  box-shadow: ${shadows.sm};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${({ theme }) => theme.media.md} {
    aspect-ratio: 4 / 3;
    border-radius: ${radii.lg} ${radii.lg} 0 0;
    box-shadow: none;
  }
`

export const ThumbFallback = styled.span`
  display: grid;
  place-items: center;
  color: ${palette.inkSoft};
  opacity: 0.55;

  svg {
    width: 36px;
    height: 36px;
  }
`

export const ActionSlot = styled.div`
  position: absolute;
  left: 50%;
  bottom: ${spacing.sm};
  z-index: 1;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  width: max-content;
  max-width: calc(100% - ${spacing.sm});

  ${({ theme }) => theme.media.md} {
    bottom: ${spacing.md};
  }
`

export const Wrap = styled.article<{ $unavailable: boolean }>`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: stretch;
  min-width: 0;
  overflow: hidden;
  background: ${palette.white};
  border: 1px solid ${palette.line};
  border-radius: ${radii.lg};
  box-shadow: ${shadows.card};
  opacity: ${({ $unavailable }) => ($unavailable ? 0.55 : 1)};
  ${neoLiftOnHover};

  ${({ theme }) => theme.media.md} {
    grid-template-columns: minmax(0, 1fr);
    box-shadow: ${shadows.md};
  }
`
