import { Crown } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Badge, TitleRow } from './styled'

export function ProBadge() {
  const { t } = useTranslation('dashboard')
  return (
    <Badge>
      <Crown aria-hidden />
      {t('plan.proOnly')}
    </Badge>
  )
}

export function ProTitle({ children }: { children: ReactNode }) {
  return (
    <TitleRow>
      {children}
      <ProBadge />
    </TitleRow>
  )
}
