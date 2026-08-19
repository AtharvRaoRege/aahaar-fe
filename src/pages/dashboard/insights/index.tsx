import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ReviewsPanel } from '@/components/dashboard/reviews-panel'
import { PageSkeleton } from '@/components/global/page-skeleton'
import { Button } from '@/components/global/button'
import { EmptyState } from '@/components/global/empty-state'
import { Skeleton } from '@/components/global/skeleton'
import { useDashboardContext } from '@/hooks/dashboard/context'
import type { DishRow, NamedCount } from '@/types/analytics'
import type { Restaurant } from '@/types/restaurant'

import {
  RANGE_LABEL_KEY,
  RANGE_OPTIONS,
  VERDICT_TONE,
  formatHour,
  formatMoney,
  useInsightsPage,
} from './helper'
import {
  CardGrid,
  DishList,
  DishMain,
  DishMeta,
  DishName,
  DishNumbers,
  DishRowItem,
  DishUnits,
  Hint,
  ListCard,
  ListCount,
  ListName,
  ListRow,
  ListTitle,
  Page,
  ProActions,
  ProBody,
  ProCard,
  ProTitle,
  RangeRow,
  SavingsBody,
  SavingsCard,
  SavingsHeadline,
  SavingsKey,
  SavingsRow,
  SavingsRows,
  SavingsTitle,
  SavingsValue,
  SectionLabel,
  Tile,
  TileGrid,
  TileLabel,
  TileValue,
  Title,
  VerdictPill,
} from './styled'

export function InsightsPage() {
  const { restaurant } = useDashboardContext()
  if (!restaurant) return <PageSkeleton cards={4} />
  return <InsightsBody restaurant={restaurant} />
}

function InsightsBody({ restaurant }: { restaurant: Restaurant }) {
  const { t } = useTranslation(['dashboard', 'common'])
  const page = useInsightsPage(restaurant.id)
  const summary = page.summary

  return (
    <Page>
      <Title>{t('insights.title')}</Title>
      <Hint>{t('insights.hint')}</Hint>

      <RangeRow>
        {RANGE_OPTIONS.map((days) => (
          <Button
            key={days}
            size="sm"
            variant={page.rangeDays === days ? 'primary' : 'outline'}
            onClick={() => page.setRangeDays(days)}
          >
            {t(`insights.${RANGE_LABEL_KEY[days]}`)}
          </Button>
        ))}
      </RangeRow>

      {page.isLoading && <Skeleton height="200px" />}

      {!page.isLoading && summary && !page.hasActivity && (
        <EmptyState emoji="◔" title={t('insights.empty')} hint={t('insights.emptyHint')} />
      )}

      {summary && page.hasActivity && (
        <>
          <TileGrid>
            <Tile>
              <TileValue>{summary.qrScans}</TileValue>
              <TileLabel>{t('insights.scans')}</TileLabel>
            </Tile>
            <Tile>
              <TileValue>{summary.menuViews}</TileValue>
              <TileLabel>{t('insights.menuViews')}</TileLabel>
            </Tile>
            <Tile>
              <TileValue>{summary.ordersPlaced}</TileValue>
              <TileLabel>{t('insights.ordersPlaced')}</TileLabel>
            </Tile>
            <Tile>
              <TileValue>{summary.ordersCompleted}</TileValue>
              <TileLabel>{t('insights.ordersCompleted')}</TileLabel>
            </Tile>
          </TileGrid>

          {summary.isPro && (
            <TileGrid>
              <Tile>
                <TileValue>{summary.uniqueVisitors ?? 0}</TileValue>
                <TileLabel>{t('insights.uniqueVisitors')}</TileLabel>
              </Tile>
              <Tile>
                <TileValue>{summary.repeatVisitors ?? 0}</TileValue>
                <TileLabel>{t('insights.repeatVisitors')}</TileLabel>
              </Tile>
              <Tile>
                <TileValue>{formatMoney(summary.totalRevenue)}</TileValue>
                <TileLabel>{t('insights.revenue')}</TileLabel>
              </Tile>
              <Tile>
                <TileValue>{formatMoney(summary.averageOrderValue)}</TileValue>
                <TileLabel>{t('insights.avgOrder')}</TileLabel>
              </Tile>
              {page.busiestHour && (
                <Tile>
                  <TileValue>{formatHour(page.busiestHour.hour)}</TileValue>
                  <TileLabel>{t('insights.busiest')}</TileLabel>
                </Tile>
              )}
              {summary.upsellImpact && summary.upsellImpact.acceptedCount > 0 && (
                <Tile>
                  <TileValue>{formatMoney(summary.upsellImpact.attributedRevenue)}</TileValue>
                  <TileLabel>
                    {t('insights.upsellBody', {
                      count: summary.upsellImpact.acceptedCount,
                    })}
                  </TileLabel>
                </Tile>
              )}
            </TileGrid>
          )}

          {summary.commissionSavings && summary.commissionSavings.orderCount > 0 && (
            <>
              <SectionLabel>{t('insights.savingsTitle')}</SectionLabel>
              <SavingsCard>
                <SavingsTitle>{t('insights.savingsCommission')}</SavingsTitle>
                <SavingsHeadline>
                  {formatMoney(summary.commissionSavings.commissionAvoided)}
                </SavingsHeadline>
                <SavingsBody>
                  {t('insights.savingsBody', {
                    count: summary.commissionSavings.orderCount,
                  })}
                </SavingsBody>
                <SavingsRows>
                  <SavingsRow>
                    <SavingsKey>{t('insights.savingsRevenue')}</SavingsKey>
                    <SavingsValue>
                      {formatMoney(summary.commissionSavings.directOrderRevenue)}
                    </SavingsValue>
                  </SavingsRow>
                  <SavingsRow>
                    <SavingsKey>{t('insights.savingsCost')}</SavingsKey>
                    <SavingsValue>
                      {formatMoney(summary.commissionSavings.platformCost)}
                    </SavingsValue>
                  </SavingsRow>
                  <SavingsRow>
                    <SavingsKey>{t('insights.savingsNet')}</SavingsKey>
                    <SavingsValue>
                      {formatMoney(summary.commissionSavings.netSaving)}
                    </SavingsValue>
                  </SavingsRow>
                </SavingsRows>
              </SavingsCard>
            </>
          )}

          <SectionLabel>{t('insights.popularCategories')}</SectionLabel>
          <CardGrid>
            <CountList
              title={t('insights.popularCategories')}
              rows={summary.popularCategories}
            />
            {summary.isPro && (
              <CountList title={t('insights.tableScans')} rows={summary.tableScans} />
            )}
          </CardGrid>
        </>
      )}

      {summary && !summary.isPro && (
        <>
          <SectionLabel>{t('insights.proTitle')}</SectionLabel>
          <ProCard>
            <ProTitle>{t('insights.proTitle')}</ProTitle>
            <ProBody>{t('insights.proBody')}</ProBody>
            <ProActions>
              <Link to="/dashboard/plan">
                <Button>{t('insights.proCta')}</Button>
              </Link>
            </ProActions>
          </ProCard>
        </>
      )}

      {page.isPro && <Dishes page={page} />}

      {summary && (page.hasActivity || (summary.offerViews ?? []).length > 0) && (
        <>
          <SectionLabel>{t('insights.offersTitle')}</SectionLabel>
          <Hint>{t('insights.offersHint')}</Hint>
          <CardGrid>
            <CountList title={t('insights.offerViews')} rows={summary.offerViews ?? []} />
          </CardGrid>
        </>
      )}

      <SectionLabel>{t('insights.reviewsTitle')}</SectionLabel>
      <Hint>{t('ratings.hint')}</Hint>
      <ReviewsPanel restaurantId={restaurant.id} />
    </Page>
  )
}

