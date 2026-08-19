import type { TFunction } from 'i18next'

import type { ActionMenuItem } from '@/components/global/action-menu/helper'
import type { AdminVenue } from '@/types/admin'

export { formatJoined } from '@/pages/dashboard/admin/helper'

export function kindLabel(kind: AdminVenue['venueKind'], t: TFunction) {
  if (kind === 'HOTEL') return t('setup.hotel')
  if (kind === 'CAFE') return t('setup.cafe')
  return t('setup.restaurant')
}

export function runVenueAction(
  id: string,
  venue: AdminVenue,
  handlers: {
    onOpen: (venue: AdminVenue) => void
    onCopyLink: (venue: AdminVenue) => void
    onPublish: (venue: AdminVenue, isPublished: boolean) => void
    onGivePro: (venue: AdminVenue) => void
    onSetBasic: (venue: AdminVenue) => void
  },
) {
  if (id === 'open') handlers.onOpen(venue)
  if (id === 'copy') handlers.onCopyLink(venue)
  if (id === 'publish') handlers.onPublish(venue, !venue.isPublished)
  if (id === 'plan' && venue.plan === 'PRO') handlers.onSetBasic(venue)
  if (id === 'plan' && venue.plan !== 'PRO') handlers.onGivePro(venue)
}

export function venueActions(
  venue: AdminVenue,
  copied: string,
  t: TFunction,
): ActionMenuItem[] {
  return [
    { id: 'open', label: t('admin.openKitchen') },
    {
      id: 'copy',
      label: copied === `link-${venue.id}` ? t('admin.copied') : t('admin.copyLink'),
    },
    { id: 'publish', label: venue.isPublished ? t('admin.unpublish') : t('admin.publish') },
    {
      id: 'plan',
      label: venue.plan === 'PRO' ? t('admin.makeBasic') : t('admin.makePro'),
    },
  ]
}
