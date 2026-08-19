import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { adminApi } from '@/lib/api/admin'
import { useAuth } from '@/lib/auth/use-auth'
import { impersonationStore } from '@/lib/dashboard/impersonation-store'
import { restaurantStore } from '@/lib/dashboard/restaurant-store'
import { freshFor } from '@/lib/query/cache'
import { queryKeys } from '@/lib/query/keys'
import type { AdminMember, AdminVenue } from '@/types/admin'
import type { User } from '@/types/auth'

export type AdminTab = 'waitlist' | 'people' | 'venues' | 'plans'
export type VenueView = 'all' | 'live' | 'draft' | 'pro'
export type PeopleView = 'all' | 'waitlist' | 'blocked'

export type AdminConfirm =
  | { kind: 'rejectWaitlist'; id: string; name: string }
  | { kind: 'lockUser'; id: string; name: string }
  | { kind: 'forceBasic'; id: string; name: string }

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
  return value === 'waitlist' || value === 'people' || value === 'venues' || value === 'plans'
}

export function isVenueView(value: string | null): value is VenueView {
  return value === 'all' || value === 'live' || value === 'draft' || value === 'pro'
}

export function isPeopleView(value: string | null): value is PeopleView {
  return value === 'all' || value === 'waitlist' || value === 'blocked'
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

export function publicMenuUrl(slug: string) {
  return `${window.location.origin}/r/${slug}`
}

export async function copyText(value: string) {
  await navigator.clipboard.writeText(value)
}

export function adminConfirmCopy(
  confirm: AdminConfirm | null,
  t: (key: string, opts?: { name: string }) => string,
) {
  const name = confirm?.name ?? ''
  if (confirm?.kind === 'rejectWaitlist') {
    return {
      title: t('admin.rejectWaitlistTitle'),
      message: t('admin.rejectWaitlistMessage', { name }),
      confirmLabel: t('admin.reject'),
    }
  }
  if (confirm?.kind === 'lockUser') {
    return {
      title: t('admin.blockTitle'),
      message: t('admin.blockMessage', { name }),
      confirmLabel: t('admin.block'),
    }
  }
  return {
    title: t('admin.makeBasicTitle'),
    message: t('admin.makeBasicMessage', { name }),
    confirmLabel: t('admin.makeBasic'),
  }
}

function matchesVenueView(venue: AdminVenue, view: VenueView) {
  if (view === 'live') return venue.isPublished
  if (view === 'draft') return !venue.isPublished
  if (view === 'pro') return venue.plan === 'PRO'
  return true
}

function matchesPeopleView(member: AdminMember, view: PeopleView) {
  if (view === 'waitlist') return member.approvalStatus === 'WAITLIST' && member.isActive
  if (view === 'blocked') return !member.isActive
  return true
}

export function useAdminPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [copied, setCopied] = useState('')
  const [confirm, setConfirm] = useState<AdminConfirm | null>(null)
  const tabParam = searchParams.get('tab')
  const viewParam = searchParams.get('view')
  const tab: AdminTab = isAdminTab(tabParam) ? tabParam : 'waitlist'
  const venueView: VenueView = isVenueView(viewParam) ? viewParam : 'all'
  const peopleView: PeopleView = isPeopleView(viewParam) ? viewParam : 'all'

  const waitlistQuery = useQuery({
    queryKey: queryKeys.waitlist,
    queryFn: adminApi.waitlist,
    staleTime: freshFor.live,
    refetchInterval: 30_000,
  })
  const usersQuery = useQuery({
    queryKey: queryKeys.adminUsers,
    queryFn: adminApi.users,
  })
  const venuesQuery = useQuery({
    queryKey: queryKeys.adminRestaurants,
    queryFn: adminApi.restaurants,
  })
  const plansQuery = useQuery({
    queryKey: queryKeys.adminPlanRequests,
    queryFn: adminApi.planRequests,
    staleTime: freshFor.live,
    refetchInterval: 30_000,
  })

  const refreshPeople = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.waitlist }),
      queryClient.invalidateQueries({ queryKey: queryKeys.adminUsers }),
      queryClient.invalidateQueries({ queryKey: queryKeys.adminRestaurants }),
    ])

  const refreshVenues = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.adminRestaurants }),
      queryClient.invalidateQueries({ queryKey: queryKeys.adminPlanRequests }),
    ])

  const approve = useMutation({
    mutationFn: (userId: string) => adminApi.approve(userId),
    onSuccess: () => void refreshPeople(),
  })

  const rejectWaitlist = useMutation({
    mutationFn: (userId: string) => adminApi.rejectWaitlist(userId),
    onSuccess: () => {
      setConfirm(null)
      void refreshPeople()
    },
  })

  const setUserActive = useMutation({
    mutationFn: ({ userId, isActive }: { userId: string; isActive: boolean }) =>
      adminApi.setUserActive(userId, isActive),
    onSuccess: () => {
      setConfirm(null)
      void refreshPeople()
    },
  })

  const approvePlan = useMutation({
    mutationFn: (requestId: string) => adminApi.approvePlan(requestId),
    onSuccess: () => void refreshVenues(),
  })

  const rejectPlan = useMutation({
    mutationFn: (requestId: string) => adminApi.rejectPlan(requestId),
    onSuccess: () => void refreshVenues(),
  })

  const setPublished = useMutation({
    mutationFn: ({ restaurantId, isPublished }: { restaurantId: string; isPublished: boolean }) =>
      adminApi.setPublished(restaurantId, isPublished),
    onSuccess: () => void refreshVenues(),
  })

  const assignPlan = useMutation({
    mutationFn: ({ restaurantId, plan }: { restaurantId: string; plan: 'BASIC' | 'PRO' }) =>
      adminApi.assignPlan(restaurantId, plan),
    onSuccess: () => {
      setConfirm(null)
      void refreshVenues()
    },
  })

  const people = useMemo(() => {
    const rows = usersQuery.data ?? []
    return rows.filter(
      (row) =>
        matchesPeopleView(row, tab === 'people' ? peopleView : 'all') &&
        matchesQuery([row.fullName, row.email, row.phone, row.restaurantName], search),
    )
  }, [usersQuery.data, search, tab, peopleView])

  const venues = useMemo(() => {
    const rows = venuesQuery.data ?? []
    return rows.filter(
      (row) =>
        matchesVenueView(row, tab === 'venues' ? venueView : 'all') &&
        matchesQuery(
          [row.name, row.slug, row.ownerName, row.ownerEmail, row.venueKind, row.plan],
          search,
        ),
    )
  }, [venuesQuery.data, search, tab, venueView])

  const waitlist = useMemo(() => {
    const rows = waitlistQuery.data ?? []
    return rows.filter((row) => matchesQuery([row.fullName, row.email, row.phone], search))
  }, [waitlistQuery.data, search])

  const plans = useMemo(() => {
    const rows = plansQuery.data ?? []
    return rows.filter((row) =>
      matchesQuery(
        [row.restaurantName, row.ownerName, row.ownerEmail, row.ownerPhone, row.requestedPlan],
        search,
      ),
    )
  }, [plansQuery.data, search])

  const pagedWaitlist = useMemo(
    () => paginate(waitlist, page, ADMIN_PAGE_SIZE),
    [waitlist, page],
  )
  const pagedPeople = useMemo(() => paginate(people, page, ADMIN_PAGE_SIZE), [people, page])
  const pagedVenues = useMemo(() => paginate(venues, page, ADMIN_PAGE_SIZE), [venues, page])
  const pagedPlans = useMemo(() => paginate(plans, page, ADMIN_PAGE_SIZE), [plans, page])

  const allVenues = venuesQuery.data ?? []
  const overview = {
    waiting: (waitlistQuery.data ?? []).length,
    plans: (plansQuery.data ?? []).length,
    live: allVenues.filter((row) => row.isPublished).length,
    draft: allVenues.filter((row) => !row.isPublished).length,
    pro: allVenues.filter((row) => row.plan === 'PRO').length,
  }

  const setTab = (next: AdminTab, view?: VenueView | PeopleView) => {
    const params: Record<string, string> = {}
    if (next !== 'waitlist') params.tab = next
    if (view && view !== 'all') params.view = view
    setSearchParams(params, { replace: true })
    setSearch('')
    setPage(1)
  }

  const copy = async (key: string, value: string) => {
    await copyText(value)
    setCopied(key)
    window.setTimeout(() => setCopied(''), 1600)
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
    const venue = allVenues.find((row) => row.id === member.restaurantId)
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

  const runConfirm = () => {
    if (!confirm) return
    if (confirm.kind === 'rejectWaitlist') {
      rejectWaitlist.mutate(confirm.id)
      return
    }
    if (confirm.kind === 'lockUser') {
      setUserActive.mutate({ userId: confirm.id, isActive: false })
      return
    }
    assignPlan.mutate({ restaurantId: confirm.id, plan: 'BASIC' })
  }

  const pendingVenueId =
    setPublished.isPending
      ? setPublished.variables?.restaurantId
      : assignPlan.isPending
        ? assignPlan.variables?.restaurantId
        : null

  return {
    user,
    tab,
    setTab,
    venueView: tab === 'venues' ? venueView : 'all',
    peopleView: tab === 'people' ? peopleView : 'all',
    search,
    setSearch: (value: string) => {
      setSearch(value)
      setPage(1)
    },
    overview,
    waitlistQuery,
    usersQuery,
    venuesQuery,
    plansQuery,
    waitlist: pagedWaitlist.items,
    people: pagedPeople.items,
    venues: pagedVenues.items,
    plans: pagedPlans.items,
    pager:
      tab === 'waitlist'
        ? pagedWaitlist
        : tab === 'people'
          ? pagedPeople
          : tab === 'plans'
            ? pagedPlans
            : pagedVenues,
    setPage,
    copied,
    copy,
    confirm,
    setConfirm,
    runConfirm,
    confirmLoading:
      rejectWaitlist.isPending ||
      (setUserActive.isPending && !setUserActive.variables?.isActive) ||
      (assignPlan.isPending && assignPlan.variables?.plan === 'BASIC'),
    approve,
    rejectWaitlist,
    setUserActive,
    approvePlan,
    rejectPlan,
    setPublished,
    assignPlan,
    pendingVenueId,
    openKitchen,
    openMemberKitchen,
    goSetup: () => navigate('/dashboard/setup'),
    actionFailed:
      approve.isError ||
      rejectWaitlist.isError ||
      setUserActive.isError ||
      setPublished.isError ||
      assignPlan.isError,
    planFailed: approvePlan.isError || rejectPlan.isError,
  }
}
