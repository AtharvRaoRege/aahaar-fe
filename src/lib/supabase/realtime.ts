import type { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js'

import { supabase } from './client'

export type OrderChangePayload = RealtimePostgresChangesPayload<{
  id: string
  restaurant_id: string
  status: string
  order_number: number
  total: number
  table_number: string | null
  room_number: string | null
  updated_at: string
}>

function requireClient() {
  if (!supabase) throw new Error('Supabase is not configured')
  return supabase
}

export function subscribeToRestaurantOrders(
  restaurantId: string,
  onEvent: (payload: OrderChangePayload) => void,
): RealtimeChannel {
  return requireClient()
    .channel(`orders:restaurant:${restaurantId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'orders',
        filter: `restaurant_id=eq.${restaurantId}`,
      },
      onEvent,
    )
    .subscribe()
}

export function subscribeToOrder(
  orderId: string,
  onEvent: (payload: OrderChangePayload) => void,
): RealtimeChannel {
  return requireClient()
    .channel(`orders:single:${orderId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'orders',
        filter: `id=eq.${orderId}`,
      },
      onEvent,
    )
    .subscribe()
}

export function subscribeToReviews(
  restaurantId: string,
  onEvent: (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => void,
): RealtimeChannel {
  return requireClient()
    .channel(`reviews:restaurant:${restaurantId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'reviews',
        filter: `restaurant_id=eq.${restaurantId}`,
      },
      onEvent,
    )
    .subscribe()
}

export function unsubscribe(channel: RealtimeChannel) {
  if (!supabase) return
  supabase.removeChannel(channel)
}
