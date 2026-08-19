import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { QueryClient } from '@tanstack/react-query'
import type { Socket } from 'socket.io-client'

import { STAGE_ADVANCE, STAGE_STATUSES, stageOf } from '@/constants/order-stage'
import type { OrderStage } from '@/constants/order-stage'
import { useLiveSocket } from '@/hooks/global/use-live-socket/helper'
import { ordersApi } from '@/lib/api/orders'
import type { ListOrdersParams, OrderCountParams } from '@/lib/api/orders'
import { qrApi } from '@/lib/api/qr'
import { waiterApi } from '@/lib/api/waiter'
import { tokenStore } from '@/lib/auth/token-store'
import { fallbackPoll, freshFor } from '@/lib/query/cache'
import { queryKeys } from '@/lib/query/keys'
import { SOCKET_EVENTS } from '@/lib/socket/socket'
import { errorMessage } from '@/utils/error-message'
import type { Page } from '@/types/common'
import type { Order, OrderEvent, OrderStatus } from '@/types/order'
import type { WaiterCall } from '@/types/waiter'

/**
 * Time window. Purely a window — which tickets are open is the tab's job, so the
 * two controls never contradict each other.
 */
export const WHEN_OPTIONS = ['all', 'today', 'week'] as const
export type WhenKey = (typeof WHEN_OPTIONS)[number]

/**
 * `open` is every ticket the floor still owes the guest something on. Keeping it
 * in the same list as the individual stages means the tab and its count are
 * always derived from one set of filters.
 */
export const STATUS_FILTERS = ['open', 'NEW', 'PREPARING', 'READY', 'CLOSED', 'all'] as const
export type StatusFilter = (typeof STATUS_FILTERS)[number]

const WHEN_HOURS: Record<WhenKey, number | undefined> = {
  all: undefined,
  today: 24,
  week: 24 * 7,
}

const OPEN_STATUSES: OrderStatus[] = [
  ...STAGE_STATUSES.NEW,
  ...STAGE_STATUSES.PREPARING,
  ...STAGE_STATUSES.READY,
]

function statusesFor(filter: StatusFilter): OrderStatus[] | undefined {
  if (filter === 'all') return undefined
  if (filter === 'open') return OPEN_STATUSES
  return STAGE_STATUSES[filter as OrderStage]
}

function isOrderPage(value: unknown): value is Page<Order> {
  return Boolean(value && typeof value === 'object' && Array.isArray((value as Page<Order>).items))
}

function patchOrderLists(
  queryClient: QueryClient,
  restaurantId: string,
  updater: (items: Order[]) => Order[],
) {
  queryClient.setQueriesData({ queryKey: ['orders', restaurantId] }, (current) => {
    if (!isOrderPage(current)) return current
    return { ...current, items: updater(current.items) }
  })
}

function applyOrder(queryClient: QueryClient, restaurantId: string, order: Order) {
  queryClient.setQueryData(queryKeys.order(order.id), order)
  patchOrderLists(queryClient, restaurantId, (items) => {
    const index = items.findIndex((item) => item.id === order.id)
    if (index === -1) return [order, ...items]
    const next = [...items]
    next[index] = { ...items[index], ...order }
    return next
  })
}

function applyEvent(queryClient: QueryClient, restaurantId: string, event: OrderEvent) {
  queryClient.setQueryData(queryKeys.order(event.orderId), (current: Order | undefined) => {
    if (!current) return current
    return { ...current, status: event.status, updatedAt: event.updatedAt }
  })
  patchOrderLists(queryClient, restaurantId, (items) =>
    items.map((item) =>
      item.id === event.orderId
        ? { ...item, status: event.status, updatedAt: event.updatedAt }
        : item,
    ),
  )
}

