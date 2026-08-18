import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { REVIEW_TAGS } from '@/constants/review-tags'
import type { ReviewTagId } from '@/constants/review-tags'

export interface ReviewFormValues {
  rating: number
  comment: string
  improvement: string
}

export function emptyReviewForm(): ReviewFormValues {
  return { rating: 0, comment: '', improvement: '' }
}

function joinBits(parts: string[]) {
  return parts.filter(Boolean).join('. ')
}

export function useReviewForm() {
  const { t } = useTranslation('customer')
  const [form, setForm] = useState(emptyReviewForm)
  const [missing, setMissing] = useState(false)
  const [tags, setTags] = useState<Set<ReviewTagId>>(new Set())

  return {
    form,
    missing,
    tags,
    toggleTag: (id: ReviewTagId) => {
      setTags((current) => {
        const next = new Set(current)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
    },
    setRating: (rating: number) => {
      setMissing(false)
      setForm((current) => ({ ...current, rating }))
    },
    setComment: (comment: string) => setForm((current) => ({ ...current, comment })),
    setImprovement: (improvement: string) =>
      setForm((current) => ({ ...current, improvement })),
    submit: (onSubmit: (values: ReviewFormValues) => void) => {
      if (form.rating < 1) {
        setMissing(true)
        return
      }
      const up = REVIEW_TAGS.filter((tag) => tag.tone === 'up' && tags.has(tag.id)).map((tag) =>
        t(`review.tags.${tag.id}`),
      )
      const down = REVIEW_TAGS.filter((tag) => tag.tone === 'down' && tags.has(tag.id)).map(
        (tag) => t(`review.tags.${tag.id}`),
      )
      onSubmit({
        rating: form.rating,
        comment: joinBits([form.comment.trim(), up.join(', ')]),
        improvement: joinBits([form.improvement.trim(), down.join(', ')]),
      })
    },
  }
}
