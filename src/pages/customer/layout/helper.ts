import { useQuery } from '@tanstack/react-query'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'

import { publicApi } from '@/lib/api/public'
import { sessionStore } from '@/lib/customer/session-store'
import { ensureTableSession } from '@/lib/customer/table-session'
import { queryKeys } from '@/lib/query/keys'

export function useCustomerLayout() {
  const { slug = '' } = useParams<{ slug: string }>()
  const [params] = useSearchParams()
  const location = useLocation()
  const query = useQuery({
    queryKey: queryKeys.publicRestaurant(slug),
    queryFn: () => publicApi.getRestaurant(slug),
    enabled: Boolean(slug),
  })

  const storedTable = query.data ? sessionStore.get(query.data.id)?.tableNumber : null
  const tableFromUrl = (params.get('table') ?? '').trim() || null
  const tableNumber = tableFromUrl || storedTable || null
  const onTrack = location.pathname.includes('/track/')
  const onIndex = location.pathname.replace(/\/$/, '') === `/r/${slug}`
  const needsTableInUrl = Boolean(tableNumber && !tableFromUrl && !onTrack)

  const sessionQuery = useQuery({
    queryKey: ['table-session', query.data?.id, tableNumber],
    queryFn: () => ensureTableSession(query.data!.id, slug, tableNumber!),
    enabled: Boolean(query.data?.id && tableNumber),
    staleTime: Infinity,
    retry: 1,
  })

  const restPath =
    location.pathname.replace(new RegExp(`^/r/${slug}`), '') || '/menu'

  return {
    slug,
    query,
    tableNumber,
    tableFromUrl,
    onTrack,
    onIndex,
    needsTableInUrl,
    restPath: restPath === '/' ? '/menu' : restPath,
    sessionQuery,
  }
}
