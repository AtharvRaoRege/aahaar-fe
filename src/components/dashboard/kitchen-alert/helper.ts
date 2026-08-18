import { useCallback, useEffect, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { tokenStore } from '@/lib/auth/token-store'
import { bindAlertSoundUnlock, playOrderChime } from '@/lib/notify/chime'
import { currentPushPermission, enableKitchenPush, syncKitchenPush } from '@/lib/notify/push'
import { queryKeys } from '@/lib/query/keys'
import { createSocket, SOCKET_EVENTS } from '@/lib/socket/socket'
import type { OrderEvent } from '@/types/order'
import { iosNeedsHomeScreen } from '@/utils/pwa/platform'

export type AlertKind = 'order' | 'review'

export interface KitchenAlert {
  id: string
  kind: AlertKind
  title: string
  body: string
  href: string
}

interface ReviewEvent {
  reviewId: string
  restaurantId: string
  rating: number
  orderId: string | null
}

interface PushMessage {
  type?: string
  title?: string
  body?: string
  url?: string
  tag?: string
  orderId?: string
  reviewId?: string
  rating?: number
  orderNumber?: number
  tableNumber?: string | null
  roomNumber?: string | null
  total?: number
  itemsAdded?: boolean
}

const seen = new Map<string, number>()

function remember(id: string): boolean {
  const now = Date.now()
  const previous = seen.get(id)
  if (previous && now - previous < 8000) return false
  seen.set(id, now)
  return true
}

export function useKitchenAlerts(restaurantId: string | undefined) {
  const { t } = useTranslation('dashboard')
  const queryClient = useQueryClient()
  const [alert, setAlert] = useState<KitchenAlert | null>(null)
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>('default')
  const [setupHidden, setSetupHidden] = useState(
    () => sessionStorage.getItem('aahaar.alertSetup') === '1',
  )
  const [setupBusy, setSetupBusy] = useState(false)
  const hideTimer = useRef<number>(0)

  const show = useCallback((next: KitchenAlert) => {
    if (!remember(next.id)) return
    window.clearTimeout(hideTimer.current)
    setAlert(next)
    void playOrderChime()
    hideTimer.current = window.setTimeout(() => setAlert(null), 7000)
  }, [])

  const hideSetup = useCallback(() => {
    sessionStorage.setItem('aahaar.alertSetup', '1')
    setSetupHidden(true)
  }, [])

  const enableAlerts = useCallback(async () => {
    if (!restaurantId) return
    setSetupBusy(true)
    const result = await enableKitchenPush(restaurantId)
    setSetupBusy(false)
    if (result === 'granted') {
      setPermission('granted')
      hideSetup()
    }
  }, [restaurantId, hideSetup])

  const dismiss = useCallback(() => {
    window.clearTimeout(hideTimer.current)
    setAlert(null)
  }, [])

  useEffect(() => {
    void currentPushPermission().then(setPermission)
    return bindAlertSoundUnlock()
  }, [])

  useEffect(() => {
    if (!restaurantId || permission !== 'granted') return
    void syncKitchenPush(restaurantId).catch(() => undefined)
  }, [restaurantId, permission])

  useEffect(() => {
    if (!restaurantId) return
    const socket = createSocket(tokenStore.getAccess() ?? undefined)
    const applyAuth = () => {
      const token = tokenStore.getAccess()
      socket.auth = token ? { token } : {}
    }
    const join = () => {
      applyAuth()
      socket.emit(SOCKET_EVENTS.joinRestaurant, { restaurantId })
    }
    const onOrder = (event: OrderEvent) => {
      void queryClient.invalidateQueries({ queryKey: ['orders', restaurantId] })
      const place = event.tableNumber || event.roomNumber
      const updated = Boolean(event.itemsAdded)
      show({
        id: updated ? `order:${event.orderId}:items:${event.updatedAt}` : `order:${event.orderId}`,
        kind: 'order',
        title: updated
          ? t('alerts.updatedTitle', { number: event.orderNumber })
          : t('alerts.orderTitle', { number: event.orderNumber }),
        body: place
          ? updated
            ? t('alerts.updatedBodyTable', { table: place, total: Math.round(event.total) })
            : t('alerts.orderBodyTable', { table: place, total: Math.round(event.total) })
          : updated
            ? t('alerts.updatedBody', { total: Math.round(event.total) })
            : t('alerts.orderBody', { total: Math.round(event.total) }),
        href: '/dashboard',
      })
    }
    const onReview = (event: ReviewEvent) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.reviews(restaurantId, 1) })
      void queryClient.invalidateQueries({ queryKey: queryKeys.reviewSummary(restaurantId) })
      show({
        id: `review:${event.reviewId}`,
        kind: 'review',
        title: t('alerts.reviewTitle', { rating: event.rating }),
        body: t('alerts.reviewBody'),
        href: '/dashboard/ratings',
      })
    }
    const onPushMessage = (event: MessageEvent<PushMessage>) => {
      const data = event.data
      if (!data || (data.type !== 'order' && data.type !== 'review' && data.type !== 'KITCHEN_PUSH')) {
        return
      }
      const kind: AlertKind = data.type === 'review' || data.reviewId ? 'review' : 'order'
      const id = data.tag || (data.reviewId ? `review:${data.reviewId}` : `order:${data.orderId}`)
      if (!id) return
      show({
        id,
        kind,
        title: data.title || t(kind === 'order' ? 'alerts.orderFallback' : 'alerts.reviewFallback'),
        body: data.body || t('alerts.reviewBody'),
        href: data.url || (kind === 'review' ? '/dashboard/ratings' : '/dashboard'),
      })
    }
    const onItemsAdded = (event: OrderEvent) => {
      if (event.itemsAdded) onOrder(event)
    }
    socket.io.on('reconnect_attempt', applyAuth)
    socket.on('connect', join)
    socket.on(SOCKET_EVENTS.orderCreated, onOrder)
    socket.on(SOCKET_EVENTS.orderUpdated, onItemsAdded)
    socket.on(SOCKET_EVENTS.reviewCreated, onReview)
    navigator.serviceWorker?.addEventListener('message', onPushMessage)
    if (socket.connected) join()
    return () => {
      socket.io.off('reconnect_attempt', applyAuth)
      socket.off('connect', join)
      socket.off(SOCKET_EVENTS.orderCreated, onOrder)
      socket.off(SOCKET_EVENTS.orderUpdated, onItemsAdded)
      socket.off(SOCKET_EVENTS.reviewCreated, onReview)
      socket.disconnect()
      navigator.serviceWorker?.removeEventListener('message', onPushMessage)
    }
  }, [restaurantId, queryClient, show, t])

  return {
    alert,
    dismiss,
    permission,
    showSetup:
      Boolean(restaurantId) &&
      permission === 'default' &&
      !setupHidden &&
      !iosNeedsHomeScreen(),
    setupBusy,
    enableAlerts,
    hideSetup,
  }
}
