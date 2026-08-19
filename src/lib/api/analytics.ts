import { api } from '@/lib/api/client'
import type { AnalyticsSummary, DishPerformance } from '@/types/analytics'

export const analyticsApi = {
  async summary(restaurantId: string, rangeDays: number): Promise<AnalyticsSummary> {
    const { data } = await api.get<AnalyticsSummary>(
      `/restaurants/${restaurantId}/analytics/summary`,
      { params: { rangeDays } },
    )
    return data
  },
  async dishes(restaurantId: string, rangeDays: number): Promise<DishPerformance> {
    const { data } = await api.get<DishPerformance>(
      `/restaurants/${restaurantId}/analytics/dishes`,
      { params: { rangeDays } },
    )
    return data
  },
}
