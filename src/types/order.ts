export const ORDER_STATUSES = [
  'PENDING',
  'ACCEPTED',
  'PREPARING',
  'READY',
  'SERVED',
  'COMPLETED',
  'REJECTED',
  'CANCELLED',
] as const
export type OrderStatus = (typeof ORDER_STATUSES)[number]

export const ACTIVE_ORDER_STATUSES: OrderStatus[] = [
  'PENDING',
  'ACCEPTED',
  'PREPARING',
  'READY',
  'SERVED',
]

export interface OrderItem {
  id: string
  menuItemId: string | null
  nameSnapshot: string
  priceSnapshot: number
  quantity: number
  variantSnapshot: { id: string; name: string; priceDelta: number } | null
  addonSnapshot: { id: string; name: string; price: number }[] | null
  notes: string | null
  subtotal: number
}

export interface OrderStatusHistoryEntry {
  id: string
  oldStatus: OrderStatus | null
  newStatus: OrderStatus
  changedBy: string | null
  note: string | null
  createdAt: string
}

export interface OrderCustomer {
  name: string
  contactNumber: string | null
  guestCount: number
}

export interface Order {
  id: string
  restaurantId: string
  customerSessionId: string | null
  orderNumber: number
  status: OrderStatus
  subtotal: number
  discount: number
  tax: number
  total: number
  tableNumber: string | null
  roomNumber: string | null
  notes: string | null
  createdAt: string
  updatedAt: string
  customer: OrderCustomer | null
  reviewed?: boolean
  items: OrderItem[]
  statusHistory: OrderStatusHistoryEntry[]
}

export interface CreateOrderItemPayload {
  menuItemId: string
  quantity: number
  variantId?: string | null
  addonIds?: string[]
  notes?: string | null
}

export interface CreateOrderPayload {
  restaurantId: string
  customerSessionId: string
  items: CreateOrderItemPayload[]
  notes?: string | null
}

/** Realtime Socket.IO event payload (small — see realtime.md §6). */
export interface OrderEvent {
  orderId: string
  orderNumber: number
  status: OrderStatus
  restaurantId: string
  total: number
  tableNumber: string | null
  roomNumber: string | null
  updatedAt: string
  itemsAdded?: boolean
}
