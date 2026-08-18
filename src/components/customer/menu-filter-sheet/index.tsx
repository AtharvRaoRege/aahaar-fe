import { useTranslation } from 'react-i18next'

import { Chip } from '@/components/customer/menu-filters/styled'
import { BottomSheet } from '@/components/global/bottom-sheet'
import { Button } from '@/components/global/button'

import type { MenuFilterSheetProps } from './helper'
import { Actions, Block, ChipWrap, Hint, Label } from './styled'

export function MenuFilterSheet({
  open,
  priceBand,
  sort,
  onPriceBand,
  onSort,
  onClear,
  onClose,
}: MenuFilterSheetProps) {
  const { t } = useTranslation(['customer', 'common'])

  return (
    <BottomSheet open={open} onClose={onClose} title={t('menu.openFilters')}>
      <Hint>{t('menu.filterHint')}</Hint>
      <Block>
        <Label>{t('menu.priceFilters')}</Label>
        <ChipWrap>
          <Chip
            type="button"
            $active={priceBand === 'all'}
            $tone="plain"
            onClick={() => onPriceBand('all')}
          >
            {t('menu.priceAny')}
          </Chip>
          <Chip
            type="button"
            $active={priceBand === 'under'}
            $tone="plain"
            onClick={() => onPriceBand(priceBand === 'under' ? 'all' : 'under')}
          >
            {t('menu.priceUnder')}
          </Chip>
          <Chip
            type="button"
            $active={priceBand === 'mid'}
            $tone="plain"
            onClick={() => onPriceBand(priceBand === 'mid' ? 'all' : 'mid')}
          >
            {t('menu.priceMid')}
          </Chip>
          <Chip
            type="button"
            $active={priceBand === 'over'}
            $tone="plain"
            onClick={() => onPriceBand(priceBand === 'over' ? 'all' : 'over')}
          >
            {t('menu.priceOver')}
          </Chip>
        </ChipWrap>
      </Block>
      <Block>
        <Label>{t('menu.sortFilters')}</Label>
        <ChipWrap>
          <Chip
            type="button"
            $active={sort === 'asc'}
            $tone="plain"
            onClick={() => onSort(sort === 'asc' ? 'menu' : 'asc')}
          >
            {t('menu.sortLow')}
          </Chip>
          <Chip
            type="button"
            $active={sort === 'desc'}
            $tone="plain"
            onClick={() => onSort(sort === 'desc' ? 'menu' : 'desc')}
          >
            {t('menu.sortHigh')}
          </Chip>
        </ChipWrap>
      </Block>
      <Actions>
        <Button variant="outline" fullWidth type="button" onClick={onClear}>
          {t('menu.clearFilters')}
        </Button>
        <Button fullWidth type="button" onClick={onClose}>
          {t('menu.applyFilters')}
        </Button>
      </Actions>
    </BottomSheet>
  )
}
