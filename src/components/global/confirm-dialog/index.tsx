import type { MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'
import type { ButtonVariant } from '@/components/global/button/styled'

import { useConfirmDialogLayer } from './helper'
import { Actions, Card, Message, Overlay, Title } from './styled'

export interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel: string
  confirmVariant?: ButtonVariant
  loading?: boolean
  onClose: () => void
  onConfirm: () => void
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  confirmVariant = 'danger',
  loading = false,
  onClose,
  onConfirm,
}: ConfirmDialogProps) {
  const { t } = useTranslation('common')
  useConfirmDialogLayer(open, onClose, loading)

  if (!open) return null

  const stop = (event: MouseEvent) => event.stopPropagation()

  return createPortal(
    <Overlay
      onClick={loading ? undefined : onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-message"
    >
      <Card onClick={stop}>
        <Title id="confirm-dialog-title">{title}</Title>
        <Message id="confirm-dialog-message">{message}</Message>
        <Actions>
          <Button type="button" variant="outline" disabled={loading} onClick={onClose}>
            {t('actions.cancel')}
          </Button>
          <Button
            type="button"
            variant={confirmVariant}
            loading={loading}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </Actions>
      </Card>
    </Overlay>,
    document.body,
  )
}
