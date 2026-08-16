import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'
import { EmptyState } from '@/components/global/empty-state'
import { PaginationBar } from '@/components/global/pagination-bar'
import { SearchInput } from '@/components/global/search-input'
import { Skeleton } from '@/components/global/skeleton'
import type { AdminMember, AdminVenue } from '@/types/admin'
import type { WaitlistUser } from '@/types/auth'
import { errorMessage } from '@/utils/error-message'

import { formatJoined, useAdminPage } from './helper'
import {
  Actions,
  BrandBlock,
  Card,
  CardActions,
  CardList,
  Count,
  ErrorText,
  Header,
  InlineActions,
  Meta,
  Page,
  Pill,
  SearchSlot,
  Shell,
  Strong,
  Subtitle,
  Tab,
  Table,
  TableWrap,
  Tabs,
  Title,
  Toolbar,
} from './styled'

export function AdminPage() {
  const { t } = useTranslation(['dashboard', 'common'])
  const page = useAdminPage()
  const searchPlaceholder =
    page.tab === 'venues' ? t('admin.searchVenues') : t('admin.searchPeople')

  return (
    <Page>
      <Shell>
        <Header>
          <BrandBlock>
            <Title>{t('admin.title')}</Title>
            <Subtitle>{t('admin.subtitle')}</Subtitle>
          </BrandBlock>
          {!page.user?.hasRestaurant && (
            <Actions>
              <Button variant="secondary" onClick={page.goSetup}>
                {t('admin.setupVenue')}
              </Button>
            </Actions>
          )}
        </Header>

        <Tabs>
          <Tab type="button" $active={page.tab === 'waitlist'} onClick={() => page.setTab('waitlist')}>
            {t('admin.tabWaitlist')}
          </Tab>
          <Tab type="button" $active={page.tab === 'people'} onClick={() => page.setTab('people')}>
            {t('admin.tabPeople')}
          </Tab>
          <Tab type="button" $active={page.tab === 'venues'} onClick={() => page.setTab('venues')}>
            {t('admin.tabVenues')}
          </Tab>
        </Tabs>

        <Toolbar>
          <SearchSlot>
            <SearchInput
              value={page.search}
              onChange={page.setSearch}
              placeholder={searchPlaceholder}
            />
          </SearchSlot>
          <Count>
            {t('admin.shownRange', {
              from: page.pager.total === 0 ? 0 : (page.pager.page - 1) * page.pager.pageSize + 1,
              to: Math.min(page.pager.page * page.pager.pageSize, page.pager.total),
              total: page.pager.total,
            })}
          </Count>
        </Toolbar>

        {page.approve.isError && (
          <ErrorText>{errorMessage(page.approve.error) || t('admin.approveFailed')}</ErrorText>
        )}

        {page.tab === 'waitlist' && (
          <WaitlistPanel
            loading={page.waitlistQuery.isLoading}
            rows={page.waitlist}
            pendingId={page.approve.isPending ? page.approve.variables : null}
            onApprove={(id) => page.approve.mutate(id)}
          />
        )}
        {page.tab === 'people' && (
          <PeoplePanel
            loading={page.usersQuery.isLoading}
            rows={page.people}
            pendingId={page.approve.isPending ? page.approve.variables : null}
            onApprove={(id) => page.approve.mutate(id)}
            onOpen={page.openMemberKitchen}
          />
        )}
        {page.tab === 'venues' && (
          <VenuesPanel
            loading={page.venuesQuery.isLoading}
            rows={page.venues}
            onOpen={page.openKitchen}
          />
        )}
        <PaginationBar
          page={page.pager.page}
          pages={page.pager.pages}
          total={page.pager.total}
          pageSize={page.pager.pageSize}
          onPage={page.setPage}
          rangeLabel={t('admin.pageOf', {
            page: page.pager.page,
            pages: page.pager.pages,
          })}
          prevLabel={t('admin.prev')}
          nextLabel={t('admin.next')}
        />
      </Shell>
    </Page>
  )
}

