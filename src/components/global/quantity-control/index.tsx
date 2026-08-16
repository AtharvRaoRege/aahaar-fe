import { Minus, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { QtyButton, Value, Wrap } from './styled'

export interface QuantityControlProps {
  value: number
  onIncrement: () => void
  onDecrement: () => void
  size?: 'sm' | 'md'
}

export function QuantityControl({
  value,
  onIncrement,
  onDecrement,
  size = 'md',
}: QuantityControlProps) {
  const { t } = useTranslation('common')
  return (
    <Wrap $size={size}>
      <QtyButton type="button" onClick={onDecrement} aria-label={t('actions.decrease')}>
        <Minus aria-hidden />
      </QtyButton>
      <Value aria-live="polite">{value}</Value>
      <QtyButton type="button" onClick={onIncrement} aria-label={t('actions.increase')}>
        <Plus aria-hidden />
      </QtyButton>
    </Wrap>
  )
}
