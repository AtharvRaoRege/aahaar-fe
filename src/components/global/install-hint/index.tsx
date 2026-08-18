import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'

import { useInstallHint } from './helper'
import { Actions, Banner, Copy, Title } from './styled'

export function InstallHint() {
  const { t } = useTranslation('common')
  const hint = useInstallHint()
  if (!hint.visible) return null

  return (
    <Banner role="dialog" aria-label={t('install.title')} $lifted={hint.lifted}>
      <Copy>
        <Title>{t('install.title')}</Title>
        <p>{hint.iosHint ? t('install.iosHint') : t('install.body')}</p>
      </Copy>
      <Actions>
        {hint.canInstall && (
          <Button size="sm" onClick={() => void hint.install()}>
            {t('install.add')}
          </Button>
        )}
        <Button size="sm" variant="ghost" onClick={hint.dismiss}>
          {t('install.later')}
        </Button>
      </Actions>
    </Banner>
  )
}
