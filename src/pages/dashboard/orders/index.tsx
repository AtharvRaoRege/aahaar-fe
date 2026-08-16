import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { OrderCard } from '@/components/dashboard/order-card'
import { Button } from '@/components/global/button'
import { EmptyState } from '@/components/global/empty-state'
import { Skeleton } from '@/components/global/skeleton'
import { useDashboardContext } from '@/hooks/dashboard/context'
import type { Restaurant } from '@/types/restaurant'

import { useOrdersPage } from './helper'
import { ErrorBanner, FilterBtn, Filters, Grid, Hint, Page, Stat, Stats, Title } from './styled'

export function OrdersPage() {
  const { restaurant } = useDashboardContext()
  if (!restaurant) return null
  return <OrdersBody restaurant={restaurant} />
}

function OrdersBody({ restaurant }: { restaurant: Restaurant }) {
  const { t } = useTranslation(['dashboard', 'common'])
  const navigate = useNavigate()
  const page = useOrdersPage(restaurant.id)

  return (
    <Page>
      <Title>{t('orders.title')}</Title>
      <Hint>{t('orders.hint')}</Hint>
      {page.actionError && (
        <ErrorBanner>{page.actionError || t('orders.actionFailed')}</ErrorBanner>
      )}
      <Stats>
        <Stat>
          <strong>{page.stats.active}</strong>
          <span>{t('orders.stats.active')}</span>
        </Stat>
        <Stat>
          <strong>{page.stats.pending}</strong>
          <span>{t('orders.stats.pending')}</span>
        </Stat>
        <Stat>
          <strong>{page.stats.preparing}</strong>
          <span>{t('orders.stats.preparing')}</span>
        </Stat>
        <Stat>
          <strong>{page.stats.today}</strong>
          <span>{t('orders.stats.today')}</span>
        </Stat>
      </Stats>

      <Filters>
        <FilterBtn
          type="button"
          $active={page.filter === 'active'}
          onClick={() => page.setFilter('active')}
        >
          {t('orders.active')}
        </FilterBtn>
        <FilterBtn
          type="button"
          $active={page.filter === 'all'}
          onClick={() => page.setFilter('all')}
        >
          {t('orders.all')}
        </FilterBtn>
      </Filters>

      {page.query.isLoading && (
        <Grid>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} height="220px" />
          ))}
        </Grid>
      )}

      {page.query.isSuccess && page.orders.length === 0 && (
        <EmptyState
          emoji="🛎️"
          title={t('orders.empty')}
          hint={t('orders.emptyHint')}
          action={
            <Button onClick={() => navigate('/dashboard/qr')}>{t('orders.emptyAction')}</Button>
          }
        />
      )}

      <Grid>
        {page.orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            currency={restaurant.currency}
            fresh={page.freshIds.has(order.id)}
            busy={page.busyIds.has(order.id)}
            onAccept={() => page.accept(order.id)}
            onReject={() => page.reject(order.id)}
            onAdvance={(status) => page.advance(order.id, status)}
          />
        ))}
      </Grid>
    </Page>
  )
}
