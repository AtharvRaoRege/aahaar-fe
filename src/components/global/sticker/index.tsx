import type { ReactNode } from 'react'

import { StyledSticker } from './styled'
import type { StickerTone } from './styled'

export interface StickerProps {
  tone?: StickerTone
  rotate?: number
  children: ReactNode
}

export function Sticker({ tone = 'mango', rotate = -2, children }: StickerProps) {
  return (
    <StyledSticker $tone={tone} $rotate={rotate}>
      {children}
    </StyledSticker>
  )
}
