import { api } from '@/lib/api/client'
import type { PublishReadiness, Restaurant } from '@/types/restaurant'

export const restaurantsApi = {
  async list(): Promise<Restaurant[]> {
    const { data } = await api.get<Restaurant[]>('/restaurants')
    return data
  },
  async create(payload: {
    name: string
    venueKind: Restaurant['venueKind']
  }): Promise<Restaurant> {
    const { data } = await api.post<Restaurant>('/restaurants', payload)
    return data
  },
  async get(restaurantId: string): Promise<Restaurant> {
    const { data } = await api.get<Restaurant>(`/restaurants/${restaurantId}`)
    return data
  },
  async update(
    restaurantId: string,
    payload: Partial<Restaurant>,
  ): Promise<Restaurant> {
    const { data } = await api.patch<Restaurant>(
      `/restaurants/${restaurantId}`,
      payload,
    )
    return data
  },
  /** Upload a venue logo. The server squares and re-encodes it, then stores it. */
  async uploadLogo(restaurantId: string, file: File): Promise<Restaurant> {
    const body = new FormData()
    body.append('file', file)
    const { data } = await api.post<Restaurant>(`/restaurants/${restaurantId}/logo`, body)
    return data
  },
  async publishReadiness(restaurantId: string): Promise<PublishReadiness> {
    const { data } = await api.get<PublishReadiness>(
      `/restaurants/${restaurantId}/publish-readiness`,
    )
    return data
  },
  async setPublished(
    restaurantId: string,
    isPublished: boolean,
  ): Promise<Restaurant> {
    const { data } = await api.post<Restaurant>(
      `/restaurants/${restaurantId}/publish`,
      { isPublished },
    )
    return data
  },
}
