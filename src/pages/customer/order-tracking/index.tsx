import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'
import { EmptyState } from '@/components/global/empty-state'
import { Skeleton } from '@/components/global/skeleton'
import { StatusBadge } from '@/components/global/status-badge'
import { useCustomerContext } from '@/hooks/customer/context'
import { formatMoney } from '@/utils/format'

import { stepState, TRACK_STEPS, useOrderTracking } from './helper'
import {
  Dot,
  Header,
  Hint,
  ItemRow,
  Kicker,
  Page,
  Rejected,
  Step,
  Summary,
  Timeline,
  Title,
  TotalRow,
} from './styled'

export function OrderTrackingPage() {
  const { t } = useTranslation(['customer', 'common'])
  const { restaurant, slug, tableNumber } = useCustomerContext()
  const { query, goMenu } = useOrderTracking(slug, tableNumber)
  const order = query.data

  if (query.isLoading) {
    return (
      <Page>
        <Skeleton height="80px" />
        <Skeleton height="220px" />
      </Page>
    )
  }

  if (query.isError || !order) {
    return (
      <Page>
        <EmptyState
          emoji="🧾"
          title={t('common:states.error')}
          action={<Button onClick={goMenu}>{t('track.reorder')}</Button>}
        />
      </Page>
    )
  }

  const rejected = order.status === 'REJECTED' || order.status === 'CANCELLED'

  return (
    <Page>
      <Header>
        <Kicker>{t('track.title')}</Kicker>
        <Title>{t('track.number', { number: order.orderNumber })}</Title>
        {order.tableNumber && (
          <Hint>{t('track.table', { table: order.tableNumber })}</Hint>
        )}
        <StatusBadge status={order.status} pulse={!rejected && order.status !== 'COMPLETED'} />
        {!rejected && <Hint>{t('track.liveHint')}</Hint>}
      </Header>

      {rejected ? (
        <Rejected>{t('track.rejected')}</Rejected>
      ) : (
        <Timeline>
          {TRACK_STEPS.map((step) => {
            const state = stepState(order.status, step)
            return (
              <Step key={step} $state={state}>
                <Dot $state={state} aria-hidden />
                <span>{t(`common:status.${step}`)}</span>
              </Step>
            )
          })}
        </Timeline>
      )}

      <Summary>
        {order.items.map((item) => (
          <ItemRow key={item.id}>
            <span>
              {item.quantity} × {item.nameSnapshot}
            </span>
            <span>{formatMoney(item.subtotal, restaurant.currency)}</span>
          </ItemRow>
        ))}
        <TotalRow>
          <span>{t('common:labels.total')}</span>
          <span>{formatMoney(order.total, restaurant.currency)}</span>
        </TotalRow>
      </Summary>

      <Button variant="outline" fullWidth onClick={goMenu}>
        {t('track.reorder')}
      </Button>
    </Page>
  )
}
