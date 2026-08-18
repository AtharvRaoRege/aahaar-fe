import { Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { StarRatingProps } from './helper'
import { Row, StarButton } from './styled'

export function StarRating({
  value,
  onChange,
  size = 'md',
  readOnly = false,
  label,
  light = false,
}: StarRatingProps) {
  const { t } = useTranslation('common')
  const interactive = Boolean(onChange) && !readOnly

  return (
    <Row $size={size} role={interactive ? 'radiogroup' : 'img'} aria-label={label}>
      {[1, 2, 3, 4, 5].map((star) => {
        const on = star <= Math.round(value)
        return (
          <StarButton
            key={star}
            type="button"
            $on={on}
            $interactive={interactive}
            $light={light}
            aria-label={t('labels.stars', { count: star })}
            aria-checked={interactive ? value === star : undefined}
            role={interactive ? 'radio' : undefined}
            onClick={interactive ? () => onChange?.(star) : undefined}
          >
            <Star aria-hidden />
          </StarButton>
        )
      })}
    </Row>
  )
}
