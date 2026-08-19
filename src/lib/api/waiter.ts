import { api } from '@/lib/api/client'
import type { WaiterCall } from '@/types/waiter'

export const waiterApi = {
  async create(
    slug: string,
    payload: { tableNumber: string; customerSessionId?: string | null },
  ): Promise<WaiterCall> {
    const { data } = await api.post<WaiterCall>(`/public/restaurants/${slug}/waiter-calls`, {
      tableNumber: payload.tableNumber,
      customerSessionId: payload.customerSessionId ?? null,
    })
    return data
  },
  async list(restaurantId: string): Promise<WaiterCall[]> {
    const { data } = await api.get<WaiterCall[]>(`/restaurants/${restaurantId}/waiter-calls`)
    return data
  },
  async ack(restaurantId: string, callId: string): Promise<WaiterCall> {
    const { data } = await api.post<WaiterCall>(
      `/restaurants/${restaurantId}/waiter-calls/${callId}/ack`,
    )
    return data
  },
}
