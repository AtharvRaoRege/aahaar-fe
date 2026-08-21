export type AnalyticsEventType =
  | 'QR_SCAN'
  | 'MENU_VIEW'
  | 'ITEM_VIEW'
  | 'CATEGORY_FILTER'
  | 'OFFER_VIEW'

export interface LogEventPayload {
  eventType: AnalyticsEventType
  customerSessionId?: string | null
  tableNumber?: string | null
  visitorKey?: string | null
  targetId?: string | null
  meta?: Record<string, unknown> | null
}

export interface NamedCount {
  id: string | null
  label: string
  count: number
}

export interface DayPoint {
  day: string
  count: number
}

export interface HourPoint {
  hour: number
  count: number
}

export interface TableHighlight {
  orderCount: number
  completedCount: number
  revenue: number
  averageOrderValue: number
  uniqueGuests: number
  returningGuests: number
}

export interface UpsellImpact {
  acceptedCount: number
  attributedRevenue: number
}

export interface AnalyticsSummary {
  rangeDays: number
  plan: string
  isPro: boolean
  qrScans: number
  menuViews: number
  ordersPlaced: number
  ordersCompleted: number
  popularCategories: NamedCount[]
  uniqueVisitors: number | null
  repeatVisitors: number | null
  averageOrderValue: number | null
  totalRevenue: number | null
  topViewedItems: NamedCount[]
  topOrderedItems: NamedCount[]
  tableScans: NamedCount[]
  offerViews: NamedCount[]
  peakHours: HourPoint[]
  scansByDay: DayPoint[]
  tableHighlight: TableHighlight | null
  upsellImpact: UpsellImpact | null
}

export type DishVerdict = 'TOP' | 'STEADY' | 'SLOW' | 'NONE'

export interface DishRow {
  menuItemId: string
  name: string
  category: string | null
  price: number
  unitsSold: number
  revenue: number
  shareOfOrders: number
  verdict: DishVerdict
}

export interface DishPerformance {
  rangeDays: number
  top: DishRow[]
  slow: DishRow[]
  totalUnits: number
}
