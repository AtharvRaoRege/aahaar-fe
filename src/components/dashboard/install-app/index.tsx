import { Bell, BellOff, Check, Smartphone } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { BottomSheet } from '@/components/global/bottom-sheet'
import { Button } from '@/components/global/button'

import { useInstallApp } from './helper'
import {
  Card,
  Copy,
  Heading,
  HeroCard,
  Hint,
  InkCopy,
  Kicker,
  Row,
  Stack,
  Status,
  Step,
  StepCopy,
  StepIndex,
  Steps,
} from './styled'

export function InstallApp({ restaurantId }: { restaurantId: string }) {
  const { t } = useTranslation('dashboard')
  const page = useInstallApp(restaurantId)
  const alertsOn = page.permission === 'granted'

  return (
    <>
      <Stack>
      <HeroCard>
        <Kicker>{t('settings.installKicker')}</Kicker>
        <Heading>{t('settings.installTitle')}</Heading>
        <Copy>{t('settings.installBody')}</Copy>
        {page.installed ? (
          <Status $ok $light>
            <Check aria-hidden /> {t('settings.installDone')}
          </Status>
        ) : (
          <Row>
            <Button
              type="button"
              onClick={() => void page.install()}
              loading={page.installing}
              leftIcon={<Smartphone aria-hidden />}
            >
              {page.isIos ? t('settings.installIos') : t('settings.installAndroid')}
            </Button>
            {!page.canPrompt && !page.isIos && (
              <Button type="button" variant="outline" onClick={page.openIos}>
                {t('settings.installHow')}
              </Button>
            )}
          </Row>
        )}
        {!page.installed && !page.canPrompt && page.isAndroid && (
          <Copy>{t('settings.installChromeHint')}</Copy>
        )}
      </HeroCard>

      <Card>
        <Kicker>{t('settings.alertsKicker')}</Kicker>
        <Heading>{t('settings.alertsTitle')}</Heading>
        <InkCopy>{t('settings.alertsBody')}</InkCopy>
        <Status $ok={alertsOn}>
          {alertsOn ? t('settings.alertsEnabled') : t('settings.alertsOff')}
        </Status>
        <Row>
          {alertsOn ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => void page.disableAlerts()}
              loading={page.alertBusy}
              leftIcon={<BellOff aria-hidden />}
            >
              {t('settings.alertsDisable')}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => void page.enableAlerts()}
              loading={page.alertBusy}
              leftIcon={<Bell aria-hidden />}
            >
              {t('settings.alertsEnable')}
            </Button>
          )}
        </Row>
        {page.alertMessage && <Hint>{page.alertMessage}</Hint>}
        {page.iosNeedsHomeScreen && <Hint>{t('settings.alertsNeedInstall')}</Hint>}
      </Card>
      </Stack>

      <BottomSheet open={page.iosOpen} onClose={page.closeIos} title={t('settings.installStepsTitle')}>
        <Steps>
          <Step>
            <StepIndex>1</StepIndex>
            <StepCopy>{page.isIos ? t('settings.stepShare') : t('settings.stepMenu')}</StepCopy>
          </Step>
          <Step>
            <StepIndex>2</StepIndex>
            <StepCopy>{page.isIos ? t('settings.stepAdd') : t('settings.stepInstall')}</StepCopy>
          </Step>
          <Step>
            <StepIndex>3</StepIndex>
            <StepCopy>{t('settings.stepOpen')}</StepCopy>
          </Step>
        </Steps>
      </BottomSheet>
    </>
  )
}
