import { useTranslation } from 'react-i18next'

import type { AdminTab, PeopleView, VenueView } from '@/pages/dashboard/admin/helper'

import { OVERVIEW_TILES, tileIsActive } from './helper'
import { Grid, Tile, TileLabel, TileValue } from './styled'

export function AdminOverview({
  counts,
  tab,
  venueView,
  onJump,
}: {
  counts: Record<(typeof OVERVIEW_TILES)[number]['key'], number>
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
          <TileValue>{counts[tile.key]}</TileValue>
          <TileLabel>{t(tile.labelKey)}</TileLabel>
        </Tile>
      ))}
    </Grid>
  )
}
