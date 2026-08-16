const KEY = 'aahaar.impersonation'

export interface Impersonation {
  restaurantId: string
  restaurantName: string
}

type Listener = () => void
const listeners = new Set<Listener>()

let snapshot: Impersonation | null = read()

function read(): Impersonation | null {
  const raw = localStorage.getItem(KEY)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as Impersonation
    if (!parsed?.restaurantId || !parsed?.restaurantName) return null
    return parsed
  } catch {
    return null
  }
}

function refresh() {
  snapshot = read()
  listeners.forEach((fn) => fn())
}

export const impersonationStore = {
  get(): Impersonation | null {
    return snapshot
  },
  getSnapshot(): Impersonation | null {
    return snapshot
  },
  set(value: Impersonation) {
    localStorage.setItem(KEY, JSON.stringify(value))
    refresh()
  },
  clear() {
    localStorage.removeItem(KEY)
    refresh()
  },
  subscribe(listener: Listener): () => void {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
}
