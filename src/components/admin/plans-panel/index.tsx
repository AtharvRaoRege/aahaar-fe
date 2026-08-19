import { useTranslation } from 'react-i18next'

import { ActionMenu } from '@/components/global/action-menu'
import { EmptyState } from '@/components/global/empty-state'
import { Skeleton } from '@/components/global/skeleton'
import type { PlanRequestRow } from '@/types/admin'

import { formatJoined, planActions } from './helper'
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

export function PlansPanel({
  loading,
  rows,
  pendingId,
  onApprove,
  onReject,
}: {
  loading: boolean
  rows: PlanRequestRow[]
  pendingId: string | null | undefined
  onApprove: (id: string) => void
  onReject: (id: string) => void
}) {
  const { t } = useTranslation('dashboard')
  if (loading) return <Skeleton height="180px" />
  if (rows.length === 0) {
    return <EmptyState title={t('admin.emptyPlans')} hint={t('admin.emptyPlansHint')} />
  }
  const items = planActions(t)

  return (
    <>
      <TableWrap>
        <Table>
          <thead>
            <tr>
              <th>{t('admin.venue')}</th>
              <th>{t('admin.owner')}</th>
              <th>{t('admin.email')}</th>
              <th>{t('admin.phone')}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((entry) => (
              <tr key={entry.id}>
                <td>
                  <Strong>{entry.restaurantName}</Strong>
                  <Meta>
                    {entry.requestedPlan} · {formatJoined(entry.createdAt) || t('admin.noDate')}
                  </Meta>
                </td>
                <td>{entry.ownerName ?? t('admin.unknownOwner')}</td>
                <td>{entry.ownerEmail ?? t('admin.noDate')}</td>
                <td>{entry.ownerPhone ?? t('admin.noPhone')}</td>
                <td>
                  <InlineActions>
                    <ActionMenu
                      items={items}
                      loading={pendingId === entry.id}
                      onPick={(id) => (id === 'approve' ? onApprove(entry.id) : onReject(entry.id))}
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
              <Strong>{entry.restaurantName}</Strong>
              <ActionMenu
                items={items}
                loading={pendingId === entry.id}
                onPick={(id) => (id === 'approve' ? onApprove(entry.id) : onReject(entry.id))}
              />
            </CardHead>
            <Meta>
              {entry.requestedPlan} · {formatJoined(entry.createdAt) || t('admin.noDate')}
            </Meta>
            <Meta>
              {t('admin.owner')}: {entry.ownerName ?? t('admin.unknownOwner')}
            </Meta>
            <Meta>
              {t('admin.email')}: {entry.ownerEmail ?? t('admin.noDate')}
            </Meta>
            <Meta>
              {t('admin.phone')}: {entry.ownerPhone ?? t('admin.noPhone')}
            </Meta>
          </Card>
        ))}
      </CardList>
    </>
  )
}
