import type { TFunction } from 'i18next'

import type { ActionMenuItem } from '@/components/global/action-menu/helper'

export { formatJoined } from '@/pages/dashboard/admin/helper'

export function planActions(t: TFunction): ActionMenuItem[] {
  return [
    { id: 'approve', label: t('admin.approvePlan') },
    { id: 'reject', label: t('admin.rejectPlan') },
  ]
}
