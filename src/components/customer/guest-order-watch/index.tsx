import { CircleAlert, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useGuestOrderWatch } from './helper'
import { Body, Copy, Dismiss, IconBubble, Title, Toast } from './styled'

export interface GuestOrderWatchProps {
  restaurantId: string
  slug: string
  tableNumber: string | null
}

export function GuestOrderWatch({ restaurantId, slug, tableNumber }: GuestOrderWatchProps) {
  const { t } = useTranslation(['customer', 'common'])
  const { notice, dismiss } = useGuestOrderWatch(restaurantId, slug, tableNumber)

  if (!notice) return null

  return (
    <Toast role="status">
      <IconBubble>
        <CircleAlert aria-hidden />
      </IconBubble>
      <Copy>
        <Title>{t('track.rejected')}</Title>
        <Body>{t('track.rejectedHint')}</Body>
      </Copy>
      <Dismiss type="button" aria-label={t('common:actions.close')} onClick={dismiss}>
        <X aria-hidden />
      </Dismiss>
    </Toast>
  )
}
