import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { createPortal } from 'react-dom'
import { useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'

import { IconButton } from '@/components/global/icon-button'

import { useBottomSheetBehavior } from './helper'
import { Body, Grabber, Header, Overlay, Sheet, Title } from './styled'

export interface BottomSheetProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  const { t } = useTranslation('common')
  const sheetRef = useRef<HTMLDivElement>(null)
  const {
    offset,
    dragging,
    resetPosition,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  } = useBottomSheetBehavior(open, onClose)

  if (!open) return null

  const dismiss = () => {
    resetPosition()
    onClose()
  }

  const stop = (event: MouseEvent) => event.stopPropagation()

  return createPortal(
    <Overlay onClick={dismiss} role="dialog" aria-modal="true" aria-label={title}>
      <Sheet
        ref={sheetRef}
        onClick={stop}
        $offset={offset}
        $dragging={dragging}
      >
        <Grabber
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />
        {title && (
          <Header>
            <Title>{title}</Title>
            <IconButton
              label={t('actions.close')}
              icon={<X aria-hidden />}
              size="sm"
              onClick={dismiss}
            />
          </Header>
        )}
        <Body>{children}</Body>
      </Sheet>
    </Overlay>,
    document.body,
  )
}
