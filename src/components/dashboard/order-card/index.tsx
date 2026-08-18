import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'
import { StatusBadge } from '@/components/global/status-badge'
import { formatDate, formatMoney, formatTime } from '@/utils/format'
import type { Order, OrderStatus } from '@/types/order'

import { NEXT_LABEL_KEY, nextStatus, orderCardItems } from './helper'
import {
  Actions,
  Card,
  Guest,
  GuestName,
  Item,
  ItemExtras,
  ItemName,
  ItemNotes,
  Items,
  Meta,
  Number,
  Phone,
  TicketNote,
  Top,
  Total,
} from './styled'

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
  const guestName = order.customer?.name?.trim()
  const guestPhone = order.customer?.contactNumber?.trim()

  return (
    <Card $fresh={fresh} $pending={pending}>
      <Top>
        <Number>#{order.orderNumber}</Number>
        <StatusBadge status={order.status} pulse={pending} />
      </Top>
      {(guestName || guestPhone) && (
        <Guest>
          {guestName && <GuestName>{guestName}</GuestName>}
          {guestPhone && <Phone>{guestPhone}</Phone>}
        </Guest>
      )}
      <Meta>
        {[
          order.tableNumber ? `${t('common:labels.table')} ${order.tableNumber}` : null,
          formatDate(order.createdAt),
          formatTime(order.createdAt),
        ]
          .filter(Boolean)
          .join(' · ')}
      </Meta>
      <Items>
        {orderCardItems(order).map((line) => (
          <Item key={line.id}>
            <ItemName>{line.label}</ItemName>
            {line.extras && <ItemExtras>{line.extras}</ItemExtras>}
            {line.notes && <ItemNotes>{line.notes}</ItemNotes>}
          </Item>
        ))}
      </Items>
      {order.notes && (
        <TicketNote>
          {t('orders.ticketNotes')}: {order.notes}
        </TicketNote>
      )}
      <Total>{formatMoney(order.total, currency)}</Total>
      <Actions>
        {pending && (
          <>
            <Button variant="outline" size="sm" disabled={busy} onClick={onReject}>
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
