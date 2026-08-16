let clerkSyncBlocked = false

export function blockClerkSync() {
  clerkSyncBlocked = true
}

export function allowClerkSync() {
  clerkSyncBlocked = false
}

export function isClerkSyncBlocked() {
  return clerkSyncBlocked
}
