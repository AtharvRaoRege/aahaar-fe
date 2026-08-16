import { api } from '@/lib/api/client'
import type { Page } from '@/types/common'
import type { CreateOrderPayload, Order, OrderStatus } from '@/types/order'

export interface ListOrdersParams {
  status?: OrderStatus[]
  active?: boolean
  page?: number
  pageSize?: number
}

export const ordersApi = {
  async create(
    payload: CreateOrderPayload,
    idempotencyKey: string,
  ): Promise<Order> {
    const { data } = await api.post<Order>('/orders', payload, {
      headers: { 'Idempotency-Key': idempotencyKey },
    })
    return data
  },
  async get(orderId: string): Promise<Order> {
    const { data } = await api.get<Order>(`/orders/${orderId}`)
    return data
  },
  async listForRestaurant(
    restaurantId: string,
    params: ListOrdersParams = {},
  ): Promise<Page<Order>> {
    const { data } = await api.get<Page<Order>>(
      `/restaurants/${restaurantId}/orders`,
      {
        params,
        paramsSerializer: { indexes: null },
      },
    )
    return data
  },
  async accept(orderId: string): Promise<Order> {
    const { data } = await api.post<Order>(`/orders/${orderId}/accept`)
    return data
  },
  async reject(orderId: string, note?: string): Promise<Order> {
    const { data } = await api.post<Order>(`/orders/${orderId}/reject`, { note })
    return data
  },
  async updateStatus(
    orderId: string,
    status: OrderStatus,
    note?: string,
  ): Promise<Order> {
    const { data } = await api.patch<Order>(`/orders/${orderId}/status`, {
      status,
      note,
    })
    return data
  },
}
