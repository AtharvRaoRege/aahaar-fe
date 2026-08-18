import { useTranslation } from 'react-i18next'

import { StarRating } from '@/components/global/star-rating'
import type { Review } from '@/types/review'
import { formatDate } from '@/utils/format'

import { Body, Card, DateText, Improve, Top } from './styled'

export function ReviewCard({ review }: { review: Review }) {
  const { t } = useTranslation('dashboard')

  return (
    <Card>
      <Top>
        <StarRating value={review.rating} readOnly size="sm" />
        <DateText>{formatDate(review.createdAt)}</DateText>
      </Top>
      {review.comment && <Body>{review.comment}</Body>}
      {review.improvement && (
        <Improve>
          {t('ratings.improveLabel')}: {review.improvement}
        </Improve>
      )}
    </Card>
  )
}
