import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'
import { Skeleton } from '@/components/global/skeleton'

import { usePublishBar } from './helper'
import {
  Bar,
  Blocker,
  Blockers,
  ErrorText,
  Hint,
  Left,
  Pill,
  Row,
  SuggestLabel,
} from './styled'

export interface PublishBarProps {
  restaurantId: string
}

export function PublishBar({ restaurantId }: PublishBarProps) {
  const { t } = useTranslation('dashboard')
  const bar = usePublishBar(restaurantId)

  if (bar.isLoading || !bar.readiness) return <Skeleton height="72px" />

  const live = bar.readiness.isPublished

  return (
    <Bar $live={live}>
      <Row>
        <Left>
          <Pill $live={live}>{live ? t('publish.live') : t('publish.draft')}</Pill>
          <Hint>{live ? t('publish.liveHint') : t('publish.draftHint')}</Hint>
        </Left>
        {live ? (
          <Button size="sm" variant="outline" loading={bar.busy} onClick={bar.takeOffline}>
            {t('publish.takeOffline')}
          </Button>
        ) : (
          <Button size="sm" loading={bar.busy} onClick={bar.goLive}>
            {t('publish.goLive')}
          </Button>
        )}
      </Row>
      {bar.blockers.length > 0 && (
        <>
          <SuggestLabel>{t('publish.suggestions')}</SuggestLabel>
          <Blockers>
            {bar.blockers.map((key) => (
              <Blocker key={key}>{t(`publish.blockers.${key}`)}</Blocker>
            ))}
          </Blockers>
        </>
      )}
      {bar.error && <ErrorText>{bar.error}</ErrorText>}
    </Bar>
  )
}
