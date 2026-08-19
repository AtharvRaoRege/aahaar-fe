import { api } from '@/lib/api/client'
import type { Page } from '@/types/common'
import type {
  CreateOrderPayload,
  Order,
  OrderStageCounts,
  OrderStatus,
} from '@/types/order'

export interface OrderCountParams {
  tableNumber?: string
  search?: string
  sinceHours?: number
}

export interface ListOrdersParams {
  status?: OrderStatus[]
  tableNumber?: string
  search?: string
  sinceHours?: number
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
  /** Exact per-stage totals, computed in the database rather than from a page. */
  async counts(
    restaurantId: string,
    params: OrderCountParams = {},
  ): Promise<OrderStageCounts> {
    const { data } = await api.get<OrderStageCounts>(
      `/restaurants/${restaurantId}/orders/counts`,
      { params },
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
  /** One tap, one request — the server walks every valid hop in between. */
  async advance(orderId: string, target: OrderStatus): Promise<Order> {
    const { data } = await api.post<Order>(`/orders/${orderId}/advance`, { target })
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
