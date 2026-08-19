import { api } from '@/lib/api/client'
import type { AdminMember, AdminVenue, PlanRequestRow } from '@/types/admin'
import type { User, WaitlistUser } from '@/types/auth'

export const adminApi = {
  async waitlist(): Promise<WaitlistUser[]> {
    const { data } = await api.get<WaitlistUser[]>('/admin/waitlist')
    return data
  },
  async approve(userId: string): Promise<User> {
    const { data } = await api.post<User>(`/admin/waitlist/${userId}/approve`)
    return data
  },
  async users(): Promise<AdminMember[]> {
    const { data } = await api.get<AdminMember[]>('/admin/users')
    return data
  },
  async restaurants(): Promise<AdminVenue[]> {
    const { data } = await api.get<AdminVenue[]>('/admin/restaurants')
    return data
  },
  async planRequests(): Promise<PlanRequestRow[]> {
    const { data } = await api.get<PlanRequestRow[]>('/admin/plan-requests')
    return data
  },
  async approvePlan(requestId: string): Promise<void> {
    await api.post(`/admin/plan-requests/${requestId}/approve`)
  },
  async rejectPlan(requestId: string): Promise<void> {
    await api.post(`/admin/plan-requests/${requestId}/reject`)
  },
  async rejectWaitlist(userId: string): Promise<void> {
    await api.post(`/admin/waitlist/${userId}/reject`)
  },
  async setUserActive(userId: string, isActive: boolean): Promise<AdminMember> {
    const { data } = await api.post<AdminMember>(`/admin/users/${userId}/active`, {
      isActive,
    })
    return data
  },
  async setPublished(restaurantId: string, isPublished: boolean): Promise<AdminVenue> {
    const { data } = await api.post<AdminVenue>(`/admin/restaurants/${restaurantId}/publish`, {
      isPublished,
    })
    return data
  },
  async setVenueActive(restaurantId: string, isActive: boolean): Promise<AdminVenue> {
    const { data } = await api.post<AdminVenue>(`/admin/restaurants/${restaurantId}/active`, {
      isActive,
    })
    return data
  },
  async assignPlan(restaurantId: string, plan: 'BASIC' | 'PRO'): Promise<void> {
    await api.post(`/admin/restaurants/${restaurantId}/plan`, { plan })
  },
}
