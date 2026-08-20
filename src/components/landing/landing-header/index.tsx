import { useTranslation } from 'react-i18next'

import { BrandMark } from '@/components/global/brand-mark'
import { useScrollProgress } from '@/hooks/landing/use-reveal/helper'

import {
  Actions,
  Bar,
  Brand,
  Cta,
  LabelLong,
  LabelShort,
  NavLink,
  Progress,
} from './styled'

interface LandingHeaderProps {
  isAuthenticated: boolean
  pricingId: string
  onPrimary: () => void
}

/**
 * Sticky bar with the brand, one courtesy link and one call to action.
 */
export function LandingHeader({ isAuthenticated, pricingId, onPrimary }: LandingHeaderProps) {
  const { t } = useTranslation('common')
  const progress = useScrollProgress()

  return (
    <Bar>
      <Brand href="#top">
        <BrandMark size={26} />
        <span>{t('appName')}</span>
      </Brand>
      <Actions>
        <NavLink href={`#${pricingId}`}>{t('landing.skipToPricing')}</NavLink>
        <Cta type="button" onClick={onPrimary}>
          {isAuthenticated ? (
            <>
              <LabelLong>{t('landing.enterKitchen')}</LabelLong>
              <LabelShort>{t('landing.kitchenShort')}</LabelShort>
            </>
          ) : (
            t('landing.login')
          )}
        </Cta>
      </Actions>
      <Progress
        $value={progress}
        role="progressbar"
        aria-label={t('landing.progressLabel')}
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </Bar>
  )
}
