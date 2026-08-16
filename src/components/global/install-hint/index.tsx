import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { Button } from '@/components/global/button'

import { Actions, Banner, Copy, Title } from './styled'

const DISMISS_KEY = 'aahaar.installHint'

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: minimal-ui)').matches ||
    Boolean((navigator as Navigator & { standalone?: boolean }).standalone)
  )
}

function isIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent)
}

export function InstallHint() {
  const { t } = useTranslation('common')
  const location = useLocation()
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)
  const iosHint = isIos()
  const [hidden, setHidden] = useState(() => localStorage.getItem(DISMISS_KEY) === '1')

  useEffect(() => {
    if (isStandalone() || hidden) return

    const onPrompt = (event: Event) => {
      event.preventDefault()
      setDeferred(event as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    return () => window.removeEventListener('beforeinstallprompt', onPrompt)
  }, [hidden])

  if (hidden || isStandalone() || (!deferred && !iosHint)) return null

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, '1')
    setHidden(true)
  }

  const install = async () => {
    if (!deferred) return
    await deferred.prompt()
    setDeferred(null)
    dismiss()
  }

  return (
    <Banner
      role="dialog"
      aria-label={t('install.title')}
      $lifted={location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/r/')}
    >
      <Copy>
        <Title>{t('install.title')}</Title>
        <p>{iosHint && !deferred ? t('install.iosHint') : t('install.body')}</p>
      </Copy>
      <Actions>
        {deferred && (
          <Button size="sm" onClick={() => void install()}>
            {t('install.add')}
          </Button>
        )}
        <Button size="sm" variant="ghost" onClick={dismiss}>
          {t('install.later')}
        </Button>
      </Actions>
    </Banner>
  )
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
}