export function useOrdersPage(restaurantId: string) {
  const queryClient = useQueryClient()
  const [status, setStatus] = useState<StatusFilter>('open')
  const [search, setSearch] = useState('')
  const [table, setTable] = useState('')
  const [when, setWhen] = useState<WhenKey>('all')
  const [freshIds, setFreshIds] = useState<Set<string>>(new Set())
  const [busyIds, setBusyIds] = useState<Set<string>>(new Set())

  const debouncedSearch = useDebounced(search, 300)
  const sinceHours = WHEN_HOURS[when]

  /**
   * One filter basis for both the list and the tab counts. When these drifted
   * apart the tabs claimed "All 10" over a three-ticket list.
   */
  const scope: OrderCountParams = useMemo(
    () => ({
      ...(debouncedSearch.trim() ? { search: debouncedSearch.trim() } : {}),
      ...(table.trim() ? { tableNumber: table.trim() } : {}),
      ...(sinceHours ? { sinceHours } : {}),
    }),
    [debouncedSearch, table, sinceHours],
  )

  const listParams: ListOrdersParams = useMemo(() => {
    const statuses = statusesFor(status)
    return { pageSize: 60, ...scope, ...(statuses ? { status: statuses } : {}) }
  }, [scope, status])

  const bindLive = useCallback(
    (socket: Socket) => {
      const timers: number[] = []
      const refresh = () => {
        void queryClient.invalidateQueries({ queryKey: ['orders', restaurantId] })
        void queryClient.invalidateQueries({ queryKey: queryKeys.waiterCalls(restaurantId) })
      }
      const applyAuth = () => {
        const token = tokenStore.getAccess()
        socket.auth = token ? { token } : {}
      }
      const join = () => {
        applyAuth()
        socket.emit(SOCKET_EVENTS.joinRestaurant, { restaurantId }, (ack?: { ok?: boolean }) => {
          if (ack && ack.ok === false) applyAuth()
        })
      }
      const flash = (orderId: string) => {
        setFreshIds((prev) => new Set(prev).add(orderId))
        timers.push(
          window.setTimeout(() => {
            setFreshIds((prev) => {
              const next = new Set(prev)
              next.delete(orderId)
              return next
            })
          }, 1600),
        )
      }
      const onCreated = (event: OrderEvent) => {
        flash(event.orderId)
        refresh()
      }
      const onUpdated = (event: OrderEvent) => {
        applyEvent(queryClient, restaurantId, event)
        refresh()
        if (event.itemsAdded) flash(event.orderId)
      }
      socket.io.on('reconnect_attempt', applyAuth)
      socket.on('connect', join)
      socket.on(SOCKET_EVENTS.orderCreated, onCreated)
      socket.on(SOCKET_EVENTS.orderUpdated, onUpdated)
      socket.on(SOCKET_EVENTS.orderStatusUpdated, onUpdated)
      socket.on(SOCKET_EVENTS.orderAccepted, onUpdated)
      socket.on(SOCKET_EVENTS.orderRejected, onUpdated)
      socket.on(SOCKET_EVENTS.waiterCalled, refresh)
      socket.on(SOCKET_EVENTS.waiterAcked, refresh)
      if (socket.connected) join()
      return () => {
        timers.forEach((id) => window.clearTimeout(id))
        socket.io.off('reconnect_attempt', applyAuth)
        socket.off('connect', join)
        socket.off(SOCKET_EVENTS.orderCreated, onCreated)
        socket.off(SOCKET_EVENTS.orderUpdated, onUpdated)
        socket.off(SOCKET_EVENTS.orderStatusUpdated, onUpdated)
        socket.off(SOCKET_EVENTS.orderAccepted, onUpdated)
        socket.off(SOCKET_EVENTS.orderRejected, onUpdated)
        socket.off(SOCKET_EVENTS.waiterCalled, refresh)
        socket.off(SOCKET_EVENTS.waiterAcked, refresh)
      }
    },
    [restaurantId, queryClient],
  )

  const live = useLiveSocket(Boolean(restaurantId), tokenStore.getAccess() ?? undefined, bindLive)

  const query = useQuery({
    queryKey: queryKeys.orders(restaurantId, listParams),
    queryFn: () => ordersApi.listForRestaurant(restaurantId, listParams),
    staleTime: freshFor.live,
    refetchInterval: fallbackPoll(live, 20_000),
  })

  const countsQuery = useQuery({
    queryKey: queryKeys.orderCounts(restaurantId, scope),
    queryFn: () => ordersApi.counts(restaurantId, scope),
    staleTime: freshFor.live,
    refetchInterval: fallbackPoll(live, 20_000),
  })

  const qrQuery = useQuery({
    queryKey: queryKeys.qr(restaurantId),
    queryFn: () => qrApi.list(restaurantId),
    staleTime: freshFor.slow,
  })

  const waiterQuery = useQuery({
    queryKey: queryKeys.waiterCalls(restaurantId),
    queryFn: () => waiterApi.list(restaurantId),
    staleTime: freshFor.live,
    refetchInterval: fallbackPoll(live, 20_000),
  })

  const markBusy = (orderId: string) => {
    setBusyIds((prev) => new Set(prev).add(orderId))
  }
  const markFree = (orderId: string) => {
    setBusyIds((prev) => {
      const next = new Set(prev)
      next.delete(orderId)
      return next
    })
  }

  const afterAction = (order: Order) => {
    applyOrder(queryClient, restaurantId, order)
    void queryClient.invalidateQueries({ queryKey: ['orders', restaurantId] })
  }

  const accept = useMutation({
    mutationFn: (orderId: string) => ordersApi.accept(orderId),
    onMutate: markBusy,
    onSuccess: afterAction,
    onSettled: (_data, _error, orderId) => markFree(orderId),
  })
  const reject = useMutation({
    mutationFn: (orderId: string) => ordersApi.reject(orderId),
    onMutate: markBusy,
    onSuccess: afterAction,
    onSettled: (_data, _error, orderId) => markFree(orderId),
  })
  const advance = useMutation({
    mutationFn: ({ orderId, status: target }: { orderId: string; status: OrderStatus }) =>
      ordersApi.advance(orderId, target),
    onMutate: ({ orderId }) => markBusy(orderId),
    onSuccess: afterAction,
    onSettled: (_data, _error, variables) => markFree(variables.orderId),
  })
  const ackWaiter = useMutation({
    mutationFn: (callId: string) => waiterApi.ack(restaurantId, callId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.waiterCalls(restaurantId) })
    },
  })

  const orders: Order[] = query.data?.items ?? []
  const totals = countsQuery.data
  const counts: Record<StatusFilter, number> = {
    open: (totals?.new ?? 0) + (totals?.cooking ?? 0) + (totals?.ready ?? 0),
    NEW: totals?.new ?? 0,
    PREPARING: totals?.cooking ?? 0,
    READY: totals?.ready ?? 0,
    CLOSED: totals?.closed ?? 0,
    all: totals?.all ?? 0,
  }
  const actionError =
    (accept.isError ? errorMessage(accept.error) : '') ||
    (reject.isError ? errorMessage(reject.error) : '') ||
    (advance.isError ? errorMessage(advance.error) : '') ||
    (ackWaiter.isError ? errorMessage(ackWaiter.error) : '')

  const tableOptions = useMemo(() => {
    const tables = (qrQuery.data ?? [])
      .filter((row) => row.tableNumber)
      .map((row) => ({
        value: row.tableNumber as string,
        label: row.label || `Table ${row.tableNumber}`,
      }))
    const seen = new Set<string>()
    return tables.filter((row) => {
      if (seen.has(row.value)) return false
      seen.add(row.value)
      return true
    })
  }, [qrQuery.data])

  const advanceStage = (order: Order) => {
    const target = STAGE_ADVANCE[stageOf(order.status)]
    if (target) advance.mutate({ orderId: order.id, status: target })
  }

  const hasFilters =
    Boolean(search.trim() || table.trim()) || when !== 'all' || status !== 'open'

  return {
    query,
    orders,
    counts,
    liveWork: counts.open,
    live,
    total: query.data?.total ?? orders.length,
    actionError,
    status,
    setStatus,
    search,
    setSearch,
    table,
    setTable,
    tableOptions,
    when,
    setWhen,
    hasFilters,
    clearFilters: () => {
      setSearch('')
      setTable('')
      setWhen('all')
      setStatus('open')
    },
    waiterCalls: (waiterQuery.data ?? []) as WaiterCall[],
    ackWaiter: (callId: string) => ackWaiter.mutate(callId),
    waiterBusy: ackWaiter.isPending ? ackWaiter.variables : null,
    freshIds,
    busyIds,
    accept: (orderId: string) => accept.mutate(orderId),
    reject: (orderId: string) => reject.mutate(orderId),
    advanceStage,
  }
}

function useDebounced(value: string, delay: number): string {
  const [settled, setSettled] = useState(value)
  useEffect(() => {
    const id = window.setTimeout(() => setSettled(value), delay)
    return () => window.clearTimeout(id)
  }, [value, delay])
  return settled
}
