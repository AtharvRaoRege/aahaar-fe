import { useTranslation } from 'react-i18next'

import { StarRating } from '@/components/global/star-rating'
import type { ReviewSummary } from '@/types/review'

import { barWidth, starsFor } from './helper'
import {
  Average,
  BarRow,
  Bars,
  Card,
  Fill,
  Grid,
  Hero,
  HeroLabel,
  Label,
  Track,
  Value,
} from './styled'

export function RatingSummary({ summary }: { summary: ReviewSummary }) {
  const { t } = useTranslation('dashboard')
  const empty = summary.count === 0

  return (
    <Grid>
      <Hero>
        <HeroLabel>{t('ratings.average')}</HeroLabel>
        <Average>{empty ? '—' : summary.average.toFixed(1)}</Average>
        <StarRating value={empty ? 0 : summary.average} readOnly size="md" light />
        <HeroLabel>{t('ratings.count', { count: summary.count })}</HeroLabel>
      </Hero>
      <Card>
        <Label>{t('ratings.total')}</Label>
        <Value>{summary.count}</Value>
      </Card>
      <Card>
        <Label>{t('ratings.breakdown')}</Label>
        <Bars>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = starsFor(summary, star)
            return (
              <BarRow key={star}>
                <span>{star}</span>
                <Track>
                  <Fill $width={barWidth(count, summary.count)} />
                </Track>
                <span>{count}</span>
              </BarRow>
            )
          })}
        </Bars>
      </Card>
    </Grid>
  )
}
