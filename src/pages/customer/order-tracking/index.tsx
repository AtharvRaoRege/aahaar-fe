import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CallWaiterButton } from '@/components/customer/call-waiter'
import { ReviewForm } from '@/components/customer/review-form'
import { UpiPay } from '@/components/customer/upi-pay'
import { WaitFacts } from '@/components/customer/wait-facts'
import { WaitGame } from '@/components/customer/wait-game'
import { shouldAutoOpenWaitGame } from '@/components/customer/wait-game/helper'
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
  Ticket,
  TicketHead,
  TicketNote,
  TicketRow,
  TicketStamp,
  TicketTotal,
  Timeline,
  Title,
  TitleRow,
} from './styled'

export function OrderTrackingPage() {
  const { t } = useTranslation(['customer', 'common'])
  const { restaurant, slug, tableNumber } = useCustomerContext()
  const {
    query,
    orderId,
    goMenu,
    submitReview,
    reviewSubmitted,
    reviewLoading,
    reviewError,
    canAddMore,
  } = useOrderTracking(slug, tableNumber)
  const order = query.data
  const [gameOpen, setGameOpen] = useState(() =>
    orderId ? shouldAutoOpenWaitGame(orderId) : false,
  )

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

      <Ticket>
        <TicketHead>
          {tableLabel
            ? t('track.ticketHeadTable', { table: tableLabel })
            : t('track.ticketHead')}
        </TicketHead>
        {order.items.map((item) => (
          <TicketRow key={item.id}>
            <span>
              {item.quantity} × {item.nameSnapshot}
            </span>
            <span>{formatMoney(item.subtotal, restaurant.currency)}</span>
          </TicketRow>
        ))}
        {order.notes && (
          <TicketNote>
            {t('track.ticketNote', { note: order.notes })}
          </TicketNote>
        )}
        {order.discount > 0 && (
          <TicketRow>
            <span>{t('cart.discount')}</span>
            <span>-{formatMoney(order.discount, restaurant.currency)}</span>
          </TicketRow>
        )}
        <TicketTotal>
          <span>{t('common:labels.total')}</span>
          <span>{formatMoney(order.total, restaurant.currency)}</span>
        </TicketTotal>
        <TicketStamp>{t(`common:status.${order.status}`)}</TicketStamp>
      </Ticket>

      {waiting && (
        <WaitGame
          open={gameOpen}
          onOpenChange={setGameOpen}
          onExit={() => setGameOpen(false)}
        />
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

      <Actions>
        {waiting && (
          <Button variant="outline" fullWidth onClick={() => setGameOpen(true)}>
            {t('game.playWhileWait')}
          </Button>
        )}
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
