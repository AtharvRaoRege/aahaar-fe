import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'
import { QuantityControl } from '@/components/global/quantity-control'
import { VegMark } from '@/components/global/veg-mark'
import { SPICE_LEVELS } from '@/constants/spice'
import { formatMoney } from '@/utils/format'
import type { MenuItem } from '@/types/menu'

import {
  Body,
  Desc,
  FootRow,
  ImageButton,
  ImageFallback,
  MetaRow,
  Name,
  Price,
  SoldOut,
  Spice,
  Wrap,
} from './styled'

export interface FoodCardProps {
  item: MenuItem
  quantity: number
  currency: string
  hasOptions: boolean
  onAdd: () => void
  onIncrement: () => void
  onDecrement: () => void
  onOpen: () => void
}

export function FoodCard({
  item,
  quantity,
  currency,
  hasOptions,
  onAdd,
  onIncrement,
  onDecrement,
  onOpen,
}: FoodCardProps) {
  const { t } = useTranslation(['customer', 'common'])
  const spice = SPICE_LEVELS[item.spiceLevel]?.chilies

  return (
    <Wrap $unavailable={!item.isAvailable}>
      <ImageButton type="button" onClick={onOpen} aria-label={item.name}>
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} loading="lazy" />
        ) : (
          <ImageFallback aria-hidden>🍲</ImageFallback>
        )}
        {!item.isAvailable && <SoldOut>{t('menu.unavailable')}</SoldOut>}
      </ImageButton>

      <Body>
        <MetaRow>
          <VegMark veg={item.isVegetarian} />
          {spice && <Spice aria-hidden>{spice}</Spice>}
        </MetaRow>
        <Name>{item.name}</Name>
        {item.description && <Desc>{item.description}</Desc>}
        <FootRow>
          <Price>{formatMoney(item.basePrice, currency)}</Price>
          {!item.isAvailable ? null : quantity > 0 && !hasOptions ? (
            <QuantityControl
              value={quantity}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              size="sm"
            />
          ) : (
            <Button
              size="sm"
              onClick={hasOptions ? onOpen : onAdd}
              leftIcon={<Plus aria-hidden />}
            >
              {t('common:actions.add')}
            </Button>
          )}
        </FootRow>
      </Body>
    </Wrap>
  )
}
