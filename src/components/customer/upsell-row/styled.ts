import styled from 'styled-components'

import { neoPressable } from '@/styles/mixins'
import { fontSizes, fontWeights, palette, radii, shadows, spacing } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export const Wrap = styled.section`
  display: grid;
  gap: ${spacing.sm};
  padding: 0 ${spacing.lg};

  ${({ theme }) => theme.media.sm} {
    padding: 0 ${spacing.xl};
  }
`

export const Label = styled.h2`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${brandVar.accentText};
`

export const Rail = styled.div`
  display: flex;
  gap: ${spacing.sm};
  overflow-x: auto;
  padding-bottom: ${spacing.xs};

  &::-webkit-scrollbar {
    display: none;
  }

  ${({ theme }) => theme.media.md} {
    overflow-x: visible;
    flex-wrap: wrap;
    gap: ${spacing.md};
  }
`

export const Suggestion = styled.button`
  ${neoPressable};
  flex: 0 0 auto;
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  align-items: center;
  gap: ${spacing.sm};
  min-width: 200px;
  padding: ${spacing.sm} ${spacing.md};
  text-align: left;
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};
`

export const Thumb = styled.img`
  width: 44px;
  height: 44px;
  object-fit: cover;
  border-radius: ${radii.sm};
`

export const ThumbFallback = styled.span`
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: ${radii.sm};
  background: ${palette.mangoWash};
  font-size: ${fontSizes.label};
`

export const Info = styled.span`
  display: grid;
  gap: 2px;
  min-width: 0;
`

export const Name = styled.span`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.bold};
  overflow-wrap: anywhere;
`

export const Price = styled.span`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
`
