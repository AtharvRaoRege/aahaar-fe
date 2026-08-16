const KEY = 'aahaar.restaurantId'

type Listener = () => void
const listeners = new Set<Listener>()

let snapshot: string | null = localStorage.getItem(KEY)

function refresh() {
  snapshot = localStorage.getItem(KEY)
  listeners.forEach((fn) => fn())
}

export const restaurantStore = {
  get(): string | null {
    return snapshot
  },
  getSnapshot(): string | null {
    return snapshot
  },
  set(id: string) {
    localStorage.setItem(KEY, id)
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
