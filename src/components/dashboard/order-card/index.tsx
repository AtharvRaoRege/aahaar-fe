import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'
import { StatusBadge } from '@/components/global/status-badge'
import { formatMoney, formatTime } from '@/utils/format'
import type { Order, OrderStatus } from '@/types/order'

import { itemLines, NEXT_LABEL_KEY, nextStatus } from './helper'
import { Actions, Card, Items, Meta, Number, Top, Total } from './styled'

export interface OrderCardProps {
  order: Order
  currency: string
  fresh?: boolean
  busy?: boolean
  onAccept: () => void
  onReject: () => void
  onAdvance: (status: OrderStatus) => void
}

export function OrderCard({
  order,
  currency,
  fresh,
  busy,
  onAccept,
  onReject,
  onAdvance,
}: OrderCardProps) {
  const { t } = useTranslation(['dashboard', 'common'])
  const next = nextStatus(order.status)
  const nextKey = next ? NEXT_LABEL_KEY[next as keyof typeof NEXT_LABEL_KEY] : undefined
  const pending = order.status === 'PENDING'

  return (
    <Card $fresh={fresh} $pending={pending}>
      <Top>
        <Number>#{order.orderNumber}</Number>
        <StatusBadge status={order.status} pulse={pending} />
      </Top>
      <Meta>
        {[
          order.tableNumber ? `${t('common:labels.table')} ${order.tableNumber}` : null,
          formatTime(order.createdAt),
        ]
          .filter(Boolean)
          .join(' · ')}
      </Meta>
      <Items>
        {itemLines(order).map((line) => (
          <li key={line}>{line}</li>
        ))}
      </Items>
      {order.notes && <Meta>{order.notes}</Meta>}
      <Total>{formatMoney(order.total, currency)}</Total>
      <Actions>
        {pending && (
          <>
            <Button variant="danger" size="sm" disabled={busy} onClick={onReject}>
              {t('orders.reject')}
            </Button>
            <Button size="sm" disabled={busy} onClick={onAccept}>
              {t('orders.accept')}
            </Button>
          </>
        )}
        {next && nextKey && (
          <Button size="sm" disabled={busy} onClick={() => onAdvance(next)}>
            {t(nextKey)}
          </Button>
        )}
      </Actions>
    </Card>
  )
}
