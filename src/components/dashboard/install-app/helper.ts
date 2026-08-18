import { useEffect, useState, useSyncExternalStore } from 'react'
import { useTranslation } from 'react-i18next'

import { currentPushPermission, disableKitchenPush, enableKitchenPush } from '@/lib/notify/push'
import { installStore } from '@/lib/pwa/install-store'
import { isAndroid, isIos, isStandalone, iosNeedsHomeScreen } from '@/utils/pwa/platform'

export function useInstallApp(restaurantId: string) {
  const { t } = useTranslation('dashboard')
  const deferred = useSyncExternalStore(
    installStore.subscribe,
    installStore.getDeferred,
    () => null,
  )
  const [installed, setInstalled] = useState(() => isStandalone())
  const [iosOpen, setIosOpen] = useState(false)
  const [installing, setInstalling] = useState(false)
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>('default')
  const [alertBusy, setAlertBusy] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    const onChange = () => setInstalled(isStandalone())
    const media = window.matchMedia('(display-mode: standalone)')
    media.addEventListener('change', onChange)
    void currentPushPermission().then(setPermission)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const install = async () => {
    if (isIos()) {
      setIosOpen(true)
      return
    }
    if (!deferred) return
    setInstalling(true)
    const outcome = await installStore.prompt()
    setInstalling(false)
    if (outcome === 'accepted') setInstalled(true)
  }

  const enableAlerts = async () => {
    setAlertBusy(true)
    setAlertMessage('')
    try {
      const result = await enableKitchenPush(restaurantId)
      if (result === 'granted') {
        setPermission('granted')
        setAlertMessage(t('settings.alertsOn'))
        return
      }
      if (result === 'install') {
        setAlertMessage(t('settings.alertsNeedInstall'))
        setIosOpen(true)
        return
      }
      setPermission('denied')
      setAlertMessage(t('settings.alertsDenied'))
    } catch {
      setAlertMessage(t('settings.alertsDenied'))
    } finally {
      setAlertBusy(false)
    }
  }

  const disableAlerts = async () => {
    setAlertBusy(true)
    await disableKitchenPush().catch(() => undefined)
    setPermission('default')
    setAlertBusy(false)
    setAlertMessage('')
  }

  return {
    installed,
    canPrompt: Boolean(deferred),
    isIos: isIos(),
    isAndroid: isAndroid(),
    iosNeedsHomeScreen: iosNeedsHomeScreen(),
    iosOpen,
    openIos: () => setIosOpen(true),
    closeIos: () => setIosOpen(false),
    installing,
    install,
    permission,
    alertBusy,
    alertMessage,
    enableAlerts,
    disableAlerts,
  }
}
