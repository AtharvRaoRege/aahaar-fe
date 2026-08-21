import { useTranslation } from 'react-i18next'

import { useRotatingWaitFact } from './helper'
import { FactCard, FactKicker, FactText, TimerFill, TimerTrack } from './styled'

export interface WaitFactsProps {
  enabled: boolean
}

export function WaitFacts({ enabled }: WaitFactsProps) {
  const { t } = useTranslation('customer')
  const fact = useRotatingWaitFact(enabled)

  if (!enabled || !fact) return null

  return (
    <FactCard aria-live="polite">
      <FactKicker>{t('track.factTitle')}</FactKicker>
      <FactText key={fact}>{fact}</FactText>
      <TimerTrack aria-hidden>
        <TimerFill key={fact} />
      </TimerTrack>
    </FactCard>
  )
}
