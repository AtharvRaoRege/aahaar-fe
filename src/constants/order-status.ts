import { Ban, Bell, Check, CheckCheck, Clock, Flame, Utensils, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { palette } from '@/styles/theme'
import type { OrderStatus } from '@/types/order'
import { brandVar } from '@/utils/theme/brand-palette'

export interface StatusVisual {
  bg: string
  fg: string
  icon: LucideIcon
}

export const ORDER_STATUS_VISUAL: Record<OrderStatus, StatusVisual> = {
  PENDING: { bg: palette.mango, fg: palette.ink, icon: Clock },
  ACCEPTED: { bg: palette.chutney, fg: palette.white, icon: Check },
  PREPARING: { bg: brandVar.primary, fg: brandVar.onPrimary, icon: Flame },
  READY: { bg: palette.violet, fg: palette.white, icon: Bell },
  SERVED: { bg: palette.chutney, fg: palette.white, icon: Utensils },
  COMPLETED: { bg: palette.ink, fg: palette.white, icon: CheckCheck },
  REJECTED: { bg: palette.chili, fg: palette.white, icon: X },
  CANCELLED: { bg: palette.inkSoft, fg: palette.white, icon: Ban },
}


