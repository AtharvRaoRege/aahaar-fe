import type { ListOrdersParams } from '@/lib/api/orders'

/** Central query-key factory so invalidation stays consistent. */
export const queryKeys = {
  me: ['me'] as const,
  waitlist: ['admin', 'waitlist'] as const,
  adminUsers: ['admin', 'users'] as const,
  adminRestaurants: ['admin', 'restaurants'] as const,
  restaurants: ['restaurants'] as const,
  restaurant: (id: string) => ['restaurants', id] as const,
  dashboardMenu: (restaurantId: string) => ['menu', 'dashboard', restaurantId] as const,
  menuImport: (restaurantId: string, jobId: string) =>
    ['menu', 'import', restaurantId, jobId] as const,
  publicRestaurant: (slug: string) => ['public', 'restaurant', slug] as const,
  publicMenu: (slug: string) => ['public', 'menu', slug] as const,
  customerSession: (id: string) => ['customer-session', id] as const,
  orders: (restaurantId: string, params: ListOrdersParams) =>
    ['orders', restaurantId, params] as const,
  order: (orderId: string) => ['order', orderId] as const,
  qr: (restaurantId: string) => ['qr', restaurantId] as const,
}
