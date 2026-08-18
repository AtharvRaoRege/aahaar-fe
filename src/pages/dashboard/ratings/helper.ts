import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { reviewsApi } from '@/lib/api/reviews'
import { queryKeys } from '@/lib/query/keys'

const EMPTY_SUMMARY = {
  average: 0,
  count: 0,
  distribution: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
}

export function useRatingsPage(restaurantId: string) {
  const [page, setPage] = useState(1)
  const summaryQuery = useQuery({
    queryKey: queryKeys.reviewSummary(restaurantId),
    queryFn: () => reviewsApi.summary(restaurantId),
  })
  const listQuery = useQuery({
    queryKey: queryKeys.reviews(restaurantId, page),
    queryFn: () => reviewsApi.list(restaurantId, page, 12),
  })

  const list = listQuery.data
  const pages = list ? Math.max(1, Math.ceil(list.total / list.pageSize)) : 1

  return {
    summary: summaryQuery.data ?? EMPTY_SUMMARY,
    summaryLoading: summaryQuery.isLoading,
    reviews: list?.items ?? [],
    total: list?.total ?? 0,
    page,
    pages,
    pageSize: list?.pageSize ?? 12,
    setPage,
    listLoading: listQuery.isLoading,
  }
}
