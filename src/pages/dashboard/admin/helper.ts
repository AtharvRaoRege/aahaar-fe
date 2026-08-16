import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { adminApi } from '@/lib/api/admin'
import { staffSignOut } from '@/lib/auth/staff-sign-out'
import { useAuth } from '@/lib/auth/use-auth'
import { impersonationStore } from '@/lib/dashboard/impersonation-store'
import { restaurantStore } from '@/lib/dashboard/restaurant-store'
import { queryKeys } from '@/lib/query/keys'
import type { AdminMember, AdminVenue } from '@/types/admin'
import type { User } from '@/types/auth'

export type AdminTab = 'waitlist' | 'people' | 'venues'

export const ADMIN_PAGE_SIZE = 10

function paginate<T>(rows: T[], page: number, pageSize: number) {
  const total = rows.length
  const pages = Math.max(1, Math.ceil(total / pageSize) || 1)
  const current = Math.min(Math.max(1, page), pages)
  const start = (current - 1) * pageSize
  return {
    items: rows.slice(start, start + pageSize),
    total,
    page: current,
    pages,
    pageSize,
  }
}

export function isAdminTab(value: string | null): value is AdminTab {
  return value === 'waitlist' || value === 'people' || value === 'venues'
}

export function matchesQuery(haystack: Array<string | null | undefined>, query: string) {
  const needle = query.trim().toLowerCase()
  if (!needle) return true
  return haystack.some((part) => (part ?? '').toLowerCase().includes(needle))
}

export function formatJoined(iso: string | null | undefined) {
  if (!iso) return ''
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function isOwnVenue(venue: Pick<AdminVenue, 'tenantId'>, user: User | null) {
  return Boolean(user && venue.tenantId === user.tenantId)
}

export function useAdminPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const tab = isAdminTab(searchParams.get('tab')) ? searchParams.get('tab')! : 'waitlist'

  const waitlistQuery = useQuery({
    queryKey: queryKeys.waitlist,
    queryFn: adminApi.waitlist,
    refetchInterval: 5000,
  })
  const usersQuery = useQuery({
    queryKey: queryKeys.adminUsers,
    queryFn: adminApi.users,
  })
  const venuesQuery = useQuery({
    queryKey: queryKeys.adminRestaurants,
    queryFn: adminApi.restaurants,
  })

  const approve = useMutation({
    mutationFn: (userId: string) => adminApi.approve(userId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.waitlist }),
        queryClient.invalidateQueries({ queryKey: queryKeys.adminUsers }),
        queryClient.invalidateQueries({ queryKey: queryKeys.adminRestaurants }),
      ])
    },
  })

  const people = useMemo(() => {
    const rows = usersQuery.data ?? []
    return rows.filter((row) =>
      matchesQuery([row.fullName, row.email, row.phone, row.restaurantName], search),
    )
  }, [usersQuery.data, search])

  const venues = useMemo(() => {
    const rows = venuesQuery.data ?? []
    return rows.filter((row) =>
      matchesQuery([row.name, row.slug, row.ownerName, row.ownerEmail, row.venueKind], search),
    )
  }, [venuesQuery.data, search])

  const waitlist = useMemo(() => {
    const rows = waitlistQuery.data ?? []
    return rows.filter((row) => matchesQuery([row.fullName, row.email, row.phone], search))
  }, [waitlistQuery.data, search])

  const pagedWaitlist = useMemo(
    () => paginate(waitlist, page, ADMIN_PAGE_SIZE),
    [waitlist, page],
  )
  const pagedPeople = useMemo(() => paginate(people, page, ADMIN_PAGE_SIZE), [people, page])
  const pagedVenues = useMemo(() => paginate(venues, page, ADMIN_PAGE_SIZE), [venues, page])

  const setTab = (next: AdminTab) => {
    setSearchParams(next === 'waitlist' ? {} : { tab: next }, { replace: true })
    setSearch('')
    setPage(1)
  }

  const openKitchen = (venue: AdminVenue) => {
    restaurantStore.set(venue.id)
    if (isOwnVenue(venue, user)) {
      impersonationStore.clear()
    } else {
      impersonationStore.set({ restaurantId: venue.id, restaurantName: venue.name })
    }
    navigate('/dashboard')
  }

  const openMemberKitchen = (member: AdminMember) => {
    const venue = (venuesQuery.data ?? []).find((row) => row.id === member.restaurantId)
    if (venue) {
      openKitchen(venue)
      return
    }
    if (!member.restaurantId || !member.restaurantName) return
    restaurantStore.set(member.restaurantId)
    impersonationStore.set({
      restaurantId: member.restaurantId,
      restaurantName: member.restaurantName,
    })
    navigate('/dashboard')
  }

  const logout = () => {
    void staffSignOut().finally(() => {
      navigate('/dashboard/login', { replace: true })
    })
  }

  return {
    user,
    tab,
    setTab,
    search,
    setSearch: (value: string) => {
      setSearch(value)
      setPage(1)
    },
    waitlistQuery,
    usersQuery,
    venuesQuery,
    waitlist: pagedWaitlist.items,
    people: pagedPeople.items,
    venues: pagedVenues.items,
    pager:
      tab === 'waitlist' ? pagedWaitlist : tab === 'people' ? pagedPeople : pagedVenues,
    setPage,
    approve,
    openKitchen,
    openMemberKitchen,
    logout,
    goKitchen: () => {
      impersonationStore.clear()
      navigate('/dashboard')
    },
    goSetup: () => navigate('/dashboard/setup'),
  }
}
