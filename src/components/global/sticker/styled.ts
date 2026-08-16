import styled from 'styled-components'

import { palette, shadows } from '@/styles/theme'

export type StickerTone = 'mango' | 'tomato' | 'violet' | 'white'

const backgrounds: Record<StickerTone, string> = {
  mango: palette.mango,
  tomato: palette.tomato,
  violet: palette.violet,
  white: palette.white,
}

const foregrounds: Record<StickerTone, string> = {
  mango: palette.ink,
  tomato: palette.white,
  violet: palette.ink,
  white: palette.ink,
}

export const StyledSticker = styled.span<{ $tone: StickerTone; $rotate: number }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: ${({ $tone }) => backgrounds[$tone]};
  color: ${({ $tone }) => foregrounds[$tone]};
  border: 3px solid ${palette.ink};
  box-shadow: ${shadows.sm};
  transform: rotate(${({ $rotate }) => $rotate}deg);
  font-size: 0.6875rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;
`
