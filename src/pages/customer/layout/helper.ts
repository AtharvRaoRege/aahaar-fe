import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'

import { publicApi } from '@/lib/api/public'
import { guestProfileStore } from '@/lib/customer/guest-profile-store'
import { sessionStore } from '@/lib/customer/session-store'
import {
  createNamedTableSession,
  hasNamedTableSession,
} from '@/lib/customer/table-session'
import { freshFor } from '@/lib/query/cache'
import { queryKeys } from '@/lib/query/keys'

export function useCustomerLayout() {
  const { slug = '' } = useParams<{ slug: string }>()
  const [params] = useSearchParams()
  const location = useLocation()
  const queryClient = useQueryClient()
  const [identityNonce, setIdentityNonce] = useState(0)
  const [restoreFailed, setRestoreFailed] = useState(false)
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
  const canOrder = Boolean(tableFromUrl)
  const needsTableInUrl = Boolean(tableNumber && !tableFromUrl && !onTrack && !onReview)
  const hasSession = Boolean(query.data && hasNamedTableSession(query.data.id, tableNumber))
  const savedProfile = query.data ? guestProfileStore.get(query.data.id) : null
  const restoringIdentity = Boolean(
    canOrder &&
      tableNumber &&
      query.data &&
      !hasSession &&
      savedProfile &&
      !restoreFailed &&
      !onTrack &&
      !onReview,
  )
  const needsIdentity = Boolean(
    canOrder &&
      tableNumber &&
      query.data &&
      !hasSession &&
      (!savedProfile || restoreFailed) &&
      !onTrack &&
      !onReview,
  )

  useEffect(() => {
    if (!restoringIdentity || !query.data || !tableNumber || !savedProfile) return

    let cancelled = false
    void createNamedTableSession(query.data.id, slug, tableNumber, {
      name: savedProfile.name,
      contactNumber: savedProfile.contactNumber ?? undefined,
    })
      .then(() => {
        if (!cancelled) setIdentityNonce((value) => value + 1)
      })
      .catch(() => {
        if (!cancelled) setRestoreFailed(true)
      })

    return () => {
      cancelled = true
    }
  }, [restoringIdentity, query.data, tableNumber, savedProfile, slug, identityNonce])

  const restPath = location.pathname.replace(new RegExp(`^/r/${slug}`), '') || '/menu'

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
    restoringIdentity,
    markIdentified: () => {
      setRestoreFailed(false)
      setIdentityNonce((value) => value + 1)
    },
    restPath: restPath === '/' ? '/menu' : restPath,
  }
}
