import { useEffect, useSyncExternalStore } from 'react'
import type { Socket } from 'socket.io-client'

import {
  acquireSocket,
  isSocketConnected,
  releaseSocket,
  subscribeSocketState,
} from '@/lib/socket/shared-socket'

/**
 * Whether the shared live connection is up.
 *
 * Queries use this to decide whether they need to poll at all: while the socket
 * is delivering events there is nothing for a timer to discover, and polling on
 * top of it is the "unnecessary API call" the dashboard was making every few
 * seconds on every open screen.
 */
export function useSocketConnected(): boolean {
  return useSyncExternalStore(subscribeSocketState, isSocketConnected, () => false)
}

/**
 * Hold the shared socket for as long as the calling screen is mounted, and wire
 * up its listeners through `bind`.
 *
 * `bind` returns its own teardown so a caller can register handlers without
 * having to remember to remove each one.
 */
export function useLiveSocket(
  enabled: boolean,
  token: string | undefined,
  bind: (socket: Socket) => () => void,
): boolean {
  const connected = useSocketConnected()

  useEffect(() => {
    if (!enabled) return
    const socket = acquireSocket(token)
    const unbind = bind(socket)
    return () => {
      unbind()
      releaseSocket()
    }
    // `bind` is supplied fresh on every render by design; callers pass a stable
    // callback so this only re-runs when the subject actually changes.
  }, [enabled, token, bind])

  return connected
}
