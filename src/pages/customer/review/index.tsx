import { useTranslation } from 'react-i18next'

import { ReviewForm } from '@/components/customer/review-form'
import { VenueFollow } from '@/components/customer/venue-follow'
import { Button } from '@/components/global/button'
import { useCustomerContext } from '@/hooks/customer/context'

import { usePublicReview } from './helper'
import { Hint, Kicker, Page, Title } from './styled'

export function ReviewPage() {
  const { t } = useTranslation(['customer', 'common'])
  const { restaurant, slug, tableNumber } = useCustomerContext()
  const page = usePublicReview(slug, tableNumber)

  return (
    <Page>
      <div>
        <Kicker>{restaurant.name}</Kicker>
        <Title>{t('review.pageTitle')}</Title>
        <Hint>{t('review.pageHint')}</Hint>
      </div>
      <ReviewForm
        submitted={page.submitted}
        loading={page.loading}
        error={page.error}
        onSubmit={page.submit}
      />
      <VenueFollow restaurant={restaurant} />
      {tableNumber && (
        <Button variant="outline" fullWidth onClick={page.goMenu}>
          {t('track.reorder')}
        </Button>
      )}
    </Page>
  )
}
