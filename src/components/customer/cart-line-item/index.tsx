import { Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { IconButton } from '@/components/global/icon-button'
import { QuantityControl } from '@/components/global/quantity-control'
import { VegMark } from '@/components/global/veg-mark'
import type { CartLine } from '@/lib/cart/cart-context'
import { formatMoney } from '@/utils/format'

import { lineMeta } from './helper'
import { Controls, Main, Meta, Name, Notes, Price, Row, Side, TopLine } from './styled'

export interface CartLineItemProps {
  line: CartLine
  currency: string
  onIncrement: () => void
  onDecrement: () => void
  onRemove: () => void
}

export function CartLineItem({
  line,
  currency,
  onIncrement,
  onDecrement,
  onRemove,
}: CartLineItemProps) {
  const { t } = useTranslation('common')
  const meta = lineMeta(line)

  return (
    <Row>
      <Main>
        <TopLine>
          <VegMark veg={line.item.isVegetarian} />
          <Name>{line.item.name}</Name>
        </TopLine>
        {meta && <Meta>{meta}</Meta>}
        {line.notes && <Notes>{line.notes}</Notes>}
        <Controls>
          <QuantityControl
            value={line.quantity}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            size="sm"
          />
          <Price>{formatMoney(line.unitPrice * line.quantity, currency)}</Price>
        </Controls>
      </Main>
      <Side>
        <IconButton
          label={t('actions.remove')}
          icon={<Trash2 aria-hidden />}
          size="sm"
          tone="danger"
          onClick={onRemove}
        />
      </Side>
    </Row>
  )
}
