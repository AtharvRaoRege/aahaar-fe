import type { User } from '@/types/auth'

export function staffHomePath(
  user: Pick<User, 'phone' | 'approvalStatus' | 'isSuperAdmin' | 'hasRestaurant'>,
): string {
  if (!user.phone?.trim()) return '/dashboard/phone'
  if (!user.isSuperAdmin && user.approvalStatus === 'WAITLIST') {
    return '/dashboard/waitlist'
  }
  if (user.hasRestaurant === false) {
    return user.isSuperAdmin ? '/dashboard/admin' : '/dashboard/setup'
  }
  return '/dashboard'
}
