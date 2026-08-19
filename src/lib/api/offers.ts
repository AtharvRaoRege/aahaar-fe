import { api } from '@/lib/api/client'
import type { Offer, OfferPayload } from '@/types/offer'

export const offersApi = {
  async list(restaurantId: string): Promise<Offer[]> {
    const { data } = await api.get<Offer[]>(`/restaurants/${restaurantId}/offers`)
    return data
  },
  async create(restaurantId: string, payload: OfferPayload): Promise<Offer> {
    const { data } = await api.post<Offer>(
      `/restaurants/${restaurantId}/offers`,
      payload,
    )
    return data
  },
  async update(
    restaurantId: string,
    offerId: string,
    payload: Partial<OfferPayload>,
  ): Promise<Offer> {
    const { data } = await api.patch<Offer>(
      `/restaurants/${restaurantId}/offers/${offerId}`,
      payload,
    )
    return data
  },
  async remove(restaurantId: string, offerId: string): Promise<void> {
    await api.delete(`/restaurants/${restaurantId}/offers/${offerId}`)
  },
}
