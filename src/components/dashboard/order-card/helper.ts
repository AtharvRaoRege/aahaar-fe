import { NEXT_ACTION } from '@/constants/order-status'
import type { Order, OrderStatus } from '@/types/order'

export const NEXT_LABEL_KEY = {
  PREPARING: 'orders.startPreparing',
  READY: 'orders.markReady',
  SERVED: 'orders.markServed',
  COMPLETED: 'orders.complete',
} as const

export function nextStatus(status: OrderStatus): OrderStatus | null {
  return NEXT_ACTION[status] ?? null
}

export function itemLines(order: Order): string[] {
  return order.items.map((item) => {
    const extras = [
      item.variantSnapshot?.name,
      ...(item.addonSnapshot ?? []).map((addon) => addon.name),
    ].filter(Boolean)
    const suffix = extras.length ? ` (${extras.join(', ')})` : ''
    return `${item.quantity} × ${item.nameSnapshot}${suffix}`
  })
}
