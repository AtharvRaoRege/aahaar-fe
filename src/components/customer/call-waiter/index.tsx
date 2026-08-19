import { Bell } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'

import { useCallWaiter } from './helper'
import { Note, Wrap } from './styled'

export function CallWaiterButton({
  slug,
  restaurantId,
  tableNumber,
}: {
  slug: string
  restaurantId: string
  tableNumber: string | null
}) {
  const { t } = useTranslation('customer')
  const call = useCallWaiter(slug, restaurantId, tableNumber)
  if (!call.show) return null

  return (
    <Wrap>
      <Button
        size="sm"
        variant={call.called ? 'outline' : 'secondary'}
        leftIcon={<Bell aria-hidden />}
        loading={call.busy}
        disabled={call.called}
        onClick={call.request}
      >
        {call.called ? t('waiter.called') : t('waiter.action')}
      </Button>
      {call.error && <Note>{call.error}</Note>}
    </Wrap>
  )
}
