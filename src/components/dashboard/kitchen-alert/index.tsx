import { Bell, ClipboardList, Star, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'

import { useKitchenAlerts } from './helper'
import {
  Body,
  Copy,
  Dismiss,
  IconBubble,
  SetupActions,
  SetupBar,
  Title,
  Toast,
} from './styled'

export function KitchenAlert({ restaurantId }: { restaurantId?: string }) {
  const { t } = useTranslation('dashboard')
  const page = useKitchenAlerts(restaurantId)
  const Icon =
    page.alert?.kind === 'review' ? Star : page.alert?.kind === 'waiter' ? Bell : ClipboardList

  return (
    <>
      {page.alert && (
        <Toast role="status">
          <IconBubble $kind={page.alert.kind}>
            <Icon aria-hidden />
          </IconBubble>
          <Copy>
            <Title>
              <Link to={page.alert.href} onClick={page.dismiss}>
                {page.alert.title}
              </Link>
            </Title>
            <Body>{page.alert.body}</Body>
          </Copy>
          <Dismiss type="button" aria-label={t('alerts.dismiss')} onClick={page.dismiss}>
            <X aria-hidden />
          </Dismiss>
        </Toast>
      )}
      {page.showSetup && (
        <SetupBar>
          <Title>{t('alerts.enableTitle')}</Title>
          <Body>{t('alerts.enableBody')}</Body>
          <SetupActions>
            <Button
              size="sm"
              type="button"
              loading={page.setupBusy}
              leftIcon={<Bell aria-hidden />}
              onClick={() => void page.enableAlerts()}
            >
              {t('alerts.enable')}
            </Button>
            <Button size="sm" variant="ghost" type="button" onClick={page.hideSetup}>
              {t('alerts.later')}
            </Button>
          </SetupActions>
        </SetupBar>
      )}
    </>
  )
}
