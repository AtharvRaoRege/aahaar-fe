import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'
import { TextArea } from '@/components/global/field'
import { StarRating } from '@/components/global/star-rating'

import { REVIEW_TAGS } from '@/constants/review-tags'

import { useReviewForm } from './helper'
import { Card, ErrorText, Kicker, StarsWrap, TagChip, TagRow, Thanks, Title } from './styled'

export interface ReviewFormProps {
  submitted?: boolean
  loading?: boolean
  error?: string
  onSubmit: (values: { rating: number; comment: string; improvement: string }) => void
}

export function ReviewForm({ submitted, loading, error, onSubmit }: ReviewFormProps) {
  const { t } = useTranslation(['customer', 'common'])
  const form = useReviewForm()

  if (submitted) {
    return (
      <Card>
        <Kicker>{t('review.kicker')}</Kicker>
        <Title>{t('review.thanksTitle')}</Title>
        <Thanks>{t('review.thanks')}</Thanks>
      </Card>
    )
  }

  return (
    <Card>
      <Kicker>{t('review.kicker')}</Kicker>
      <Title>{t('review.title')}</Title>
      <StarsWrap>
        <StarRating
          value={form.form.rating}
          size="lg"
          label={t('review.stars')}
          onChange={form.setRating}
        />
        {form.missing && <ErrorText>{t('review.needStars')}</ErrorText>}
        {error && <ErrorText>{error}</ErrorText>}
      </StarsWrap>
      <TagRow>
        {REVIEW_TAGS.map((tag) => (
          <TagChip
            key={tag.id}
            type="button"
            $active={form.tags.has(tag.id)}
            onClick={() => form.toggleTag(tag.id)}
          >
            {t(`review.tags.${tag.id}`)}
          </TagChip>
        ))}
      </TagRow>
      <TextArea
        label={t('review.comment')}
        placeholder={t('review.commentPlaceholder')}
        rows={3}
        value={form.form.comment}
        onChange={(event) => form.setComment(event.target.value)}
      />
      <TextArea
        label={t('review.improvement')}
        placeholder={t('review.improvementPlaceholder')}
        rows={3}
        value={form.form.improvement}
        onChange={(event) => form.setImprovement(event.target.value)}
      />
      <Button type="button" fullWidth loading={loading} onClick={() => form.submit(onSubmit)}>
        {t('review.submit')}
      </Button>
    </Card>
  )
}
