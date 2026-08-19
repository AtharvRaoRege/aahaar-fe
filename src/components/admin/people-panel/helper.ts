import type { TFunction } from 'i18next'

import type { ActionMenuItem } from '@/components/global/action-menu/helper'
import type { AdminMember } from '@/types/admin'

export function peopleActions(
  entry: AdminMember,
  copied: string,
  canBlock: boolean,
  t: TFunction,
): ActionMenuItem[] {
  const waiting = entry.approvalStatus === 'WAITLIST' && entry.isActive
  const items: ActionMenuItem[] = []
  if (waiting) {
    items.push({ id: 'approve', label: t('admin.approve') })
    items.push({ id: 'reject', label: t('admin.reject') })
  }
  if (entry.hasRestaurant) items.push({ id: 'open', label: t('admin.openKitchen') })
  if (canBlock && entry.isActive && !waiting) items.push({ id: 'block', label: t('admin.block') })
  if (canBlock && !entry.isActive) items.push({ id: 'unblock', label: t('admin.unblock') })
  items.push({
    id: 'copy',
    label: copied === `email-${entry.id}` ? t('admin.copied') : t('admin.copyEmail'),
  })
  return items
}

export function runPeopleAction(
  id: string,
  entry: AdminMember,
  handlers: {
    onApprove: (id: string) => void
    onOpen: (member: AdminMember) => void
    onReject: (member: AdminMember) => void
    onLock: (member: AdminMember) => void
    onUnlock: (member: AdminMember) => void
    onCopyEmail: (member: AdminMember) => void
  },
) {
  if (id === 'approve') handlers.onApprove(entry.id)
  if (id === 'reject') handlers.onReject(entry)
  if (id === 'open') handlers.onOpen(entry)
  if (id === 'block') handlers.onLock(entry)
  if (id === 'unblock') handlers.onUnlock(entry)
  if (id === 'copy') handlers.onCopyEmail(entry)
}
