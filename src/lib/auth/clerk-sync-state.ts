import { useSyncExternalStore } from 'react'

/**
 * Is a Clerk sign-in currently being exchanged for an Aahaar session?
 *
 * Clerk finishes its redirect before the backend has minted our own JWT, so for a
 * second or two the app has a Clerk session and no Aahaar session. Route guards
 * read this to hold still instead of bouncing to the login screen and back — the
 * flash that made a successful login look broken.
 */
let pending = false
const listeners = new Set<() => void>()

function publish(next: boolean): void {
  if (pending === next) return
  pending = next
  listeners.forEach((listener) => listener())
}

export const clerkSyncState = {
  getSnapshot: (): boolean => pending,
  subscribe: (listener: () => void): (() => void) => {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
  set: publish,
}

export function useClerkSyncPending(): boolean {
  return useSyncExternalStore(clerkSyncState.subscribe, clerkSyncState.getSnapshot, () => false)
}
