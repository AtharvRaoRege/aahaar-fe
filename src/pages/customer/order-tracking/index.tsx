import { useTranslation } from 'react-i18next'

import { ReviewForm } from '@/components/customer/review-form'
import { Button } from '@/components/global/button'
import { EmptyState } from '@/components/global/empty-state'
import { Skeleton } from '@/components/global/skeleton'
import { StatusBadge } from '@/components/global/status-badge'
import { useCustomerContext } from '@/hooks/customer/context'
import { formatMoney } from '@/utils/format'

import { GUEST_STEPS, guestStepState, useOrderTracking } from './helper'
import {
  Dot,
  Header,
  Hint,
  ItemRow,
  Kicker,
  Page,
  Rail,
  Step,
  StepLabel,
  Summary,
  Timeline,
  Title,
  TotalRow,
  RateSlot,
  Actions,
} from './styled'

export function OrderTrackingPage() {
  const { t } = useTranslation(['customer', 'common'])
  const { restaurant, slug, tableNumber } = useCustomerContext()
  const { query, goMenu, submitReview, reviewSubmitted, reviewLoading, reviewError, canAddMore } =
    useOrderTracking(slug, tableNumber)
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

  if (rejected) {
    return (
      <Page>
        <EmptyState
          emoji="😔"
          title={t('track.rejected')}
          hint={t('track.rejectedHint')}
          action={<Button onClick={goMenu}>{t('track.reorder')}</Button>}
        />
      </Page>
    )
  }

  return (
    <Page>
      <Header>
        <Kicker>{t('track.title')}</Kicker>
        <Title>{t('track.number', { number: order.orderNumber })}</Title>
        {order.tableNumber && <Hint>{t('track.table', { table: order.tableNumber })}</Hint>}
        <StatusBadge status={order.status} pulse={order.status !== 'COMPLETED'} />
        <Hint>{t('track.liveHint')}</Hint>
      </Header>

      <Timeline>
        {GUEST_STEPS.map((step, index) => {
          const state = guestStepState(order.status, step.id)
          return (
            <Step key={step.id} $state={state}>
              <Dot $state={state} aria-hidden />
              {index < GUEST_STEPS.length - 1 && <Rail $done={state === 'done'} />}
              <StepLabel>{t(`track.steps.${step.id}`)}</StepLabel>
            </Step>
          )
        })}
      </Timeline>

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

      <Actions>
        <Button variant={canAddMore ? 'primary' : 'outline'} fullWidth onClick={goMenu}>
          {canAddMore ? t('track.addMore') : t('track.reorder')}
        </Button>
      </Actions>
      {order.status === 'COMPLETED' && (
        <RateSlot>
          <ReviewForm
            submitted={reviewSubmitted}
            loading={reviewLoading}
            error={reviewError}
            onSubmit={submitReview}
          />
        </RateSlot>
      )}
    </Page>
  )
}
