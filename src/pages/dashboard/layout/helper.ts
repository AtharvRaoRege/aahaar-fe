import { useEffect, useMemo, useSyncExternalStore } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ClipboardList,
  QrCode,
  Settings,
  Shield,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react'

import { restaurantsApi } from '@/lib/api/restaurants'
import { staffSignOut } from '@/lib/auth/staff-sign-out'
import { useAuth } from '@/lib/auth/use-auth'
import { impersonationStore } from '@/lib/dashboard/impersonation-store'
import { restaurantStore } from '@/lib/dashboard/restaurant-store'
import { queryKeys } from '@/lib/query/keys'

export const NAV_ITEMS: ReadonlyArray<{
  to: string
  key: 'nav.orders' | 'nav.menu' | 'nav.qr' | 'nav.settings'
  end: boolean
  icon: LucideIcon
}> = [
  { to: '/dashboard', key: 'nav.orders', end: true, icon: ClipboardList },
  { to: '/dashboard/menu', key: 'nav.menu', end: false, icon: UtensilsCrossed },
  { to: '/dashboard/qr', key: 'nav.qr', end: false, icon: QrCode },
  { to: '/dashboard/settings', key: 'nav.settings', end: false, icon: Settings },
]

export const ADMIN_NAV = {
  to: '/dashboard/admin',
  key: 'nav.admin' as const,
  icon: Shield,
}

export function useDashboardLayout() {
  const navigate = useNavigate()
  const location = useLocation()
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
  const onAdmin = location.pathname === '/dashboard/admin'

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

  useEffect(() => {
    if (restaurant && !impersonation) restaurantStore.set(restaurant.id)
  }, [restaurant, impersonation])

  const logout = () => {
    void staffSignOut().finally(() => {
      navigate('/dashboard/login', { replace: true })
    })
  }

  const exitImpersonation = () => {
    impersonationStore.clear()
    navigate('/dashboard/admin')
  }

  const listLoading = ownQuery.isLoading && !ownQuery.data
  const viewLoading = Boolean(impersonation) && viewedQuery.isLoading && !viewedQuery.data

  return {
    user,
    restaurant,
    impersonation,
    onAdmin,
    isLoading: listLoading || viewLoading,
    isError: impersonation ? viewedQuery.isError : ownQuery.isError,
    refetch: impersonation ? viewedQuery.refetch : ownQuery.refetch,
    logout,
    exitImpersonation,
    restaurants,
    switchVenue: (restaurantId: string) => {
      if (!restaurantId) return
      impersonationStore.clear()
      restaurantStore.set(restaurantId)
    },
  }
}
