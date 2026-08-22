import type { MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { Crown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSyncExternalStore } from 'react'

import { Button } from '@/components/global/button'
import { useConfirmDialogLayer } from '@/components/global/confirm-dialog/helper'
import { proUpgradeStore } from '@/lib/dashboard/pro-upgrade-store'

import { closeProUpgrade, goToProPlan, useProUpgradeFromApi } from './helper'
import { Actions, Badge, Body, Card, Message, Overlay, Title } from './styled'

export function ProUpgradeModal() {
  const { t } = useTranslation(['dashboard', 'common'])
  const navigate = useNavigate()
  const open = useSyncExternalStore(
    proUpgradeStore.subscribe,
    proUpgradeStore.getSnapshot,
    proUpgradeStore.getSnapshot,
  )

  useProUpgradeFromApi()
  useConfirmDialogLayer(open, closeProUpgrade)

  if (!open) return null

  const stop = (event: MouseEvent) => event.stopPropagation()

  return createPortal(
    <Overlay
      onClick={closeProUpgrade}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pro-upgrade-title"
      aria-describedby="pro-upgrade-message"
    >
      <Card onClick={stop}>
        <Badge>
          <Crown aria-hidden />
          {t('plan.proOnly')}
        </Badge>
        <Title id="pro-upgrade-title">{t('plan.upgradeModalTitle')}</Title>
        <Message id="pro-upgrade-message">{t('plan.upgradeModalBody')}</Message>
        <Body>{t('plan.upgradeModalHint')}</Body>
        <Actions>
          <Button type="button" variant="outline" onClick={closeProUpgrade}>
            {t('common:actions.cancel')}
          </Button>
          <Button type="button" onClick={() => goToProPlan(navigate)}>
            {t('plan.upgradeModalCta')}
          </Button>
        </Actions>
      </Card>
    </Overlay>,
    document.body,
  )
}