function CountList({ title, rows }: { title: string; rows: NamedCount[] }) {
  const { t } = useTranslation('dashboard')
  return (
    <ListCard>
      <ListTitle>{title}</ListTitle>
      {rows.length === 0 && <ListRow>{t('insights.empty')}</ListRow>}
      {rows.map((row) => (
        <ListRow key={row.id ?? row.label}>
          <ListName>{row.label}</ListName>
          <ListCount>{row.count}</ListCount>
        </ListRow>
      ))}
    </ListCard>
  )
}

function Dishes({ page }: { page: ReturnType<typeof useInsightsPage> }) {
  const { t } = useTranslation('dashboard')

  if (page.dishesLoading) {
    return (
      <>
        <SectionLabel>{t('dishes.title')}</SectionLabel>
        <Skeleton height="200px" />
      </>
    )
  }
  if (!page.dishes) return null

  const { top, slow } = page.dishes

  return (
    <>
      <SectionLabel>{t('dishes.title')}</SectionLabel>
      <Hint>{t('dishes.hint')}</Hint>

      {top.length === 0 ? (
        <EmptyState emoji="◇" title={t('dishes.empty')} hint={t('insights.emptyHint')} />
      ) : (
        <DishList>
          {top.map((dish) => (
            <DishLine key={dish.menuItemId} dish={dish} />
          ))}
        </DishList>
      )}

      {slow.length > 0 && (
        <>
          <SectionLabel>{t('dishes.slowTitle')}</SectionLabel>
          <DishList>
            {slow.map((dish) => (
              <DishLine key={dish.menuItemId} dish={dish} />
            ))}
          </DishList>
        </>
      )}
    </>
  )
}

function DishLine({ dish }: { dish: DishRow }) {
  const { t } = useTranslation('dashboard')
  return (
    <DishRowItem>
      <DishMain>
        <DishName>{dish.name}</DishName>
        <DishMeta>
          {dish.category ?? '—'} · {formatMoney(dish.revenue)}
          {dish.shareOfOrders > 0 && ` · ${t('dishes.share', { value: dish.shareOfOrders })}`}
        </DishMeta>
      </DishMain>
      <DishNumbers>
        <DishUnits>{t('dishes.units', { count: dish.unitsSold })}</DishUnits>
        <VerdictPill $tone={VERDICT_TONE[dish.verdict]}>
          {t(`dishes.verdict.${dish.verdict}`)}
        </VerdictPill>
      </DishNumbers>
    </DishRowItem>
  )
}
