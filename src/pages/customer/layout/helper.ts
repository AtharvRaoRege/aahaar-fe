import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'

import { publicApi } from '@/lib/api/public'
import { sessionStore } from '@/lib/customer/session-store'
import { hasNamedTableSession } from '@/lib/customer/table-session'
import { freshFor } from '@/lib/query/cache'
import { queryKeys } from '@/lib/query/keys'

export function useCustomerLayout() {
  const { slug = '' } = useParams<{ slug: string }>()
  const [params] = useSearchParams()
  const location = useLocation()
  const queryClient = useQueryClient()
  const [, setIdentityNonce] = useState(0)
  const query = useQuery({
    queryKey: queryKeys.publicRestaurant(slug),
    queryFn: () => publicApi.getRestaurant(slug),
    enabled: Boolean(slug),
    staleTime: freshFor.slow,
  })

  useEffect(() => {
    if (!slug || !query.data?.isServing) return
    void queryClient.prefetchQuery({
      queryKey: queryKeys.publicMenu(slug),
      queryFn: () => publicApi.getMenu(slug),
      staleTime: freshFor.slow,
    })
  }, [slug, query.data?.isServing, queryClient])

  const storedTable = query.data ? sessionStore.get(query.data.id)?.tableNumber : null
  const tableFromUrl = (params.get('table') ?? '').trim() || null
  const onTrack = location.pathname.includes('/track/')
  const onReview = location.pathname.endsWith('/review')
  const onIndex = location.pathname.replace(/\/$/, '') === `/r/${slug}`

  const tableNumber = tableFromUrl || storedTable || null
  /** Ordering only when the scan URL carries a table (view-only without it). */
  const canOrder = Boolean(tableFromUrl)
  /** Put a remembered table back into the URL — never when it is already there. */
  const needsTableInUrl = Boolean(tableNumber && !tableFromUrl && !onTrack && !onReview)
  const hasProfile = Boolean(query.data && hasNamedTableSession(query.data.id, tableNumber))
  const needsIdentity = Boolean(
    canOrder && tableNumber && query.data && !hasProfile && !onTrack && !onReview,
  )

  const restPath =
    location.pathname.replace(new RegExp(`^/r/${slug}`), '') || '/menu'

  return {
    slug,
    query,
    tableNumber,
    tableFromUrl,
    canOrder,
    onTrack,
    onReview,
    onIndex,
    needsTableInUrl,
    needsIdentity,
    markIdentified: () => setIdentityNonce((value) => value + 1),
    restPath: restPath === '/' ? '/menu' : restPath,
  }
}
