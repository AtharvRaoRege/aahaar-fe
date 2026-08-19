export type WaiterCallStatus = 'PENDING' | 'ACKED'

export interface WaiterCall {
  id: string
  restaurantId: string
  tableNumber: string | null
  status: WaiterCallStatus
  createdAt: string | null
  acknowledgedAt: string | null
}
