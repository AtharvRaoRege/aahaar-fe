import { useEffect, useState, useSyncExternalStore } from 'react'
import { useLocation } from 'react-router-dom'

import { installStore } from '@/lib/pwa/install-store'
import { isIos, isStandalone } from '@/utils/pwa/platform'

const DISMISS_KEY = 'aahaar.installHint'

export function useInstallHint() {
  const location = useLocation()
  const deferred = useSyncExternalStore(
    installStore.subscribe,
    installStore.getDeferred,
    () => null,
  )
  const iosHint = isIos()
  const [hidden, setHidden] = useState(() => localStorage.getItem(DISMISS_KEY) === '1')
  const [standalone, setStandalone] = useState(() => isStandalone())

  useEffect(() => {
    const onChange = () => setStandalone(isStandalone())
    const media = window.matchMedia('(display-mode: standalone)')
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, '1')
    setHidden(true)
  }

  const install = async () => {
    const outcome = await installStore.prompt()
    if (outcome === 'accepted') dismiss()
  }

  const visible = !hidden && !standalone && (Boolean(deferred) || iosHint)
  const lifted =
    location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/r/')

  return {
    visible,
    iosHint: iosHint && !deferred,
    lifted,
    canInstall: Boolean(deferred),
    dismiss,
    install,
  }
}
