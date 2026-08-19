import type { ListOrdersParams, OrderCountParams } from '@/lib/api/orders'

/** Central query-key factory so invalidation stays consistent. */
export const queryKeys = {
  me: ['me'] as const,
  waitlist: ['admin', 'waitlist'] as const,
  adminUsers: ['admin', 'users'] as const,
  adminRestaurants: ['admin', 'restaurants'] as const,
  adminPlanRequests: ['admin', 'plan-requests'] as const,
  restaurants: ['restaurants'] as const,
  restaurant: (id: string) => ['restaurants', id] as const,
  dashboardMenu: (restaurantId: string) => ['menu', 'dashboard', restaurantId] as const,
  menuImport: (restaurantId: string, jobId: string) =>
    ['menu', 'import', restaurantId, jobId] as const,
  publicRestaurant: (slug: string) => ['public', 'restaurant', slug] as const,
  publicMenu: (slug: string) => ['public', 'menu', slug] as const,
  customerSession: (id: string) => ['customer-session', id] as const,
  openOrder: (sessionId: string) => ['open-order', sessionId] as const,
  orders: (restaurantId: string, params: ListOrdersParams) =>
    ['orders', restaurantId, params] as const,
  order: (orderId: string) => ['order', orderId] as const,
  orderCounts: (restaurantId: string, params: OrderCountParams) =>
    ['orders', restaurantId, 'counts', params] as const,
  waiterCalls: (restaurantId: string) => ['waiter-calls', restaurantId] as const,
  qr: (restaurantId: string) => ['qr', restaurantId] as const,
  reviewQr: (restaurantId: string) => ['qr', 'review', restaurantId] as const,
  reviews: (restaurantId: string, page: number) => ['reviews', restaurantId, page] as const,
  reviewSummary: (restaurantId: string) => ['reviews', 'summary', restaurantId] as const,
  plans: ['plans'] as const,
  subscription: (restaurantId: string) => ['subscription', restaurantId] as const,
  publishReadiness: (restaurantId: string) =>
    ['publish-readiness', restaurantId] as const,
  offers: (restaurantId: string) => ['offers', restaurantId] as const,
  publicOffers: (slug: string) => ['public', 'offers', slug] as const,
  publicReviewSummary: (slug: string) =>
    ['public', 'reviews', 'summary', slug] as const,
  upsells: (menuItemId: string) => ['upsells', menuItemId] as const,
  publicUpsells: (slug: string, menuItemId: string) =>
    ['public', 'upsells', slug, menuItemId] as const,
  analyticsSummary: (restaurantId: string, rangeDays: number) =>
    ['analytics', 'summary', restaurantId, rangeDays] as const,
  dishPerformance: (restaurantId: string, rangeDays: number) =>
    ['analytics', 'dishes', restaurantId, rangeDays] as const,
}
