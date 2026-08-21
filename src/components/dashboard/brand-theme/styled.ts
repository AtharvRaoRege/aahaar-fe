import styled, { css } from 'styled-components'

import type { BrandPalette } from '@/utils/theme/brand-palette'
import { brandCssVars } from '@/utils/theme/brand-palette'
import {
  fontFamily,
  fontSizes,
  fontWeights,
  palette,
  radii,
  shadows,
  spacing,
} from '@/styles/theme'

export const Card = styled.section`
  display: grid;
  gap: ${spacing.lg};
  padding: ${spacing['2xl']};
  background: ${palette.white};
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};
`

export const CardTitle = styled.h2`
  margin: 0;
  font-size: ${fontSizes.h3};
  font-weight: ${fontWeights.bold};
  letter-spacing: -0.02em;
  color: ${palette.ink};
  font-family: ${fontFamily.body};
`

export const CardHint = styled.p`
  margin: 0;
  font-size: ${fontSizes.label};
  color: ${palette.inkSoft};
  line-height: 1.45;
`

export const Controls = styled.div`
  display: grid;
  gap: ${spacing.md};

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: auto 1fr;
    align-items: end;
  }
`

export const PickerField = styled.label`
  display: grid;
  gap: ${spacing.xs};
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
`

export const PickerRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`

export const ColorInput = styled.input`
  width: 48px;
  height: 48px;
  padding: 0;
  border: 1.5px solid ${palette.line};
  border-radius: ${radii.sm};
  background: ${palette.cream};
  cursor: pointer;

  &::-webkit-color-swatch-wrapper {
    padding: 3px;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: ${radii.sm};
  }
`

export const HexField = styled.input<{ $invalid?: boolean }>`
  min-width: 0;
  flex: 1;
  min-height: 48px;
  padding: 0 ${spacing.md};
  border: 1.5px solid ${({ $invalid }) => ($invalid ? palette.chili : palette.line)};
  border-radius: ${radii.sm};
  background: ${palette.cream};
  color: ${palette.ink};
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.body};
  font-weight: ${fontWeights.medium};
  letter-spacing: 0.02em;
  text-transform: uppercase;

  &:focus {
    outline: 2px solid ${palette.ink};
    outline-offset: 1px;
  }
`

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
`

export const Notice = styled.p<{ $tone: 'ok' | 'bad' }>`
  margin: 0;
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${({ $tone }) => ($tone === 'ok' ? palette.chutney : palette.chili)};
`

export const Preview = styled.div<{ $brand: BrandPalette }>`
  display: grid;
  gap: ${spacing.md};
  padding: ${spacing.lg};
  border-radius: ${radii.md};
  border: 1.5px solid ${palette.line};
  background: ${palette.cream};
  ${({ $brand }) => css`
    ${Object.entries(brandCssVars($brand))
      .map(([key, value]) => `${key}: ${value};`)
      .join('')}
  `}
`

export const PreviewLabel = styled.p`
  margin: 0;
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
`

export const PreviewRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${spacing.sm};
`

export const PreviewButton = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 ${spacing.lg};
  border-radius: ${radii.md};
  border: 1.5px solid var(--brand-primary);
  background: var(--brand-primary);
  color: var(--brand-on-primary);
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.bold};
  font-family: ${fontFamily.body};
`

export const PreviewGhost = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 ${spacing.lg};
  border-radius: ${radii.md};
  border: 1.5px solid var(--brand-border);
  background: var(--brand-surface-tint);
  color: ${palette.ink};
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.bold};
  font-family: ${fontFamily.body};
`

export const PreviewTag = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 ${spacing.sm};
  border-radius: ${radii.full};
  background: var(--brand-surface-tint);
  color: ${palette.ink};
  border: 1px solid var(--brand-border);
  font-size: ${fontSizes.micro};
  font-weight: ${fontWeights.bold};
  font-family: ${fontFamily.body};
  letter-spacing: 0.04em;
  text-transform: uppercase;
`

export const PreviewCard = styled.div`
  display: grid;
  gap: ${spacing.xs};
  padding: ${spacing.md};
  border-radius: ${radii.sm};
  background: ${palette.white};
  border: 1.5px solid var(--brand-border);
`

export const PreviewCardTitle = styled.strong`
  font-size: ${fontSizes.label};
  color: var(--brand-accent-text, ${palette.tomato});
  font-family: ${fontFamily.body};
`

export const PreviewCardMeta = styled.span`
  font-size: ${fontSizes.labelSm};
  color: ${palette.inkSoft};
  font-family: ${fontFamily.body};
`

export const SwatchRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
`

export const Swatch = styled.div<{ $bg: string; $fg?: string }>`
  display: grid;
  place-items: center;
  min-width: 72px;
  min-height: 44px;
  padding: 0 ${spacing.sm};
  border-radius: ${radii.sm};
  background: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg ?? palette.ink};
  border: 1px solid ${palette.line};
  font-size: ${fontSizes.micro};
  font-weight: ${fontWeights.bold};
  font-family: ${fontFamily.body};
`

export const ContrastNote = styled.p`
  margin: 0;
  font-size: ${fontSizes.labelSm};
  color: ${palette.inkSoft};
`
