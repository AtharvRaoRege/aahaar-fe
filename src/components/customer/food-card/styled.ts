import styled, { css } from 'styled-components'

import { focusRing, neoLiftOnHover } from '@/styles/mixins'
import { fontSizes, fontWeights, palette, radii, shadows, spacing } from '@/styles/theme'

export const Tag = styled.span<{ $tone: 'sold' | 'best' }>`
  padding: 2px ${spacing.sm};
  border-radius: ${radii.sm};
  font-size: ${fontSizes.micro};
  font-weight: ${fontWeights.black};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${({ $tone }) => ($tone === 'sold' ? palette.white : palette.ink)};
  background: ${({ $tone }) => ($tone === 'sold' ? palette.chili : palette.mango)};
`

export const MetaRow = styled.div`
  display: flex;
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
`

export const ActionSlot = styled.div<{ $hasImage: boolean }>`
  flex-shrink: 0;
  padding-right: ${({ $hasImage }) => ($hasImage ? spacing.md : '0')};

  ${({ theme }) => theme.media.md} {
    padding-right: 0;
  }
`

export const FootRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.sm};
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

export const ImageButton = styled.button`
  ${focusRing};
  position: relative;
  display: block;
  align-self: stretch;
  width: 104px;
  overflow: hidden;
  background: ${palette.cream};
  border: none;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${({ theme }) => theme.media.sm} {
    width: 124px;
  }

  ${({ theme }) => theme.media.md} {
    order: -1;
    width: 100%;
    aspect-ratio: 4 / 3;
  }
`

/**
 * A dish without a photo does not need a stacked card: the name is one line and
 * the price and Add button can sit beside it. Laying it out as a single row keeps
 * these cards about a third shorter, so more of the menu is on screen — which is
 * the whole point of the phone view.
 */
const compact = css`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  column-gap: ${spacing.md};

  ${FootRow} {
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    gap: ${spacing.xs};
    margin-top: 0;
    padding-top: 0;
  }

  ${PriceBlock} {
    align-items: flex-end;
  }
`

export const Body = styled.div<{ $hasImage: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  /* With a thumb alongside, the grid gap supplies the right inset; without one
     the text would otherwise run to the card edge. */
  padding: ${spacing.md} ${({ $hasImage }) => ($hasImage ? '0' : spacing.md)} ${spacing.md}
    ${spacing.md};
  min-width: 0;

  ${({ $hasImage }) => !$hasImage && compact};

  ${({ theme }) => theme.media.md} {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: ${spacing.lg};
    gap: ${spacing.sm};

    ${FootRow} {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
      padding-top: ${spacing.sm};
    }

    ${PriceBlock} {
      align-items: flex-start;
    }
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.xl};
  }
`

/**
 * One dish, two layouts.
 *
 * On a phone the card runs horizontally — text left, thumb or price right — so
 * more of the menu fits on screen. From the two-column breakpoint up it becomes a
 * vertical card and the photo leads.
 */
export const Wrap = styled.article<{ $unavailable: boolean; $hasImage: boolean }>`
  display: grid;
  grid-template-columns: ${({ $hasImage }) =>
    $hasImage ? 'minmax(0, 1fr) auto' : 'minmax(0, 1fr)'};
  gap: ${({ $hasImage }) => ($hasImage ? spacing.md : '0')};
  min-width: 0;
  overflow: hidden;
  background: ${palette.white};
  border: 1px solid ${palette.line};
  border-radius: ${radii.md};
  box-shadow: ${shadows.card};
  opacity: ${({ $unavailable }) => ($unavailable ? 0.55 : 1)};
  ${neoLiftOnHover};

  ${({ theme }) => theme.media.md} {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    box-shadow: ${shadows.md};
  }
`
