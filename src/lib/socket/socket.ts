import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'

import { SOCKET_ORIGIN } from '@/lib/api/origin'

/**
 * Connect to the Socket.IO server.
 *
 * Same-origin in development, where Vite proxies `/socket.io`; the API's own
 * origin in production, because a static host cannot proxy a WebSocket upgrade.
 */
export function createSocket(token?: string): Socket {
  return io(SOCKET_ORIGIN, {
    path: '/socket.io',
    transports: ['websocket', 'polling'],
    auth: token ? { token } : {},
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 800,
  })
}

export const SOCKET_EVENTS = {
  orderCreated: 'order:created',
  orderUpdated: 'order:updated',
  orderStatusUpdated: 'order:status_updated',
  orderAccepted: 'order:accepted',
  orderRejected: 'order:rejected',
  waiterCalled: 'waiter:called',
  waiterAcked: 'waiter:acked',
  reviewCreated: 'review:created',
  joinRestaurant: 'join_restaurant',
  joinOrder: 'join_order',
} as const
