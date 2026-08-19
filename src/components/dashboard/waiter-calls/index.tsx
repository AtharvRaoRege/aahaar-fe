import { Bell } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'
import type { WaiterCall } from '@/types/waiter'

import { useWaiterCalls } from './helper'
import { Card, List, Meta, Title } from './styled'

export function WaiterCalls({
  calls,
  busyId,
  onAck,
}: {
  calls: WaiterCall[]
  busyId: string | null | undefined
  onAck: (id: string) => void
}) {
  const { t } = useTranslation('dashboard')
  const { visible } = useWaiterCalls(calls)
  if (!visible.length) return null

  return (
    <List>
      {visible.map((call) => (
        <Card key={call.id}>
          <Bell aria-hidden />
          <div>
            <Title>
              {t('orders.waiterTitle', {
                table: call.tableNumber ?? t('orders.waiterNoTable'),
              })}
            </Title>
            <Meta>{t('orders.waiterHint')}</Meta>
          </div>
          <Button
            size="sm"
            onClick={() => onAck(call.id)}
            loading={busyId === call.id}
          >
            {t('orders.waiterAck')}
          </Button>
        </Card>
      ))}
    </List>
  )
}
