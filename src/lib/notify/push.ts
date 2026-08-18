import { pushApi } from '@/lib/api/push'
import { canUseWebPush, iosNeedsHomeScreen } from '@/utils/pwa/platform'

function urlBase64ToUint8Array(base64: string): Uint8Array {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const raw = atob((base64 + padding).replace(/-/g, '+').replace(/_/g, '/'))
  const output = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i += 1) output[i] = raw.charCodeAt(i)
  return output
}

function toPayload(subscription: PushSubscription) {
  const json = subscription.toJSON()
  const keys = json.keys
  if (!json.endpoint || !keys?.p256dh || !keys.auth) {
    throw new Error('Incomplete push subscription')
  }
  return {
    endpoint: json.endpoint,
    keys: { p256dh: keys.p256dh, auth: keys.auth },
  }
}

export async function getPushRegistration(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) return null
  return navigator.serviceWorker.ready
}

export async function currentPushPermission(): Promise<NotificationPermission | 'unsupported'> {
  if (!canUseWebPush()) return 'unsupported'
  return Notification.permission
}

export async function enableKitchenPush(restaurantId: string): Promise<'granted' | 'denied' | 'install'> {
  if (iosNeedsHomeScreen()) return 'install'
  if (!canUseWebPush()) return 'denied'
  const permission = await Notification.requestPermission()
  if (permission !== 'granted') return 'denied'
  const registration = await getPushRegistration()
  if (!registration) return 'denied'
  const publicKey = await pushApi.vapidKey()
  const existing = await registration.pushManager.getSubscription()
  const subscription =
    existing ??
    (await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey) as BufferSource,
    }))
  await pushApi.subscribe(restaurantId, toPayload(subscription))
  return 'granted'
}

export async function syncKitchenPush(restaurantId: string) {
  if (!canUseWebPush() || Notification.permission !== 'granted') return
  const registration = await getPushRegistration()
  const subscription = await registration?.pushManager.getSubscription()
  if (!subscription) return
  await pushApi.subscribe(restaurantId, toPayload(subscription))
}

export async function disableKitchenPush() {
  const registration = await getPushRegistration()
  const subscription = await registration?.pushManager.getSubscription()
  if (!subscription) return
  await pushApi.unsubscribe(subscription.endpoint)
  await subscription.unsubscribe()
}
