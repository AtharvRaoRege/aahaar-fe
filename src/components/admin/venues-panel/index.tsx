import { useTranslation } from 'react-i18next'

import { ActionMenu } from '@/components/global/action-menu'
import { EmptyState } from '@/components/global/empty-state'
import { Skeleton } from '@/components/global/skeleton'
import type { AdminVenue } from '@/types/admin'

import { formatJoined, kindLabel, runVenueAction, venueActions } from './helper'
import {
  Card,
  CardHead,
  CardList,
  InlineActions,
  Meta,
  Pill,
  PillRow,
  Strong,
  Table,
  TableWrap,
} from './styled'

export function VenuesPanel({
  loading,
  rows,
  pendingId,
  copied,
  onOpen,
  onCopyLink,
  onPublish,
  onGivePro,
  onSetBasic,
}: {
  loading: boolean
  rows: AdminVenue[]
  pendingId: string | null | undefined
  copied: string
  onOpen: (venue: AdminVenue) => void
  onCopyLink: (venue: AdminVenue) => void
  onPublish: (venue: AdminVenue, isPublished: boolean) => void
  onGivePro: (venue: AdminVenue) => void
  onSetBasic: (venue: AdminVenue) => void
}) {
  const { t } = useTranslation('dashboard')
  if (loading) return <Skeleton height="180px" />
  if (rows.length === 0) {
    return <EmptyState title={t('admin.emptyVenues')} hint={t('admin.emptyVenuesHint')} />
  }

  const handlers = { onOpen, onCopyLink, onPublish, onGivePro, onSetBasic }

  return (
    <>
      <TableWrap>
        <Table>
          <thead>
            <tr>
              <th>{t('admin.venue')}</th>
              <th>{t('admin.status')}</th>
              <th>{t('admin.owner')}</th>
              <th>{t('admin.slug')}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((venue) => (
              <tr key={venue.id}>
                <td>
                  <Strong>{venue.name}</Strong>
                  <Meta>
                    {kindLabel(venue.venueKind, t)} · {formatJoined(venue.createdAt) || t('admin.noDate')}
                  </Meta>
                </td>
                <td>
                  <VenuePills venue={venue} />
                </td>
                <td>
                  <Strong>{venue.ownerName ?? t('admin.unknownOwner')}</Strong>
                  <Meta>{venue.ownerEmail}</Meta>
                </td>
                <td>{venue.slug}</td>
                <td>
                  <InlineActions>
                    <ActionMenu
                      items={venueActions(venue, copied, t)}
                      loading={pendingId === venue.id}
                      onPick={(id) => runVenueAction(id, venue, handlers)}
                    />
                  </InlineActions>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrap>
      <CardList>
        {rows.map((venue) => (
          <Card key={venue.id}>
            <CardHead>
              <Strong>{venue.name}</Strong>
              <ActionMenu
                items={venueActions(venue, copied, t)}
                loading={pendingId === venue.id}
                onPick={(id) => runVenueAction(id, venue, handlers)}
              />
            </CardHead>
            <VenuePills venue={venue} />
            <Meta>
              {venue.ownerName ?? t('admin.unknownOwner')}
              {venue.ownerEmail ? ` · ${venue.ownerEmail}` : ''}
            </Meta>
            <Meta>{venue.slug}</Meta>
          </Card>
        ))}
      </CardList>
    </>
  )
}

function VenuePills({ venue }: { venue: AdminVenue }) {
  const { t } = useTranslation('dashboard')
  return (
    <PillRow>
      {venue.isPublished ? (
        <Pill $tone="ok">{t('admin.live')}</Pill>
      ) : (
        <Pill $tone="wait">{t('admin.draft')}</Pill>
      )}
      <Pill $tone={venue.plan === 'PRO' ? 'ok' : 'muted'}>
        {venue.plan === 'PRO' ? t('admin.planPro') : t('admin.planBasic')}
      </Pill>
    </PillRow>
  )
}
