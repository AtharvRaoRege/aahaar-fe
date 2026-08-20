import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'
import { EmptyState } from '@/components/global/empty-state'
import { PageSkeleton } from '@/components/global/page-skeleton'
import type { Restaurant } from '@/types/restaurant'

import { useVenueScreen } from './helper'
import { Wrap } from './styled'

export function VenueScreen({
  cards = 3,
  children,
}: {
  cards?: number
  children: (restaurant: Restaurant) => ReactNode
}) {
  const { t } = useTranslation(['dashboard', 'common'])
  const screen = useVenueScreen()

  if (screen.status === 'loading') return <PageSkeleton cards={cards} />

  if (screen.status === 'error') {
    return (
      <Wrap>
        <EmptyState
          emoji="⚠️"
          title={t('gate.venueLoadFailed')}
          hint={t('gate.venueLoadHint')}
          action={
            <Button onClick={() => screen.refetchVenue()}>{t('gate.retry')}</Button>
          }
        />
      </Wrap>
    )
  }

  if (screen.status === 'empty') {
    return (
      <Wrap>
        <EmptyState
          emoji="🏪"
          title={t('gate.noVenueTitle')}
          hint={t('gate.noVenueHint')}
          action={
            <Button onClick={screen.goSetup}>
              {screen.isSuperAdmin ? t('admin.backAdmin') : t('admin.setupVenue')}
            </Button>
          }
        />
      </Wrap>
    )
  }

  return <>{children(screen.restaurant)}</>
}
