import { useTranslation } from 'react-i18next'

import { VegMark } from '@/components/global/veg-mark'

import type { DietFilter } from './helper'
import { Chip, Row } from './styled'

export interface MenuFiltersProps {
  diet: DietFilter
  onDiet: (value: DietFilter) => void
  /** Drop the row's own inset so the chips can share another scroller. */
  inline?: boolean
}

export function MenuFilters({ diet, onDiet, inline }: MenuFiltersProps) {
  const { t } = useTranslation(['customer', 'common'])

  return (
    <Row $inline={inline} role="group" aria-label={t('menu.dietFilters')}>
      <Chip type="button" $active={diet === 'veg'} $tone="veg" onClick={() => onDiet(diet === 'veg' ? 'all' : 'veg')}>
        <VegMark veg size={14} />
        {t('common:labels.veg')}
      </Chip>
      <Chip
        type="button"
        $active={diet === 'nonveg'}
        $tone="nonveg"
        onClick={() => onDiet(diet === 'nonveg' ? 'all' : 'nonveg')}
      >
        <VegMark veg={false} size={14} />
        {t('common:labels.nonVeg')}
      </Chip>
    </Row>
  )
}
