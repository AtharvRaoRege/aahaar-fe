import { createSocket } from '@/lib/socket/socket'
import type { Socket } from 'socket.io-client'

/**
 * One Socket.IO connection for the whole tab.
 *
 * Every screen used to call `createSocket` for itself, so a staff member sitting
 * on the orders page held two connections at once (the page and the kitchen
 * alert bar) and each one paid its own handshake and polling fallback. Callers
 * now share a single socket and only say when they need it.
 *
 * Releases are deferred briefly: React unmounts and remounts effects in
 * development, and a strict-mode remount should reuse the live connection rather
 * than tear it down and dial again.
 */
const CLOSE_DELAY_MS = 1_500

let socket: Socket | null = null
let refCount = 0
let closeTimer = 0
let connected = false

const watchers = new Set<(value: boolean) => void>()

function publish(value: boolean): void {
  if (connected === value) return
  connected = value
  watchers.forEach((watcher) => watcher(value))
}

/**
 * Manager listeners are not cleared by `socket.removeAllListeners()`, and the
 * manager outlives the socket, so this one is detached by hand on close.
 */
const onReconnectAttempt = () => publish(false)

function build(token: string | undefined): Socket {
  const next = createSocket(token)
  next.on('connect', () => publish(true))
  next.on('disconnect', () => publish(false))
  next.io.on('reconnect_attempt', onReconnectAttempt)
  return next
}

/** Borrow the shared socket. Pair every call with `releaseSocket`. */
export function acquireSocket(token?: string): Socket {
  window.clearTimeout(closeTimer)
  closeTimer = 0
  refCount += 1
  if (!socket) {
    socket = build(token)
    publish(socket.connected)
    return socket
  }
  if (token) socket.auth = { token }
  return socket
}

/** Give the shared socket back. The last holder closes it. */
export function releaseSocket(): void {
  refCount = Math.max(0, refCount - 1)
  if (refCount > 0) return
  window.clearTimeout(closeTimer)
  closeTimer = window.setTimeout(() => {
    if (refCount > 0) return
    socket?.io.off('reconnect_attempt', onReconnectAttempt)
    socket?.removeAllListeners()
    socket?.disconnect()
    socket = null
    publish(false)
  }, CLOSE_DELAY_MS)
}

export function isSocketConnected(): boolean {
  return connected
}

export function subscribeSocketState(watcher: (value: boolean) => void): () => void {
  watchers.add(watcher)
  return () => {
    watchers.delete(watcher)
  }
}
