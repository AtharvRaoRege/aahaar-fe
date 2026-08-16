import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'

/**
 * Connect to the Socket.IO server. Same-origin ('/'): the Vite dev server and
 * the production nginx both proxy `/socket.io` to the FastAPI backend.
 */
export function createSocket(token?: string): Socket {
  return io('/', {
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
  joinRestaurant: 'join_restaurant',
  joinOrder: 'join_order',
} as const
