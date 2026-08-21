import { useEffect, useMemo, useSyncExternalStore } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import {
  BarChart3,
  ClipboardList,
  QrCode,
  Settings,
  Shield,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react'

import { useDocumentBrand } from '@/hooks/theme/use-document-brand/helper'
import { ordersApi } from '@/lib/api/orders'
import { restaurantsApi } from '@/lib/api/restaurants'
import { useAuth } from '@/lib/auth/use-auth'
import { impersonationStore } from '@/lib/dashboard/impersonation-store'
import { restaurantStore } from '@/lib/dashboard/restaurant-store'
import { queryKeys } from '@/lib/query/keys'

type NavKey = 'nav.orders' | 'nav.menu' | 'nav.qr' | 'nav.insights' | 'nav.settings'

export const NAV_ITEMS: ReadonlyArray<{
  to: string
  key: NavKey
  end: boolean
  icon: LucideIcon
  badge?: 'pendingOrders'
}> = [
  { to: '/dashboard', key: 'nav.orders', end: true, icon: ClipboardList, badge: 'pendingOrders' },
  { to: '/dashboard/menu', key: 'nav.menu', end: false, icon: UtensilsCrossed },
  { to: '/dashboard/qr', key: 'nav.qr', end: false, icon: QrCode },
  { to: '/dashboard/insights', key: 'nav.insights', end: false, icon: BarChart3 },
  { to: '/dashboard/settings', key: 'nav.settings', end: false, icon: Settings },
]

export const MOBILE_NAV_KEYS: ReadonlySet<NavKey> = new Set<NavKey>(NAV_ITEMS.map((item) => item.key))

export const ADMIN_NAV = {
  to: '/dashboard/admin',
  key: 'nav.admin' as const,
  icon: Shield,
}

export function formatNavBadge(count: number): string {
  if (count <= 0) return ''
  if (count > 99) return '99+'
  return String(count)
}

export function useDashboardLayout() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const impersonation = useSyncExternalStore(
    impersonationStore.subscribe,
    impersonationStore.getSnapshot,
    impersonationStore.getSnapshot,
  )
  const selectedId = useSyncExternalStore(
    restaurantStore.subscribe,
    restaurantStore.getSnapshot,
    restaurantStore.getSnapshot,
  )

  const ownQuery = useQuery({
    queryKey: queryKeys.restaurants,
    queryFn: () => restaurantsApi.list(),
  })

  const viewedQuery = useQuery({
    queryKey: queryKeys.restaurant(impersonation?.restaurantId ?? ''),
    queryFn: () => restaurantsApi.get(impersonation!.restaurantId),
    enabled: Boolean(impersonation?.restaurantId),
  })

  const restaurants = useMemo(() => ownQuery.data ?? [], [ownQuery.data])

  const restaurant = useMemo(() => {
    if (impersonation) return viewedQuery.data ?? null
    if (restaurants.length === 0) return null
    return restaurants.find((item) => item.id === selectedId) ?? restaurants[0]
  }, [impersonation, viewedQuery.data, restaurants, selectedId])

  const brand = useDocumentBrand(restaurant?.primaryColor)

  const countsQuery = useQuery({
    queryKey: queryKeys.orderCounts(restaurant?.id ?? '', {}),
    queryFn: () => ordersApi.counts(restaurant!.id, {}),
    enabled: Boolean(restaurant?.id),
    // Socket invalidation keeps this fresh; poll covers background / flaky sockets.
    refetchInterval: 20_000,
  })

  /** PENDING tickets — live via kitchen-alert socket invalidation + poll. */
  const pendingOrderCount = countsQuery.data?.new ?? 0

  useEffect(() => {
    if (restaurant && !impersonation) restaurantStore.set(restaurant.id)
  }, [restaurant, impersonation])

  const exitImpersonation = () => {
    impersonationStore.clear()
    navigate('/dashboard/admin')
  }

  const listLoading = ownQuery.isLoading && !ownQuery.data
  const viewLoading = Boolean(impersonation) && viewedQuery.isLoading && !viewedQuery.data
  const venueLoading = listLoading || viewLoading
  const venueError = impersonation ? viewedQuery.isError : ownQuery.isError

  return {
    user,
    restaurant,
    brand,
    impersonation,
    venueLoading,
    venueError,
    refetch: impersonation ? viewedQuery.refetch : ownQuery.refetch,
    exitImpersonation,
    restaurants,
    pendingOrderCount,
    switchVenue: (restaurantId: string) => {
      if (!restaurantId) return
      impersonationStore.clear()
      restaurantStore.set(restaurantId)
    },
  }
}
