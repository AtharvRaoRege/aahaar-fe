import type { AdminDailyPoint } from '@/types/admin-analytics'

export const PULSE_RANGE_OPTIONS = [7, 30, 90] as const
export type PulseRangeDays = (typeof PULSE_RANGE_OPTIONS)[number]

export const PULSE_RANGE_LABEL: Record<PulseRangeDays, string> = {
  7: 'admin.pulseRange7',
  30: 'admin.pulseRange30',
  90: 'admin.pulseRange90',
}

export function fillDailySeries(
  days: number,
  points: AdminDailyPoint[],
): AdminDailyPoint[] {
  const byDay = new Map(points.map((point) => [point.day.slice(0, 10), point]))
  const today = new Date()
  const series: AdminDailyPoint[] = []
  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = new Date(today)
    date.setHours(12, 0, 0, 0)
    date.setDate(today.getDate() - offset)
    const key = date.toISOString().slice(0, 10)
    const hit = byDay.get(key)
    series.push(hit ?? { day: key, orders: 0, revenue: 0 })
  }
  return series
}

export function maxOrders(points: AdminDailyPoint[]) {
  return Math.max(1, ...points.map((point) => point.orders))
}

export function formatPulseDay(iso: string) {
  const date = new Date(`${iso.slice(0, 10)}T12:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}
