import { useTranslation } from 'react-i18next'

import { EmptyState } from '@/components/global/empty-state'

import { Page } from './styled'

export function WelcomePage() {
  const { t } = useTranslation(['customer', 'common'])
  return (
    <Page>
      <EmptyState
        emoji="📱"
        title={t('welcome.scanTitle')}
        hint={t('welcome.scanHint')}
      />
    </Page>
  )
}
