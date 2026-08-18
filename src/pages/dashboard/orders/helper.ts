import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { QueryClient } from '@tanstack/react-query'

import { ordersApi } from '@/lib/api/orders'
import { tokenStore } from '@/lib/auth/token-store'
import { queryKeys } from '@/lib/query/keys'
import { createSocket, SOCKET_EVENTS } from '@/lib/socket/socket'
import { errorMessage } from '@/utils/error-message'
import type { Page } from '@/types/common'
import type { Order, OrderEvent, OrderStatus } from '@/types/order'

export type OrderFilter = 'active' | 'all'

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
  const [filter, setFilter] = useState<OrderFilter>('active')
  const [freshIds, setFreshIds] = useState<Set<string>>(new Set())
  const [busyIds, setBusyIds] = useState<Set<string>>(new Set())

  const listParams = filter === 'active' ? { active: true, pageSize: 50 } : { pageSize: 50 }

  const query = useQuery({
    queryKey: queryKeys.orders(restaurantId, listParams),
    queryFn: () => ordersApi.listForRestaurant(restaurantId, listParams),
    refetchInterval: 20_000,
  })

  const todayQuery = useQuery({
    queryKey: queryKeys.orders(restaurantId, { pageSize: 50 }),
    queryFn: () => ordersApi.listForRestaurant(restaurantId, { pageSize: 50 }),
    refetchInterval: 20_000,
  })

  useEffect(() => {
    const socket = createSocket(tokenStore.getAccess() ?? undefined)
    const refreshList = () => {
      void queryClient.invalidateQueries({ queryKey: ['orders', restaurantId] })
    }
    const timers: number[] = []
    const applyAuth = () => {
      const token = tokenStore.getAccess()
      socket.auth = token ? { token } : {}
    }
    const join = () => {
      applyAuth()
      socket.emit(SOCKET_EVENTS.joinRestaurant, { restaurantId }, (ack?: { ok?: boolean }) => {
        if (ack && ack.ok === false) {
          applyAuth()
        }
      })
    }
    const onCreated = (event: OrderEvent) => {
      setFreshIds((prev) => {
        const next = new Set(prev)
        next.add(event.orderId)
        return next
      })
      timers.push(
        window.setTimeout(() => {
          setFreshIds((prev) => {
            const next = new Set(prev)
            next.delete(event.orderId)
            return next
          })
        }, 1600),
      )
      refreshList()
    }
    const onUpdated = (event: OrderEvent) => {
      applyEvent(queryClient, restaurantId, event)
      refreshList()
      if (!event.itemsAdded) return
      setFreshIds((prev) => {
        const next = new Set(prev)
        next.add(event.orderId)
        return next
      })
      timers.push(
        window.setTimeout(() => {
          setFreshIds((prev) => {
            const next = new Set(prev)
            next.delete(event.orderId)
            return next
          })
        }, 1600),
      )
    }
    socket.io.on('reconnect_attempt', applyAuth)
    socket.on('connect', join)
    socket.on(SOCKET_EVENTS.orderCreated, onCreated)
    socket.on(SOCKET_EVENTS.orderUpdated, onUpdated)
    socket.on(SOCKET_EVENTS.orderStatusUpdated, onUpdated)
    socket.on(SOCKET_EVENTS.orderAccepted, onUpdated)
    socket.on(SOCKET_EVENTS.orderRejected, onUpdated)
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
      socket.disconnect()
    }
  }, [restaurantId, queryClient])

  const markBusy = (orderId: string) => {
    setBusyIds((prev) => {
      const next = new Set(prev)
      next.add(orderId)
      return next
    })
  }
  const markFree = (orderId: string) => {
    setBusyIds((prev) => {
      const next = new Set(prev)
      next.delete(orderId)
      return next
    })
  }

  const accept = useMutation({
    mutationFn: (orderId: string) => ordersApi.accept(orderId),
    onMutate: markBusy,
    onSuccess: (order) => applyOrder(queryClient, restaurantId, order),
    onSettled: (_data, _error, orderId) => markFree(orderId),
  })
  const reject = useMutation({
    mutationFn: (orderId: string) => ordersApi.reject(orderId),
    onMutate: markBusy,
    onSuccess: (order) => applyOrder(queryClient, restaurantId, order),
    onSettled: (_data, _error, orderId) => markFree(orderId),
  })
  const advance = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: OrderStatus }) =>
      ordersApi.updateStatus(orderId, status),
    onMutate: ({ orderId }) => markBusy(orderId),
    onSuccess: (order) => applyOrder(queryClient, restaurantId, order),
    onSettled: (_data, _error, variables) => markFree(variables.orderId),
  })

  const orders: Order[] = query.data?.items ?? []
  const todayOrders: Order[] = todayQuery.data?.items ?? orders
  const stats = {
    active: todayOrders.filter((o) =>
      ['PENDING', 'ACCEPTED', 'PREPARING', 'READY', 'SERVED'].includes(o.status),
    ).length,
    pending: todayOrders.filter((o) => o.status === 'PENDING').length,
    preparing: todayOrders.filter((o) => o.status === 'PREPARING').length,
    today: todayOrders.length,
  }
  const actionError =
    (accept.isError ? errorMessage(accept.error) : '') ||
    (reject.isError ? errorMessage(reject.error) : '') ||
    (advance.isError ? errorMessage(advance.error) : '')

  return {
    query,
    orders,
    stats,
    actionError,
    filter,
    setFilter,
    freshIds,
    busyIds,
    accept: (orderId: string) => accept.mutate(orderId),
    reject: (orderId: string) => reject.mutate(orderId),
    advance: (orderId: string, status: OrderStatus) =>
      advance.mutate({ orderId, status }),
  }
}
