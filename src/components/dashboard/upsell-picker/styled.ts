import styled from 'styled-components'

import { fontSizes, fontWeights, palette, radii, spacing } from '@/styles/theme'

export const Wrap = styled.div`
  display: grid;
  gap: ${spacing.sm};
  padding-top: ${spacing.md};
  border-top: 1px solid ${palette.line};
`

export const Label = styled.h3`
  font-size: ${fontSizes.label};
  font-weight: ${fontWeights.bold};
`

export const Hint = styled.p`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.medium};
  color: ${palette.inkSoft};
  line-height: 1.4;
`

export const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
  max-height: 200px;
  overflow-y: auto;
`

export const Option = styled.button<{ $on: boolean; $muted: boolean }>`
  padding: ${spacing.xs} ${spacing.md};
  border-radius: ${radii.full};
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  border: 1.5px solid ${({ $on }) => ($on ? palette.chutney : palette.line)};
  background: ${({ $on }) => ($on ? palette.chutney : palette.white)};
  color: ${({ $on }) => ($on ? palette.white : palette.ink)};
  opacity: ${({ $muted, $on }) => ($muted && !$on ? 0.45 : 1)};
`

export const Notice = styled.p<{ $tone: 'ok' | 'bad' }>`
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  color: ${({ $tone }) => ($tone === 'ok' ? palette.chutney : palette.chili)};
`
