import { useTranslation } from 'react-i18next'

import { ActionMenu } from '@/components/global/action-menu'
import { EmptyState } from '@/components/global/empty-state'
import { Skeleton } from '@/components/global/skeleton'
import type { WaitlistUser } from '@/types/auth'

import { formatJoined, waitlistActions } from './helper'
import {
  Card,
  CardHead,
  CardList,
  InlineActions,
  Meta,
  Strong,
  Table,
  TableWrap,
} from './styled'

export function WaitlistPanel({
  loading,
  rows,
  pendingId,
  copied,
  onApprove,
  onReject,
  onCopyEmail,
  onCopyPhone,
}: {
  loading: boolean
  rows: WaitlistUser[]
  pendingId: string | null | undefined
  copied: string
  onApprove: (id: string) => void
  onReject: (entry: WaitlistUser) => void
  onCopyEmail: (entry: WaitlistUser) => void
  onCopyPhone: (entry: WaitlistUser) => void
}) {
  const { t } = useTranslation('dashboard')
  if (loading) return <Skeleton height="180px" />
  if (rows.length === 0) {
    return <EmptyState title={t('admin.empty')} hint={t('admin.emptyWaitlistHint')} />
  }

  const onPick = (entry: WaitlistUser, id: string) => {
    if (id === 'approve') onApprove(entry.id)
    if (id === 'reject') onReject(entry)
    if (id === 'email') onCopyEmail(entry)
    if (id === 'phone') onCopyPhone(entry)
  }

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
                    <ActionMenu
                      items={waitlistActions(entry, copied, t)}
                      disabled={pendingId === entry.id}
                      onPick={(id) => onPick(entry, id)}
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
                items={waitlistActions(entry, copied, t)}
                disabled={pendingId === entry.id}
                onPick={(id) => onPick(entry, id)}
              />
            </CardHead>
            <Meta>
              {t('admin.email')}: {entry.email}
            </Meta>
            <Meta>
              {t('admin.phone')}: {entry.phone ?? t('admin.noPhone')}
            </Meta>
            <Meta>
              {t('admin.joined')}: {formatJoined(entry.createdAt) || t('admin.noDate')}
            </Meta>
          </Card>
        ))}
      </CardList>
    </>
  )
}
