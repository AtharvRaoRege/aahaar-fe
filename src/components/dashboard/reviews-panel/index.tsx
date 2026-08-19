import { useTranslation } from 'react-i18next'

import { RatingSummary } from '@/components/dashboard/rating-summary'
import { ReviewCard } from '@/components/dashboard/review-card'
import { EmptyState } from '@/components/global/empty-state'
import { PaginationBar } from '@/components/global/pagination-bar'
import { Skeleton } from '@/components/global/skeleton'

import { useRatingsPage } from './helper'
import { List } from './styled'

export function ReviewsPanel({ restaurantId }: { restaurantId: string }) {
  const { t } = useTranslation('dashboard')
  const page = useRatingsPage(restaurantId)

  return (
    <>
      {page.summaryLoading ? <Skeleton height="160px" /> : <RatingSummary summary={page.summary} />}
      {page.listLoading && <Skeleton height="220px" />}
      {page.total === 0 && !page.listLoading && (
        <EmptyState emoji="★" title={t('ratings.empty')} hint={t('ratings.emptyHint')} />
      )}
      {page.reviews.length > 0 && (
        <List>
          {page.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </List>
      )}
      <PaginationBar
        page={page.page}
        pages={page.pages}
        total={page.total}
        pageSize={page.pageSize}
        onPage={page.setPage}
        rangeLabel={t('admin.pageOf', { page: page.page, pages: page.pages })}
        prevLabel={t('admin.prev')}
        nextLabel={t('admin.next')}
      />
    </>
  )
}
