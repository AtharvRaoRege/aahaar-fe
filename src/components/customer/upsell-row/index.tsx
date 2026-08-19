import { useTranslation } from 'react-i18next'

import { formatMoney } from '@/utils/format'
import type { UpsellSuggestion } from '@/types/menu'

import { useCartUpsells } from './helper'
import {
  Info,
  Label,
  Name,
  Price,
  Rail,
  Suggestion,
  Thumb,
  ThumbFallback,
  Wrap,
} from './styled'

export interface UpsellRowProps {
  slug: string
  currency: string
  cartItemIds: string[]
  isInCart: (menuItemId: string) => boolean
  onAdd: (suggestion: UpsellSuggestion) => void
}

export function UpsellRow({
  slug,
  currency,
  cartItemIds,
  isInCart,
  onAdd,
}: UpsellRowProps) {
  const { t } = useTranslation(['customer', 'common'])
  const { suggestions } = useCartUpsells(slug, cartItemIds, isInCart)

  if (suggestions.length === 0) return null

  return (
    <Wrap>
      <Label>{t('upsell.title')}</Label>
      <Rail>
        {suggestions.map((suggestion) => (
          <Suggestion
            key={suggestion.menuItemId}
            type="button"
            onClick={() => onAdd(suggestion)}
          >
            {suggestion.imageUrl ? (
              <Thumb src={suggestion.imageUrl} alt="" loading="lazy" />
            ) : (
              <ThumbFallback aria-hidden>+</ThumbFallback>
            )}
            <Info>
              <Name>{suggestion.name}</Name>
              <Price>
                {formatMoney(suggestion.basePrice, currency)} · {t('upsell.add')}
              </Price>
            </Info>
          </Suggestion>
        ))}
      </Rail>
    </Wrap>
  )
}
