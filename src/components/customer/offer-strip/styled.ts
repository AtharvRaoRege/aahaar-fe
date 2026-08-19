import styled from 'styled-components'

import { neoPressable } from '@/styles/mixins'
import { fontSizes, fontWeights, palette, radii, shadows, spacing } from '@/styles/theme'

export const Wrap = styled.section`
  display: grid;
  gap: ${spacing.sm};
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

export const Label = styled.h2`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${palette.tomato};
`

export const Rail = styled.div`
  display: flex;
  gap: ${spacing.sm};
  overflow-x: auto;
  padding-bottom: ${spacing.xs};
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.md};
    overflow-x: visible;
    flex-wrap: wrap;
  }
`

export const Chip = styled.button`
  ${neoPressable};
  flex: 0 0 auto;
  scroll-snap-align: start;
  display: grid;
  gap: 2px;
  min-width: 180px;
  max-width: 260px;
  padding: ${spacing.md} ${spacing.lg};
  text-align: left;
  background: ${palette.mangoWash};
  border: 1.5px solid ${palette.mangoDark};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};

  ${({ theme }) => theme.media.md} {
    min-width: 220px;
  }
`

export const ChipTitle = styled.span`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.bold};
  color: ${palette.ink};
  overflow-wrap: anywhere;
`

export const ChipMeta = styled.span`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
`

export const SheetBody = styled.div`
  display: grid;
  gap: ${spacing.md};
`

export const SheetTitle = styled.h3`
  font-size: ${fontSizes.h3};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.02em;
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
  padding: ${spacing.md} ${spacing.lg};
  border: 1.5px dashed ${palette.tomato};
  border-radius: ${radii.md};
  color: ${palette.tomato};
  font-size: ${fontSizes.subheading};
  font-weight: ${fontWeights.black};
  letter-spacing: 0.08em;
  text-align: center;
`

export const CodeHint = styled.span`
  font-size: ${fontSizes.labelSm};
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
