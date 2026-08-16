import { api } from '@/lib/api/client'
import type { AdminMember, AdminVenue } from '@/types/admin'
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
}
