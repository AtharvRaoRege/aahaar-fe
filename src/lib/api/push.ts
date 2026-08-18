import { api } from '@/lib/api/client'

export interface PushSubscriptionPayload {
  endpoint: string
  keys: { p256dh: string; auth: string }
}

export const pushApi = {
  async vapidKey(): Promise<string> {
    const { data } = await api.get<{ publicKey: string }>('/push/vapid-key')
    return data.publicKey
  },
  async subscribe(restaurantId: string, subscription: PushSubscriptionPayload) {
    await api.post('/push/subscriptions', { restaurantId, subscription })
  },
  async unsubscribe(endpoint: string) {
    await api.post('/push/unsubscribe', { endpoint })
  },
}
