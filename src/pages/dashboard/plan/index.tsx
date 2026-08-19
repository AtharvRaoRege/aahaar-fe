import { createPortal } from 'react-dom'
import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { PageSkeleton } from '@/components/global/page-skeleton'
import { Button } from '@/components/global/button'
import { TextArea } from '@/components/global/field'
import { Skeleton } from '@/components/global/skeleton'
import { useDashboardContext } from '@/hooks/dashboard/context'
import type { PlanSpec, Subscription } from '@/types/subscription'
import type { Restaurant } from '@/types/restaurant'

import { trialLabel, usePlanPage } from './helper'
import {
  DangerRow,
  FeatureItem,
  FeatureList,
  Hint,
  Meta,
  Modal,
  ModalActions,
  ModalTitle,
  Notice,
  Overlay,
  Page,
  PlanCard,
  PlanGrid,
  PlanHead,
  PlanTitle,
  Price,
  PriceUnit,
  SelectedMark,
  Title,
} from './styled'

export function PlanPage() {
  const { restaurant } = useDashboardContext()
  if (!restaurant) return <PageSkeleton cards={2} />
  return <PlanBody restaurant={restaurant} />
}

function PlanBody({ restaurant }: { restaurant: Restaurant }) {
  const { t } = useTranslation(['dashboard', 'common'])
  const page = usePlanPage(restaurant.id)

  if (page.isLoading || !page.subscription) {
    return (
      <Page>
        <Title>{t('plan.title')}</Title>
        <Hint>{t('plan.hint')}</Hint>
        <Skeleton height="180px" />
      </Page>
    )
  }

  const subscription = page.subscription

  return (
    <Page>
      <Title>{t('plan.title')}</Title>
      <Hint>{t('plan.hint')}</Hint>

      {page.error && <Notice $tone="bad">{page.error}</Notice>}
      {subscription.pendingPlan && <Notice $tone="warn">{t('plan.pendingBody')}</Notice>}
      {subscription.scheduledPlan && (
        <Notice $tone="warn">
          {t('plan.scheduledDowngrade', { plan: subscription.scheduledPlan })}
        </Notice>
      )}
      {subscription.cancelAtPeriodEnd && !subscription.scheduledPlan && (
        <Notice $tone="warn">{t('plan.cancelScheduled')}</Notice>
      )}

      <PlanGrid>
        {page.plans.map((spec) => (
          <PlanCardView
            key={spec.tier}
            spec={spec}
            subscription={subscription}
            busy={page.busy}
            onSelect={() => page.selectPlan(spec.tier)}
          />
        ))}
      </PlanGrid>

      <DangerRow>
        {subscription.cancelAtPeriodEnd || subscription.status === 'CANCELLED' ? (
          <Button variant="outline" onClick={page.resumeSubscription} loading={page.busy}>
            {t('plan.resume')}
          </Button>
        ) : (
          <Button variant="outline" onClick={page.openCancel}>
            {t('plan.cancelPlan')}
          </Button>
        )}
      </DangerRow>

      {page.cancelOpen &&
        createPortal(
          <Overlay onClick={page.closeCancel} role="presentation">
            <Modal
              role="dialog"
              aria-modal="true"
              aria-labelledby="cancel-plan-title"
              onClick={(event) => event.stopPropagation()}
            >
              <ModalTitle id="cancel-plan-title">{t('plan.cancelTitle')}</ModalTitle>
              <Meta>{t('plan.cancelBody')}</Meta>
              <TextArea
                label={t('plan.cancelReason')}
                value={page.cancelReason}
                onChange={(event) => page.setCancelReason(event.target.value)}
              />
              <ModalActions>
                <Button variant="outline" onClick={page.closeCancel}>
                  {t('common:actions.cancel')}
                </Button>
                <Button onClick={page.confirmCancel} loading={page.busy}>
                  {t('plan.confirmCancel')}
                </Button>
              </ModalActions>
            </Modal>
          </Overlay>,
          document.body,
        )}
    </Page>
  )
}

function PlanCardView({
  spec,
  subscription,
  busy,
  onSelect,
}: {
  spec: PlanSpec
  subscription: Subscription
  busy: boolean
  onSelect: () => void
}) {
  const { t } = useTranslation(['dashboard', 'common'])
  const isCurrent = subscription.plan === spec.tier
  const isPro = spec.tier === 'PRO'
  const trial = trialLabel(spec)
  const pendingThis = subscription.pendingPlan === spec.tier

  return (
    <PlanCard $current={isCurrent} $featured={isPro}>
      <PlanHead>
        <PlanTitle>{spec.tier}</PlanTitle>
        {isCurrent && (
          <SelectedMark aria-label={t('plan.currentBadge')}>
            <Check aria-hidden />
          </SelectedMark>
        )}
      </PlanHead>
      <Price>
        ₹{spec.monthlyPrice.toLocaleString('en-IN')}
        <PriceUnit>{t('plan.perMonth')}</PriceUnit>
      </Price>
      <Meta>{t(`plan.${trial.key}`, { count: trial.count })}</Meta>
      <Meta>
        {spec.tableLimit === null
          ? t('plan.tablesUnlimited')
          : t('plan.tablesUpTo', { count: spec.tableLimit })}
      </Meta>
      <FeatureList>
        {isPro && (
          <FeatureItem>
            <Check aria-hidden />
            <strong>{t('plan.basicIncludes')}</strong>
          </FeatureItem>
        )}
        {spec.includes.map((key) => (
          <FeatureItem key={key}>
            <Check aria-hidden />
            {t(`plan.features.${key}`)}
          </FeatureItem>
        ))}
      </FeatureList>
      {!isCurrent && !pendingThis && (
        <Button onClick={onSelect} loading={busy} variant={isPro ? 'primary' : 'outline'}>
          {isPro ? t('plan.upgrade') : t('plan.downgrade')}
        </Button>
      )}
      {pendingThis && (
        <Button disabled variant="outline">
          {t('plan.pendingPro')}
        </Button>
      )}
      {isCurrent && subscription.scheduledPlan && (
        <Button onClick={onSelect} loading={busy} variant="outline">
          {t('plan.keepPro')}
        </Button>
      )}
    </PlanCard>
  )
}
