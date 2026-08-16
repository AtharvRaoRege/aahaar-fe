import { ArrowRight, ShoppingCart } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { formatMoney } from '@/utils/format'

import { Bar, Left, Right } from './styled'

export interface CartBarProps {
  count: number
  total: number
  currency: string
  onClick: () => void
}

export function CartBar({ count, total, currency, onClick }: CartBarProps) {
  const { t } = useTranslation('common')
  if (count === 0) return null
  return (
    <Bar type="button" onClick={onClick} aria-label={t('actions.viewCart')}>
      <Left>
        <ShoppingCart aria-hidden />
        {t('labels.items', { count })}
      </Left>
      <Right>
        {formatMoney(total, currency)}
        <ArrowRight aria-hidden />
      </Right>
    </Bar>
  )
}
