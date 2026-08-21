import { Bell } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'
import { IconButton } from '@/components/global/icon-button'

import { useCallWaiter } from './helper'
import { Note, Wrap } from './styled'

export function CallWaiterButton({
  slug,
  restaurantId,
  tableNumber,
  iconOnly = false,
}: {
  slug: string
  restaurantId: string
  tableNumber: string | null
  /** Compact bell control for tight headers (order tracking). */
  iconOnly?: boolean
}) {
  const { t } = useTranslation('customer')
  const call = useCallWaiter(slug, restaurantId, tableNumber)
  if (!call.show) return null

  const label = call.called ? t('waiter.called') : t('waiter.action')

  return (
    <Wrap $compact={iconOnly}>
      {iconOnly ? (
        <IconButton
          label={label}
          icon={<Bell aria-hidden />}
          size="sm"
          tone={call.called ? 'default' : 'secondary'}
          disabled={call.called || call.busy}
          onClick={call.request}
        />
      ) : (
        <Button
          size="sm"
          variant={call.called ? 'outline' : 'secondary'}
          leftIcon={<Bell aria-hidden />}
          loading={call.busy}
          disabled={call.called}
          onClick={call.request}
        >
          {label}
        </Button>
      )}
      {call.error && <Note>{call.error}</Note>}
    </Wrap>
  )
}
