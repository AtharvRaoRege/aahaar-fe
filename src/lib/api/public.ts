import { api } from '@/lib/api/client'
import type { LogEventPayload } from '@/types/analytics'
import type { CreateCustomerSessionPayload, CustomerSession } from '@/types/customer'
import type { Menu, Upsells } from '@/types/menu'
import type { PublicOffer, VerifyOfferPayload, VerifyOfferResult } from '@/types/offer'
import type { Order } from '@/types/order'
import type { PublicRestaurant } from '@/types/restaurant'

export const publicApi = {
  async getRestaurant(slug: string): Promise<PublicRestaurant> {
    const { data } = await api.get<PublicRestaurant>(`/public/restaurants/${slug}`)
    return data
  },
  async getMenu(slug: string): Promise<Menu> {
    const { data } = await api.get<Menu>(`/public/restaurants/${slug}/menu`)
    return data
  },
  async getOffers(slug: string): Promise<PublicOffer[]> {
    const { data } = await api.get<PublicOffer[]>(
      `/public/restaurants/${slug}/offers`,
    )
    return data
  },
  async verifyOffer(
    slug: string,
    payload: VerifyOfferPayload,
  ): Promise<VerifyOfferResult> {
    const { data } = await api.post<VerifyOfferResult>(
      `/public/restaurants/${slug}/offers/verify`,
      payload,
    )
    return data
  },
  async getUpsells(slug: string, menuItemId: string): Promise<Upsells> {
    const { data } = await api.get<Upsells>(
      `/public/restaurants/${slug}/menu-items/${menuItemId}/upsells`,
    )
    return data
  },
  async logEvent(slug: string, payload: LogEventPayload): Promise<void> {
    await api.post(`/public/restaurants/${slug}/events`, payload)
  },
  async createSession(
    payload: CreateCustomerSessionPayload,
  ): Promise<CustomerSession> {
    const { data } = await api.post<CustomerSession>(
      '/public/customer-sessions',
      payload,
    )
    return data
  },
  async getSession(sessionId: string): Promise<CustomerSession> {
    const { data } = await api.get<CustomerSession>(
      `/public/customer-sessions/${sessionId}`,
    )
    return data
  },
  async getOpenOrder(sessionId: string): Promise<Order | null> {
    const { data, status } = await api.get<Order | ''>(
      `/public/customer-sessions/${sessionId}/open-order`,
    )
    if (status === 204 || !data) return null
    return data
  },
}
