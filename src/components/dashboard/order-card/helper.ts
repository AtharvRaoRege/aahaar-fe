import { STAGE_ADVANCE, stageOf } from '@/constants/order-stage'
import type { OrderStage } from '@/constants/order-stage'
import type { Order, OrderStatus } from '@/types/order'

/** Label for the single forward action available at each stage. */
export const STAGE_ACTION_KEY: Record<OrderStage, string | null> = {
  NEW: 'orders.accept',
  PREPARING: 'orders.markReady',
  READY: 'orders.markDone',
  CLOSED: null,
}

export function orderStage(status: OrderStatus): OrderStage {
  return stageOf(status)
}

export function hasForwardAction(status: OrderStatus): boolean {
  return Boolean(STAGE_ADVANCE[stageOf(status)])
}

export function orderCardItems(order: Order) {
  return order.items.map((item) => {
    const extras = [
      item.variantSnapshot?.name,
      ...(item.addonSnapshot ?? []).map((addon) => addon.name),
    ].filter(Boolean)
    return {
      id: item.id,
      label: `${item.quantity} × ${item.nameSnapshot}`,
      extras: extras.length ? extras.join(', ') : null,
      notes: item.notes?.trim() || null,
    }
  })
}
