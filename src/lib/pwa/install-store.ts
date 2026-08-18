export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

type Listener = () => void

let deferred: BeforeInstallPromptEvent | null = null
const listeners = new Set<Listener>()

function emit() {
  listeners.forEach((listener) => listener())
}

export function captureInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
    deferred = event as BeforeInstallPromptEvent
    emit()
  })
  window.addEventListener('appinstalled', () => {
    deferred = null
    emit()
  })
}

export const installStore = {
  getDeferred: () => deferred,
  subscribe(listener: Listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  async prompt(): Promise<'accepted' | 'dismissed' | 'unavailable'> {
    if (!deferred) return 'unavailable'
    const event = deferred
    deferred = null
    emit()
    await event.prompt()
    const choice = await event.userChoice
    return choice.outcome
  },
}