function WaitlistPanel({
  loading,
  rows,
  pendingId,
  onApprove,
}: {
  loading: boolean
  rows: WaitlistUser[]
  pendingId: string | null | undefined
  onApprove: (id: string) => void
}) {
  const { t } = useTranslation('dashboard')
  if (loading) return <Skeleton height="180px" />
  if (rows.length === 0) return <EmptyState title={t('admin.empty')} hint={t('admin.emptyWaitlistHint')} />

  return (
    <>
      <TableWrap>
        <Table>
          <thead>
            <tr>
              <th>{t('admin.name')}</th>
              <th>{t('admin.email')}</th>
              <th>{t('admin.phone')}</th>
              <th>{t('admin.joined')}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((entry) => (
              <tr key={entry.id}>
                <td>
                  <Strong>{entry.fullName}</Strong>
                </td>
                <td>{entry.email}</td>
                <td>{entry.phone ?? t('admin.noPhone')}</td>
                <td>{formatJoined(entry.createdAt) || t('admin.noDate')}</td>
                <td>
                  <InlineActions>
                    <Button
                      size="sm"
                      onClick={() => onApprove(entry.id)}
                      loading={pendingId === entry.id}
                    >
                      {t('admin.approve')}
                    </Button>
                  </InlineActions>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrap>
      <CardList>
        {rows.map((entry) => (
          <Card key={entry.id}>
            <Strong>{entry.fullName}</Strong>
            <Meta>
              {t('admin.email')}: {entry.email}
            </Meta>
            <Meta>
              {t('admin.phone')}: {entry.phone ?? t('admin.noPhone')}
            </Meta>
            <CardActions>
              <Button
                size="sm"
                onClick={() => onApprove(entry.id)}
                loading={pendingId === entry.id}
              >
                {t('admin.approve')}
              </Button>
            </CardActions>
          </Card>
        ))}
      </CardList>
    </>
  )
}

function PeoplePanel({
  loading,
  rows,
  pendingId,
  onApprove,
  onOpen,
}: {
  loading: boolean
  rows: AdminMember[]
  pendingId: string | null | undefined
  onApprove: (id: string) => void
  onOpen: (member: AdminMember) => void
}) {
  const { t } = useTranslation('dashboard')
  if (loading) return <Skeleton height="180px" />
  if (rows.length === 0) return <EmptyState title={t('admin.emptyPeople')} />

  return (
    <>
      <TableWrap>
        <Table>
          <thead>
            <tr>
              <th>{t('admin.name')}</th>
              <th>{t('admin.email')}</th>
              <th>{t('admin.status')}</th>
              <th>{t('admin.venue')}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((entry) => (
              <tr key={entry.id}>
                <td>
                  <Strong>{entry.fullName}</Strong>
                  <Meta>{entry.phone ?? t('admin.noPhone')}</Meta>
                </td>
                <td>{entry.email}</td>
                <td>
                  <StatusPill status={entry.approvalStatus} />
                </td>
                <td>{entry.restaurantName ?? t('admin.noVenue')}</td>
                <td>
                  <InlineActions>
                    <PeopleActions
                      entry={entry}
                      pending={pendingId === entry.id}
                      onApprove={() => onApprove(entry.id)}
                      onOpen={() => onOpen(entry)}
                    />
                  </InlineActions>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrap>
      <CardList>
        {rows.map((entry) => (
          <Card key={entry.id}>
            <Strong>{entry.fullName}</Strong>
            <Meta>{entry.email}</Meta>
            <Meta>{entry.phone ?? t('admin.noPhone')}</Meta>
            <StatusPill status={entry.approvalStatus} />
            <Meta>{entry.restaurantName ?? t('admin.noVenue')}</Meta>
            <CardActions>
              <PeopleActions
                entry={entry}
                pending={pendingId === entry.id}
                onApprove={() => onApprove(entry.id)}
                onOpen={() => onOpen(entry)}
              />
            </CardActions>
          </Card>
        ))}
      </CardList>
    </>
  )
}

function VenuesPanel({
  loading,
  rows,
  onOpen,
}: {
  loading: boolean
  rows: AdminVenue[]
  onOpen: (venue: AdminVenue) => void
}) {
  const { t } = useTranslation('dashboard')
  if (loading) return <Skeleton height="180px" />
  if (rows.length === 0) return <EmptyState title={t('admin.emptyVenues')} hint={t('admin.emptyVenuesHint')} />

  return (
    <>
      <TableWrap>
        <Table>
          <thead>
            <tr>
              <th>{t('admin.venue')}</th>
              <th>{t('admin.kind')}</th>
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
                  <Meta>{formatJoined(venue.createdAt) || t('admin.noDate')}</Meta>
                </td>
                <td>{kindLabel(venue.venueKind, t)}</td>
                <td>
                  <Strong>{venue.ownerName ?? t('admin.unknownOwner')}</Strong>
                  <Meta>{venue.ownerEmail}</Meta>
                </td>
                <td>{venue.slug}</td>
                <td>
                  <InlineActions>
                    <Button size="sm" onClick={() => onOpen(venue)}>
                      {t('admin.openKitchen')}
                    </Button>
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
            <Strong>{venue.name}</Strong>
            <Meta>{kindLabel(venue.venueKind, t)}</Meta>
            <Meta>
              {t('admin.owner')}: {venue.ownerName ?? t('admin.unknownOwner')}
            </Meta>
            <Meta>{venue.ownerEmail}</Meta>
            <CardActions>
              <Button size="sm" onClick={() => onOpen(venue)}>
                {t('admin.openKitchen')}
              </Button>
            </CardActions>
          </Card>
        ))}
      </CardList>
    </>
  )
}

function PeopleActions({
  entry,
  pending,
  onApprove,
  onOpen,
}: {
  entry: AdminMember
  pending: boolean
  onApprove: () => void
  onOpen: () => void
}) {
  const { t } = useTranslation('dashboard')
  return (
    <>
      {entry.approvalStatus === 'WAITLIST' && (
        <Button size="sm" onClick={onApprove} loading={pending}>
          {t('admin.approve')}
        </Button>
      )}
      {entry.hasRestaurant && (
        <Button size="sm" variant="secondary" onClick={onOpen}>
          {t('admin.openKitchen')}
        </Button>
      )}
    </>
  )
}

function StatusPill({ status }: { status: AdminMember['approvalStatus'] }) {
  const { t } = useTranslation('dashboard')
  if (status === 'WAITLIST') {
    return <Pill $tone="wait">{t('admin.waitlist')}</Pill>
  }
  return <Pill $tone="ok">{t('admin.approved')}</Pill>
}

function kindLabel(
  kind: AdminVenue['venueKind'],
  t: (key: string) => string,
) {
  if (kind === 'HOTEL') return t('setup.hotel')
  if (kind === 'CAFE') return t('setup.cafe')
  return t('setup.restaurant')
}
