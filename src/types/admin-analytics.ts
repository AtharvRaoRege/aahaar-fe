export interface AdminDailyPoint {
  day: string
  orders: number
  revenue: number
}

export interface AdminTopVenue {
  restaurantId: string
  name: string
  venueKind: 'RESTAURANT' | 'HOTEL' | 'CAFE'
  plan: 'BASIC' | 'PRO' | null
  isPublished: boolean
  orders: number
  revenue: number
}

export interface AdminAnalyticsTotals {
  ordersPlaced: number
  ordersCompleted: number
  revenue: number
  revenueToday: number
  ordersToday: number
  venuesTotal: number
  venuesLive: number
  venuesPro: number
  venuesBasic: number
  ownersTotal: number
}

export interface AdminAnalytics {
  rangeDays: number
  totals: AdminAnalyticsTotals
  daily: AdminDailyPoint[]
  topVenues: AdminTopVenue[]
}
