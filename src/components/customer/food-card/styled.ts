import styled from 'styled-components'

import { neoLiftOnHover } from '@/styles/mixins'
import { fontSizes, palette, radii, shadows, spacing } from '@/styles/theme'

export const Wrap = styled.article<{ $unavailable: boolean; $hasImage: boolean; $veg: boolean }>`
  position: relative;
  display: flex;
  flex-direction: ${({ $hasImage }) => ($hasImage ? 'column' : 'row')};
  align-items: ${({ $hasImage }) => ($hasImage ? 'stretch' : 'center')};
  min-width: 0;
  overflow: hidden;
  background: ${({ $veg }) => ($veg ? palette.vegWash : palette.chiliWash)};
  border: 1px solid ${palette.line};
  border-radius: ${radii.md};
  box-shadow: ${shadows.card};
  opacity: ${({ $unavailable }) => ($unavailable ? 0.6 : 1)};
  ${neoLiftOnHover};

  ${({ theme }) => theme.media.sm} {
    box-shadow: ${shadows.card};
  }

  ${({ theme }) => theme.media.md} {
    box-shadow: ${shadows.md};
  }

  ${({ theme }) => theme.media.lg} {
    box-shadow: ${shadows.md};
  }

  ${({ theme }) => theme.media.xl} {
    box-shadow: ${shadows.md};
  }
`

export const ImageButton = styled.button`
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: ${palette.cream};
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${({ theme }) => theme.media.sm} {
    aspect-ratio: 16 / 10;
  }

  ${({ theme }) => theme.media.md} {
    aspect-ratio: 4 / 3;
  }

  ${({ theme }) => theme.media.lg} {
    aspect-ratio: 4 / 3;
  }

  ${({ theme }) => theme.media.xl} {
    aspect-ratio: 4 / 3;
  }
`

export const SoldOut = styled.span`
  position: absolute;
  top: ${spacing.sm};
  left: ${spacing.sm};
  z-index: 1;
  padding: ${spacing.xs} ${spacing.sm};
  background: ${palette.chili};
  color: ${palette.white};
  border-radius: ${radii.sm};
  font-size: ${fontSizes.labelSm};
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`

export const Bestseller = styled.span`
  position: absolute;
  top: ${spacing.sm};
  right: ${spacing.sm};
  z-index: 1;
  padding: ${spacing.xs} ${spacing.sm};
  background: ${palette.mango};
  color: ${palette.ink};
  border-radius: ${radii.sm};
  font-size: ${fontSizes.labelSm};
  font-weight: 800;
  letter-spacing: 0.02em;

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.xs} ${spacing.sm};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.xs} ${spacing.md};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.xs} ${spacing.md};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.xs} ${spacing.md};
  }
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  padding: ${spacing.md};
  flex: 1;
  min-width: 0;

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.lg};
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.lg};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.xl};
  }
`

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`

export const Spice = styled.span`
  font-size: ${fontSizes.labelSm};
`

export const Name = styled.span`
  display: block;
  margin: 0;
  font-size: ${fontSizes.body};
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  text-align: left;
  color: ${palette.ink};
`

export const Desc = styled.p`
  margin: 0;
  font-size: ${fontSizes.label};
  font-weight: 500;
  color: ${palette.inkSoft};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: left;
`

export const FootRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.sm};
  margin-top: auto;
  padding-top: ${spacing.sm};
`

export const Price = styled.span`
  font-size: ${fontSizes.subheading};
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${palette.ink};
`

export const PriceBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  min-width: 0;
`

export const CustomTag = styled.span`
  font-size: ${fontSizes.labelSm};
  font-weight: 600;
  color: ${palette.inkSoft};
`

export const TitleHit = styled.button`
  display: grid;
  gap: ${spacing.xs};
  min-width: 0;
  padding: 0;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
`
