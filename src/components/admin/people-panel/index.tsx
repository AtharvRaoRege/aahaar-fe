import { useTranslation } from 'react-i18next'

import { ActionMenu } from '@/components/global/action-menu'
import { EmptyState } from '@/components/global/empty-state'
import { Skeleton } from '@/components/global/skeleton'
import type { AdminMember } from '@/types/admin'

import { peopleActions, runPeopleAction } from './helper'
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

export function PeoplePanel({
  loading,
  rows,
  pendingId,
  currentUserId,
  copied,
  onApprove,
  onOpen,
  onReject,
  onLock,
  onUnlock,
  onCopyEmail,
}: {
  loading: boolean
  rows: AdminMember[]
  pendingId: string | null | undefined
  currentUserId: string | undefined
  copied: string
  onApprove: (id: string) => void
  onOpen: (member: AdminMember) => void
  onReject: (member: AdminMember) => void
  onLock: (member: AdminMember) => void
  onUnlock: (member: AdminMember) => void
  onCopyEmail: (member: AdminMember) => void
}) {
  const { t } = useTranslation('dashboard')
  if (loading) return <Skeleton height="180px" />
  if (rows.length === 0) {
    return <EmptyState title={t('admin.emptyPeople')} hint={t('admin.emptyPeopleHint')} />
  }
  const handlers = { onApprove, onOpen, onReject, onLock, onUnlock, onCopyEmail }

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
                  <StatusPills entry={entry} />
                </td>
                <td>{entry.restaurantName ?? t('admin.noVenue')}</td>
                <td>
                  <InlineActions>
                    <ActionMenu
                      items={peopleActions(entry, copied, entry.id !== currentUserId, t)}
                      loading={pendingId === entry.id}
                      onPick={(id) => runPeopleAction(id, entry, handlers)}
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
            <CardHead>
              <Strong>{entry.fullName}</Strong>
              <ActionMenu
                items={peopleActions(entry, copied, entry.id !== currentUserId, t)}
                loading={pendingId === entry.id}
                onPick={(id) => runPeopleAction(id, entry, handlers)}
              />
            </CardHead>
            <StatusPills entry={entry} />
            <Meta>{entry.email}</Meta>
            <Meta>{entry.restaurantName ?? t('admin.noVenue')}</Meta>
          </Card>
        ))}
      </CardList>
    </>
  )
}

function StatusPills({ entry }: { entry: AdminMember }) {
  const { t } = useTranslation('dashboard')
  return (
    <PillRow>
      {entry.approvalStatus === 'WAITLIST' ? (
        <Pill $tone="wait">{t('admin.waitlist')}</Pill>
      ) : (
        <Pill $tone="ok">{t('admin.approved')}</Pill>
      )}
      {!entry.isActive && <Pill $tone="bad">{t('admin.blocked')}</Pill>}
    </PillRow>
  )
}
