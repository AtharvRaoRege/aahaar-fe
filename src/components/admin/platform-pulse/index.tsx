import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'
import { Skeleton } from '@/components/global/skeleton'
import { adminApi } from '@/lib/api/admin'
import { freshFor } from '@/lib/query/cache'
import { queryKeys } from '@/lib/query/keys'
import { formatMoney } from '@/utils/format'

import {
  fillDailySeries,
  formatPulseDay,
  maxOrders,
  PULSE_RANGE_LABEL,
  PULSE_RANGE_OPTIONS,
  type PulseRangeDays,
} from './helper'
import {
  Badge,
  Card,
  CardTitle,
  DayFill,
  DayLabel,
  DayList,
  DayMeta,
  DayRow,
  DayTrack,
  Empty,
  Head,
  Hint,
  MixCard,
  MixLabel,
  MixRow,
  MixValue,
  RangeRow,
  SplitGrid,
  Tile,
  TileGrid,
  TileLabel,
  TileValue,
  Title,
  VenueBadges,
  VenueList,
  VenueName,
  VenueRow,
  VenueStats,
  VenueTop,
  Wrap,
} from './styled'

export function PlatformPulse() {
  const { t } = useTranslation('dashboard')
  const [rangeDays, setRangeDays] = useState<PulseRangeDays>(30)
  const query = useQuery({
    queryKey: queryKeys.adminAnalytics(rangeDays),
    queryFn: () => adminApi.analytics(rangeDays),
    staleTime: freshFor.slow,
  })

  const data = query.data
  const daily = data ? fillDailySeries(rangeDays, data.daily) : []
  const peak = maxOrders(daily)

  return (
    <Wrap>
      <Head>
        <Title>{t('admin.pulseTitle')}</Title>
        <Hint>{t('admin.pulseHint')}</Hint>
        <RangeRow>
          {PULSE_RANGE_OPTIONS.map((days) => (
            <Button
              key={days}
              size="sm"
              variant={rangeDays === days ? 'primary' : 'outline'}
              onClick={() => setRangeDays(days)}
            >
              {t(PULSE_RANGE_LABEL[days])}
            </Button>
          ))}
        </RangeRow>
      </Head>

      {query.isLoading && <Skeleton height="220px" />}

      {data && (
        <>
          <TileGrid>
            <Tile>
              <TileValue>{formatMoney(Number(data.totals.revenueToday))}</TileValue>
              <TileLabel>{t('admin.pulseRevenueToday')}</TileLabel>
            </Tile>
            <Tile>
              <TileValue>{formatMoney(Number(data.totals.revenue))}</TileValue>
              <TileLabel>{t('admin.pulseRevenueRange')}</TileLabel>
            </Tile>
            <Tile>
              <TileValue>{data.totals.ordersToday}</TileValue>
              <TileLabel>{t('admin.pulseOrdersToday')}</TileLabel>
            </Tile>
            <Tile>
              <TileValue>{data.totals.ordersPlaced}</TileValue>
              <TileLabel>{t('admin.pulseOrdersRange')}</TileLabel>
            </Tile>
            <Tile>
              <TileValue>{data.totals.ordersCompleted}</TileValue>
              <TileLabel>{t('admin.pulseCompleted')}</TileLabel>
            </Tile>
          </TileGrid>

          <SplitGrid>
            <Card>
              <CardTitle>{t('admin.pulsePlanMix')}</CardTitle>
              <MixRow>
                <MixCard $tone="pro">
                  <MixValue>{data.totals.venuesPro}</MixValue>
                  <MixLabel>{t('admin.pulseProVenues')}</MixLabel>
                </MixCard>
                <MixCard $tone="basic">
                  <MixValue>{data.totals.venuesBasic}</MixValue>
                  <MixLabel>{t('admin.pulseBasicVenues')}</MixLabel>
                </MixCard>
              </MixRow>
              <VenueStats>
                <span>{t('admin.pulseLiveCount', { count: data.totals.venuesLive })}</span>
                <span>{t('admin.pulseOwnersCount', { count: data.totals.ownersTotal })}</span>
                <span>{t('admin.pulseVenuesCount', { count: data.totals.venuesTotal })}</span>
              </VenueStats>
            </Card>

            <Card>
              <CardTitle>{t('admin.pulseDaily')}</CardTitle>
              {daily.every((point) => point.orders === 0) ? (
                <Empty>{t('admin.pulseDailyEmpty')}</Empty>
              ) : (
                <DayList>
                  {daily.map((point) => (
                    <DayRow key={point.day}>
                      <DayLabel>{formatPulseDay(point.day)}</DayLabel>
                      <DayTrack aria-hidden>
                        <DayFill $pct={(point.orders / peak) * 100} />
                      </DayTrack>
                      <DayMeta>
                        {point.orders} · {formatMoney(Number(point.revenue))}
                      </DayMeta>
                    </DayRow>
                  ))}
                </DayList>
              )}
            </Card>
          </SplitGrid>

          <Card>
            <CardTitle>{t('admin.pulseTopVenues')}</CardTitle>
            {data.topVenues.length === 0 ? (
              <Empty>{t('admin.pulseTopEmpty')}</Empty>
            ) : (
              <VenueList>
                {data.topVenues.map((venue, index) => (
                  <VenueRow key={venue.restaurantId}>
                    <VenueTop>
                      <VenueName>
                        {index + 1}. {venue.name}
                      </VenueName>
                      <VenueBadges>
                        <Badge $tone={venue.plan === 'PRO' ? 'pro' : undefined}>
                          {venue.plan === 'PRO' ? t('admin.planPro') : t('admin.planBasic')}
                        </Badge>
                        <Badge $tone={venue.isPublished ? 'live' : 'draft'}>
                          {venue.isPublished ? t('admin.live') : t('admin.draft')}
                        </Badge>
                      </VenueBadges>
                    </VenueTop>
                    <VenueStats>
                      <span>{t(`setup.${venue.venueKind.toLowerCase()}`)}</span>
                      <span>{t('admin.pulseVenueOrders', { count: venue.orders })}</span>
                      <span>{formatMoney(Number(venue.revenue))}</span>
                    </VenueStats>
                  </VenueRow>
                ))}
              </VenueList>
            )}
          </Card>
        </>
      )}
    </Wrap>
  )
}
