import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'
import { QuantityControl } from '@/components/global/quantity-control'
import { VegMark } from '@/components/global/veg-mark'
import { SPICE_LEVELS } from '@/constants/spice'
import { formatMoney } from '@/utils/format'
import type { MenuItem } from '@/types/menu'

import { hasDishImage, isBestseller, isCustomizable } from './helper'
import {
  ActionSlot,
  Body,
  CustomTag,
  Desc,
  FootRow,
  ImageButton,
  MetaRow,
  Name,
  Price,
  PriceBlock,
  Spice,
  Tag,
  TitleHit,
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
  const photo = hasDishImage(item)
  const customizable = isCustomizable(item)
  const bestseller = isBestseller(item)
  const addControl =
    !item.isAvailable ? null : quantity > 0 && !hasOptions ? (
      <QuantityControl
        value={quantity}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        size="sm"
      />
    ) : (
      <Button size="sm" onClick={hasOptions ? onOpen : onAdd} leftIcon={<Plus aria-hidden />}>
        {t('common:actions.add')}
      </Button>
    )

  return (
    <Wrap $unavailable={!item.isAvailable} $hasImage={photo}>
      <Body $hasImage={photo}>
        <TitleHit type="button" onClick={onOpen} aria-label={item.name}>
          <MetaRow>
            <VegMark veg={item.isVegetarian} size={18} />
            {spice && <Spice aria-hidden>{spice}</Spice>}
            {bestseller && <Tag $tone="best">{t('menu.bestseller')}</Tag>}
            {!item.isAvailable && <Tag $tone="sold">{t('menu.unavailable')}</Tag>}
          </MetaRow>
          <Name>{item.name}</Name>
          {item.description && <Desc>{item.description}</Desc>}
        </TitleHit>
        <FootRow>
          <PriceBlock>
            <Price>{formatMoney(item.basePrice, currency)}</Price>
            {customizable && <CustomTag>{t('menu.customizable')}</CustomTag>}
          </PriceBlock>
          {addControl && <ActionSlot $hasImage={photo}>{addControl}</ActionSlot>}
        </FootRow>
      </Body>

      {photo && (
        <ImageButton
          type="button"
          onClick={onOpen}
          aria-label={item.name}
          disabled={!item.isAvailable}
        >
          <img src={item.imageUrl ?? ''} alt="" loading="lazy" />
        </ImageButton>
      )}
    </Wrap>
  )
}
