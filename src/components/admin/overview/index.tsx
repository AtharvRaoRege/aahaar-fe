import { useTranslation } from 'react-i18next'

import { Skeleton } from '@/components/global/skeleton'

import type { AdminTab, PeopleView, VenueView } from '@/pages/dashboard/admin/helper'

import { OVERVIEW_TILES, tileIsActive } from './helper'
import { Grid, Tile, TileLabel, TileValue } from './styled'

export function AdminOverview({
  counts,
  loading,
  tab,
  venueView,
  onJump,
}: {
  counts: Record<(typeof OVERVIEW_TILES)[number]['key'], number>
  /** Counts default to 0 before they arrive, and a real 0 must not look like a wait. */
  loading?: boolean
  tab: AdminTab
  venueView: VenueView
  onJump: (next: AdminTab, view?: VenueView | PeopleView) => void
}) {
  const { t } = useTranslation('dashboard')

  return (
    <Grid>
      {OVERVIEW_TILES.map((tile) => (
        <Tile
          key={tile.key}
          type="button"
          $active={tileIsActive(tab, venueView, tile.tab, tile.view)}
          onClick={() => onJump(tile.tab, tile.view)}
        >
          <TileValue>
            {loading ? <Skeleton height="1em" width="28px" /> : counts[tile.key]}
          </TileValue>
          <TileLabel>{t(tile.labelKey)}</TileLabel>
        </Tile>
      ))}
    </Grid>
  )
}
