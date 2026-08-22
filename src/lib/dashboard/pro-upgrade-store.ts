type Listener = () => void

const listeners = new Set<Listener>()
let open = false

function emit() {
  listeners.forEach((fn) => fn())
}

/** Global gate for “this is a Pro feature” — one modal for the whole dashboard. */
export const proUpgradeStore = {
  subscribe(listener: Listener) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
  getSnapshot() {
    return open
  },
  show() {
    if (open) return
    open = true
    emit()
  },
  hide() {
    if (!open) return
    open = false
    emit()
  },
}

export function showProUpgrade() {
  proUpgradeStore.show()
}
