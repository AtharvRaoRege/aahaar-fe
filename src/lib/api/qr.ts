import { api } from '@/lib/api/client'
import type { QrCode } from '@/types/qr'

export interface CreateQrPayload {
  label: string
  tableNumber: string
}

export const qrApi = {
  async list(restaurantId: string): Promise<QrCode[]> {
    const { data } = await api.get<QrCode[]>(`/restaurants/${restaurantId}/qr`)
    return data
  },
  async create(restaurantId: string, payload: CreateQrPayload): Promise<QrCode> {
    const { data } = await api.post<QrCode>(
      `/restaurants/${restaurantId}/qr`,
      payload,
    )
    return data
  },
  async review(restaurantId: string): Promise<QrCode> {
    const { data } = await api.get<QrCode>(`/restaurants/${restaurantId}/qr/review`)
    return data
  },
}
