import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { analyticsApi } from '@/lib/api/analytics'
import { queryKeys } from '@/lib/query/keys'
import type { DishVerdict } from '@/types/analytics'

export const RANGE_OPTIONS = [7, 30, 90] as const
export type RangeDays = (typeof RANGE_OPTIONS)[number]

export const RANGE_LABEL_KEY: Record<RangeDays, 'range7' | 'range30' | 'range90'> = {
  7: 'range7',
  30: 'range30',
  90: 'range90',
}

export const VERDICT_TONE: Record<DishVerdict, 'ok' | 'warn' | 'muted'> = {
  TOP: 'ok',
  STEADY: 'muted',
  SLOW: 'warn',
  NONE: 'muted',
}

/** Indian-format money without decimals — dashboards read cleaner that way. */
export function formatMoney(value: number | null | undefined): string {
  if (value === null || value === undefined) return '—'
  return `₹${Math.round(value).toLocaleString('en-IN')}`
}

export function formatHour(hour: number): string {
  const period = hour < 12 ? 'am' : 'pm'
  const display = hour % 12 === 0 ? 12 : hour % 12
  return `${display}${period}`
}

export function useInsightsPage(restaurantId: string) {
  const [rangeDays, setRangeDays] = useState<RangeDays>(30)

  const summaryQuery = useQuery({
    queryKey: queryKeys.analyticsSummary(restaurantId, rangeDays),
    queryFn: () => analyticsApi.summary(restaurantId, rangeDays),
  })

  const isPro = summaryQuery.data?.isPro ?? false

  const dishesQuery = useQuery({
    queryKey: queryKeys.dishPerformance(restaurantId, rangeDays),
    queryFn: () => analyticsApi.dishes(restaurantId, rangeDays),
    enabled: isPro,
  })

  const summary = summaryQuery.data ?? null
  const hasActivity = Boolean(
    summary && (summary.qrScans > 0 || summary.menuViews > 0 || summary.ordersPlaced > 0),
  )

  const peakHours = summary?.peakHours ?? []
  const busiestHour = peakHours.reduce<{ hour: number; count: number } | null>(
    (best, point) => (best === null || point.count > best.count ? point : best),
    null,
  )

  return {
    rangeDays,
    setRangeDays,
    summary,
    isLoading: summaryQuery.isLoading,
    isPro,
    hasActivity,
    busiestHour,
    dishes: dishesQuery.data ?? null,
    dishesLoading: dishesQuery.isLoading && isPro,
  }
}
