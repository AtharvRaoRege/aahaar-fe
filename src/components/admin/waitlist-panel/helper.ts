import type { TFunction } from 'i18next'

import type { ActionMenuItem } from '@/components/global/action-menu/helper'
import type { WaitlistUser } from '@/types/auth'

export { formatJoined } from '@/pages/dashboard/admin/helper'

export function waitlistActions(entry: WaitlistUser, copied: string, t: TFunction): ActionMenuItem[] {
  const items: ActionMenuItem[] = [
    { id: 'approve', label: t('admin.approve') },
    { id: 'reject', label: t('admin.reject') },
    {
      id: 'email',
      label: copied === `email-${entry.id}` ? t('admin.copied') : t('admin.copyEmail'),
    },
  ]
  if (entry.phone) {
    items.push({
      id: 'phone',
      label: copied === `phone-${entry.id}` ? t('admin.copied') : t('admin.copyPhone'),
    })
  }
  return items
}
