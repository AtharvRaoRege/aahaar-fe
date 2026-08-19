import type { OrderStatus } from '@/types/order'

/**
 * Kitchen and guests share three live stages. The database still records the
 * full hop history; this is only how people see it.
 */
export const ORDER_STAGES = ['NEW', 'PREPARING', 'READY', 'CLOSED'] as const
export type OrderStage = (typeof ORDER_STAGES)[number]

const STAGE_OF: Record<OrderStatus, OrderStage> = {
  PENDING: 'NEW',
  ACCEPTED: 'PREPARING',
  PREPARING: 'PREPARING',
  READY: 'READY',
  SERVED: 'READY',
  COMPLETED: 'CLOSED',
  REJECTED: 'CLOSED',
  CANCELLED: 'CLOSED',
}

export const STAGE_STATUSES: Record<OrderStage, OrderStatus[]> = {
  NEW: ['PENDING'],
  PREPARING: ['ACCEPTED', 'PREPARING'],
  READY: ['READY', 'SERVED'],
  CLOSED: ['COMPLETED', 'REJECTED', 'CANCELLED'],
}

export function stageOf(status: OrderStatus): OrderStage {
  return STAGE_OF[status]
}

export const STAGE_ADVANCE: Partial<Record<OrderStage, OrderStatus>> = {
  NEW: 'ACCEPTED',
  PREPARING: 'READY',
  READY: 'COMPLETED',
}
