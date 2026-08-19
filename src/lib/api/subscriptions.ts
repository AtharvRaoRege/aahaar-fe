import { api } from '@/lib/api/client'
import type { PlanSpec, PlanTier, Subscription } from '@/types/subscription'

export const subscriptionsApi = {
  async plans(): Promise<PlanSpec[]> {
    const { data } = await api.get<PlanSpec[]>('/plans')
    return data
  },
  async get(restaurantId: string): Promise<Subscription> {
    const { data } = await api.get<Subscription>(
      `/restaurants/${restaurantId}/subscription`,
    )
    return data
  },
  async changePlan(restaurantId: string, plan: PlanTier): Promise<Subscription> {
    const { data } = await api.post<Subscription>(
      `/restaurants/${restaurantId}/subscription/plan`,
      { plan },
    )
    return data
  },
  async addPaymentMethod(
    restaurantId: string,
    providerRef: string,
  ): Promise<Subscription> {
    const { data } = await api.post<Subscription>(
      `/restaurants/${restaurantId}/subscription/payment-method`,
      { providerRef },
    )
    return data
  },
  async cancel(restaurantId: string, reason: string | null): Promise<Subscription> {
    const { data } = await api.post<Subscription>(
      `/restaurants/${restaurantId}/subscription/cancel`,
      { reason },
    )
    return data
  },
  async resume(restaurantId: string): Promise<Subscription> {
    const { data } = await api.post<Subscription>(
      `/restaurants/${restaurantId}/subscription/resume`,
      {},
    )
    return data
  },
}
