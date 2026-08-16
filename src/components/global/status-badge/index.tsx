import { useTranslation } from 'react-i18next'

import { ORDER_STATUS_VISUAL } from '@/constants/order-status'
import type { OrderStatus } from '@/types/order'

import { Pill } from './styled'

export interface StatusBadgeProps {
  status: OrderStatus
  pulse?: boolean
}

export function StatusBadge({ status, pulse }: StatusBadgeProps) {
  const { t } = useTranslation('common')
  const visual = ORDER_STATUS_VISUAL[status]
  const Icon = visual.icon
  return (
    <Pill $bg={visual.bg} $fg={visual.fg} $pulse={pulse}>
      <Icon aria-hidden />
      {t(`status.${status}`)}
    </Pill>
  )
}
