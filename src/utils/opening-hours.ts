import type { OpeningHours } from '@/types/restaurant'

const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const

export interface ServiceWindow {
  /** ``null`` when the venue has not set any hours — show nothing rather than guess. */
  open: boolean | null
  closesAt: string | null
  opensAt: string | null
}

function minutesOf(value: string): number | null {
  const match = /^(\d{2}):(\d{2})$/.exec(value)
  if (!match) return null
  return Number(match[1]) * 60 + Number(match[2])
}

function readDay(hours: OpeningHours, index: number) {
  const key = DAY_KEYS[((index % 7) + 7) % 7]
  return hours[key] ?? hours[key.toUpperCase()] ?? null
}

/**
 * Whether the venue is serving right now, in the diner's own clock.
 *
 * Handles a window that runs past midnight (a bar open 18:00–01:00 is still open
 * at 00:30) by also testing yesterday's window.
 */
export function serviceWindow(hours: OpeningHours | null, now = new Date()): ServiceWindow {
  if (!hours || Object.keys(hours).length === 0) {
    return { open: null, closesAt: null, opensAt: null }
  }

  const nowMinutes = now.getHours() * 60 + now.getMinutes()
  const today = readDay(hours, now.getDay())
  const yesterday = readDay(hours, now.getDay() - 1)

  if (yesterday && !yesterday.closed && yesterday.opens && yesterday.closes) {
    const opens = minutesOf(yesterday.opens)
    const closes = minutesOf(yesterday.closes)
    // An overnight window from yesterday can still cover this morning.
    if (opens !== null && closes !== null && closes < opens && nowMinutes < closes) {
      return { open: true, closesAt: yesterday.closes, opensAt: null }
    }
  }

  if (!today || today.closed || !today.opens || !today.closes) {
    return { open: false, closesAt: null, opensAt: null }
  }

  const opens = minutesOf(today.opens)
  const closes = minutesOf(today.closes)
  if (opens === null || closes === null) {
    return { open: null, closesAt: null, opensAt: null }
  }

  const overnight = closes < opens
  const open = overnight
    ? nowMinutes >= opens || nowMinutes < closes
    : nowMinutes >= opens && nowMinutes < closes

  return {
    open,
    closesAt: open ? today.closes : null,
    opensAt: open ? null : today.opens,
  }
}

/** "18:30" → "6:30 pm", using the diner's locale conventions where possible. */
export function formatClock(value: string | null): string {
  if (!value) return ''
  const minutes = minutesOf(value)
  if (minutes === null) return value
  const date = new Date()
  date.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0)
  return date
    .toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    .toLowerCase()
}
