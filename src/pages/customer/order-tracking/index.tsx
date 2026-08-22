import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CallWaiterButton } from '@/components/customer/call-waiter'
import { OrderTicket } from '@/components/customer/order-ticket'
import { ReviewForm } from '@/components/customer/review-form'
import { UpiPay } from '@/components/customer/upi-pay'
import { VenueFollow } from '@/components/customer/venue-follow'
import { WaitFacts } from '@/components/customer/wait-facts'
import { WaitGame } from '@/components/customer/wait-game'
import { WaitGamesRow } from '@/components/customer/wait-games-row'
import type { WaitGameId } from '@/components/customer/wait-games-row/helper'
import { WaitSpiceSnap } from '@/components/customer/wait-spice-snap'
import { Button } from '@/components/global/button'
import { EmptyState } from '@/components/global/empty-state'
import { Skeleton } from '@/components/global/skeleton'
import { StatusBadge } from '@/components/global/status-badge'
import { useCustomerContext } from '@/hooks/customer/context'
import { formatMoney } from '@/utils/format'

import { GUEST_STEPS, guestStepState, useOrderTracking } from './helper'
import {
  Actions,
  BadgeSlot,
  Dot,
  Header,
  Hint,
  Kicker,
  Page,
  Rail,
  RateSlot,
  Step,
  StepLabel,
  Timeline,
  Title,
  TitleRow,
} from './styled'

export function OrderTrackingPage() {
  const { t } = useTranslation(['customer', 'common'])
  const { restaurant, slug, tableNumber } = useCustomerContext()
  const {
    query,
    goMenu,
    submitReview,
    reviewSubmitted,
    reviewLoading,
    reviewError,
    canAddMore,
  } = useOrderTracking(slug, tableNumber)
  const order = query.data
  const [activeGame, setActiveGame] = useState<WaitGameId | null>(null)

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
  const waiting =
    order.status === 'PENDING' || order.status === 'ACCEPTED' || order.status === 'PREPARING'
  const tableLabel = order.tableNumber ?? tableNumber

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
        <TitleRow>
          <Title>{t('track.number', { number: order.orderNumber })}</Title>
          {restaurant.waiterCallEnabled && (
            <CallWaiterButton
              slug={slug}
              restaurantId={restaurant.id}
              tableNumber={tableNumber ?? order.tableNumber}
              iconOnly
            />
          )}
        </TitleRow>
        {tableLabel && <Hint>{t('track.table', { table: tableLabel })}</Hint>}
        <BadgeSlot>
          <StatusBadge status={order.status} pulse={order.status !== 'COMPLETED'} />
        </BadgeSlot>
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

      <WaitFacts enabled={waiting} />

      <OrderTicket
        head={
          tableLabel
            ? t('track.ticketHeadTable', { table: tableLabel })
            : t('track.ticketHead')
        }
        lines={order.items.map((item) => ({
          id: item.id,
          label: `${item.quantity} × ${item.nameSnapshot}`,
          amount: formatMoney(item.subtotal, restaurant.currency),
        }))}
        note={order.notes ? t('track.ticketNote', { note: order.notes }) : null}
        discountLabel={order.discount > 0 ? t('cart.discount') : null}
        discountAmount={
          order.discount > 0
            ? `-${formatMoney(order.discount, restaurant.currency)}`
            : null
        }
        totalLabel={t('common:labels.total')}
        totalAmount={formatMoney(order.total, restaurant.currency)}
        stamp={t(`common:status.${order.status}`)}
      />

      <Actions>
        <Button variant={canAddMore ? 'primary' : 'outline'} fullWidth onClick={goMenu}>
          {canAddMore ? t('track.addMore') : t('track.reorder')}
        </Button>
      </Actions>

      {waiting && (
        <>
          <WaitGame
            open={activeGame === 'catch'}
            onOpenChange={(open) => !open && setActiveGame(null)}
            onExit={() => setActiveGame(null)}
          />
          <WaitSpiceSnap
            open={activeGame === 'spice'}
            onOpenChange={(open) => !open && setActiveGame(null)}
            onExit={() => setActiveGame(null)}
          />
        </>
      )}

      {restaurant.upiVpa && order.status !== 'PENDING' && (
        <RateSlot>
          <UpiPay
            vpa={restaurant.upiVpa}
            payeeName={restaurant.upiPayeeName}
            amount={order.total}
            orderNumber={order.orderNumber}
          />
        </RateSlot>
      )}

      <VenueFollow restaurant={restaurant} />

      {waiting && (
        <Actions>
          <WaitGamesRow onPick={setActiveGame} />
        </Actions>
      )}
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
