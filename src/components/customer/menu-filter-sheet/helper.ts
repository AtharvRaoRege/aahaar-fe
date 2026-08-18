import type { PriceBand, PriceSort } from '@/components/customer/menu-filters/helper'

export interface MenuFilterSheetProps {
  open: boolean
  priceBand: PriceBand
  sort: PriceSort
  onPriceBand: (value: PriceBand) => void
  onSort: (value: PriceSort) => void
  onClear: () => void
  onClose: () => void
}
