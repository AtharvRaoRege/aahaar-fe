import { Check, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { BottomSheet } from '@/components/global/bottom-sheet'
import { Button } from '@/components/global/button'
import { QuantityControl } from '@/components/global/quantity-control'
import { TextArea } from '@/components/global/field'
import type { AddToCartInput } from '@/lib/cart/cart-context'
import { formatMoney } from '@/utils/format'
import type { MenuItem } from '@/types/menu'

import { useFoodDetails } from './helper'
import {
  Cover,
  Desc,
  Footer,
  Option,
  Section,
  SectionLabel,
  Title,
} from './styled'

export interface FoodDetailsSheetProps {
  item: MenuItem | null
  open: boolean
  currency: string
  readOnly?: boolean
  onClose: () => void
  onConfirm: (item: MenuItem, input: AddToCartInput) => void
}

export function FoodDetailsSheet({
  item,
  open,
  currency,
  readOnly = false,
  onClose,
  onConfirm,
}: FoodDetailsSheetProps) {
  const { t } = useTranslation(['customer', 'common'])
  const state = useFoodDetails(item)

  if (!item) return null

  const confirm = () => {
    if (readOnly) return
    onConfirm(item, state.buildInput())
    onClose()
  }

  return (
    <BottomSheet open={open} onClose={onClose}>
      <Cover>
        {item.imageUrl ? <img src={item.imageUrl} alt={item.name} /> : <span aria-hidden>🍛</span>}
      </Cover>
      <Title>{item.name}</Title>
      {item.description && <Desc>{item.description}</Desc>}

      {item.variants.length > 0 && (
        <Section>
          <SectionLabel>{t('detail.variant')}</SectionLabel>
          {item.variants.map((variant) => (
            <Option
              key={variant.id}
              type="button"
              $selected={state.variantId === variant.id}
              disabled={readOnly}
              onClick={() => state.setVariantId(variant.id)}
            >
              <span>{variant.name}</span>
              <span>
                {variant.priceDelta > 0 ? `+${formatMoney(variant.priceDelta, currency)}` : '—'}
              </span>
            </Option>
          ))}
        </Section>
      )}

      {item.addons.length > 0 && (
        <Section>
          <SectionLabel>{t('detail.addons')}</SectionLabel>
          {item.addons
            .filter((addon) => addon.isAvailable)
            .map((addon) => (
              <Option
                key={addon.id}
                type="button"
                $selected={state.addonIds.includes(addon.id)}
                disabled={readOnly}
                onClick={() => state.toggleAddon(addon.id)}
              >
                <span>
                  {state.addonIds.includes(addon.id) && <Check aria-hidden size={16} />} {addon.name}
                </span>
                <span>+{formatMoney(addon.price, currency)}</span>
              </Option>
            ))}
        </Section>
      )}

      <Section>
        <SectionLabel>{t('detail.notes')}</SectionLabel>
        <TextArea
          placeholder={t('detail.notesPlaceholder')}
          value={state.notes}
          disabled={readOnly}
          onChange={(event) => state.setNotes(event.target.value)}
        />
      </Section>

      {!readOnly && (
        <Footer>
          <QuantityControl
            value={state.quantity}
            onIncrement={state.increment}
            onDecrement={state.decrement}
          />
          <Button fullWidth size="lg" leftIcon={<Plus aria-hidden />} onClick={confirm}>
            {t('detail.addToCart')} · {formatMoney(state.total, currency)}
          </Button>
        </Footer>
      )}
    </BottomSheet>
  )
}
