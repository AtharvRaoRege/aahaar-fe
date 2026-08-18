import { api } from '@/lib/api/client'
import type { CreateCustomerSessionPayload, CustomerSession } from '@/types/customer'
import type { Menu } from '@/types/menu'
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
