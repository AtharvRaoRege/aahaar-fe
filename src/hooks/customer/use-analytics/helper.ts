import { useCallback, useEffect, useRef } from 'react'

import { getVisitorKey } from '@/lib/analytics/visitor'
import { publicApi } from '@/lib/api/public'
import { sessionStore } from '@/lib/customer/session-store'
import type { AnalyticsEventType } from '@/types/analytics'

/**
 * Fire-and-forget engagement logging.
 *
 * Never blocks or breaks the menu: every failure is swallowed, and each
 * ``once`` key is sent a single time per mount so a re-render cannot inflate
 * the counts.
 */
export function useCustomerAnalytics(slug: string, restaurantId: string) {
  const sent = useRef<Set<string>>(new Set())

  const track = useCallback(
    (eventType: AnalyticsEventType, options?: { targetId?: string; once?: string }) => {
      if (!slug) return
      if (options?.once) {
        if (sent.current.has(options.once)) return
        sent.current.add(options.once)
      }
      const session = sessionStore.get(restaurantId)
      void publicApi
        .logEvent(slug, {
          eventType,
          customerSessionId: session?.id ?? null,
          tableNumber: session?.tableNumber ?? null,
          visitorKey: getVisitorKey(),
          targetId: options?.targetId ?? null,
        })
        .catch(() => undefined)
    },
    [slug, restaurantId],
  )

  return { track }
}

/** Logs the scan + menu view exactly once when a diner lands on the menu. */
export function useTrackMenuVisit(slug: string, restaurantId: string) {
  const { track } = useCustomerAnalytics(slug, restaurantId)

  useEffect(() => {
    track('QR_SCAN', { once: 'scan' })
    track('MENU_VIEW', { once: 'menu-view' })
  }, [track])

  return { track }
}
