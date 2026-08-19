import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { OrderCard } from '@/components/dashboard/order-card'
import { WaiterCalls } from '@/components/dashboard/waiter-calls'
import { Button } from '@/components/global/button'
import { EmptyState } from '@/components/global/empty-state'
import { FormField } from '@/components/global/field'
import { SearchInput } from '@/components/global/search-input'
import { Select } from '@/components/global/select'
import { Skeleton } from '@/components/global/skeleton'
import { useDashboardContext } from '@/hooks/dashboard/context'
import type { Restaurant } from '@/types/restaurant'

import { STATUS_FILTERS, WHEN_OPTIONS, useOrdersPage } from './helper'
import type { StatusFilter, WhenKey } from './helper'
import {
  ErrorBanner,
  FilterGrid,
  Grid,
  HeadRow,
  Hint,
  LiveCount,
  OfflineNote,
  Page,
  ResultCount,
  Tab,
  TabCount,
  TabRow,
  Title,
  Toolbar,
} from './styled'

export function OrdersPage() {
  const { restaurant } = useDashboardContext()
  if (!restaurant) return null
  return <OrdersBody restaurant={restaurant} />
}

function OrdersBody({ restaurant }: { restaurant: Restaurant }) {
  const { t } = useTranslation(['dashboard', 'common'])
  const navigate = useNavigate()
  const page = useOrdersPage(restaurant.id)
  const tableOptions = [{ value: '', label: t('orders.tableAll') }, ...page.tableOptions]
  const whenOptions = WHEN_OPTIONS.map((value) => ({
    value,
    label: t(`orders.when.${value}`),
  }))

  return (
    <Page>
      <HeadRow>
        <Title>{t('orders.title')}</Title>
        <LiveCount>
          <strong>{page.liveWork}</strong>
          {t('orders.liveWork')}
        </LiveCount>
      </HeadRow>
      <Hint>{t('orders.hint')}</Hint>
      {page.actionError && (
        <ErrorBanner>{page.actionError || t('orders.actionFailed')}</ErrorBanner>
      )}
      {!page.live && <OfflineNote>{t('orders.offline')}</OfflineNote>}

      <WaiterCalls calls={page.waiterCalls} busyId={page.waiterBusy} onAck={page.ackWaiter} />

      <Toolbar>
        <SearchInput
          value={page.search}
          onChange={page.setSearch}
          placeholder={t('orders.searchPlaceholder')}
        />
        <FilterGrid>
          <FormField label={t('orders.tableFilter')}>
            <Select value={page.table} options={tableOptions} onChange={page.setTable} />
          </FormField>
          <FormField label={t('orders.whenLabel')}>
            <Select
              value={page.when}
              options={whenOptions}
              onChange={(value) => page.setWhen(value as WhenKey)}
            />
          </FormField>
          {page.hasFilters && (
            <Button size="sm" variant="ghost" onClick={page.clearFilters}>
              {t('orders.clearFilters')}
            </Button>
          )}
        </FilterGrid>
      </Toolbar>

      <TabRow role="tablist" aria-label={t('orders.statusFilterLabel')}>
        {STATUS_FILTERS.map((value) => {
          const active = page.status === value
          return (
            <Tab
              key={value}
              type="button"
              role="tab"
              aria-selected={active}
              $active={active}
              onClick={() => page.setStatus(value as StatusFilter)}
            >
              {t(`orders.statusFilter.${value}`)}
              <TabCount $active={active}>{page.counts[value]}</TabCount>
            </Tab>
          )
        })}
      </TabRow>

      {page.query.isSuccess && page.orders.length > 0 && (
        <ResultCount>{t('orders.showing', { count: page.total })}</ResultCount>
      )}

      {page.query.isLoading && (
        <Grid>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} height="200px" />
          ))}
        </Grid>
      )}

      {page.query.isSuccess && page.orders.length === 0 && (
        <EmptyState
          emoji="🛎️"
          title={page.hasFilters ? t('orders.emptyFiltered') : t('orders.empty')}
          hint={page.hasFilters ? t('orders.emptyFilteredHint') : t('orders.emptyHint')}
          action={
            page.hasFilters ? (
              <Button onClick={page.clearFilters}>{t('orders.clearFilters')}</Button>
            ) : (
              <Button onClick={() => navigate('/dashboard/qr')}>
                {t('orders.emptyAction')}
              </Button>
            )
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
            onAdvance={() => page.advanceStage(order)}
          />
        ))}
      </Grid>
    </Page>
  )
}
