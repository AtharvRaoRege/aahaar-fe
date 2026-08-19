import type { AdminTab, PeopleView, VenueView } from '@/pages/dashboard/admin/helper'

export type OverviewKey = 'waiting' | 'plans' | 'live' | 'draft' | 'pro'

export const OVERVIEW_TILES: Array<{
  key: OverviewKey
  labelKey: string
  tab: AdminTab
  view?: VenueView | PeopleView
}> = [
  { key: 'waiting', labelKey: 'admin.overviewWaiting', tab: 'waitlist' },
  { key: 'plans', labelKey: 'admin.overviewPlans', tab: 'plans' },
  { key: 'live', labelKey: 'admin.overviewLive', tab: 'venues', view: 'live' },
  { key: 'draft', labelKey: 'admin.overviewDraft', tab: 'venues', view: 'draft' },
  { key: 'pro', labelKey: 'admin.overviewPro', tab: 'venues', view: 'pro' },
]

export function tileIsActive(
  tab: AdminTab,
  venueView: VenueView,
  tileTab: AdminTab,
  tileView?: VenueView | PeopleView,
) {
  if (tab !== tileTab) return false
  if (!tileView) return true
  return venueView === tileView
}
