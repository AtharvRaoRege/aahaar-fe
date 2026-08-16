export const USER_ROLES = ['OWNER', 'MANAGER', 'RECEPTION', 'KITCHEN'] as const
export type UserRole = (typeof USER_ROLES)[number]

export const APPROVAL_STATUSES = ['WAITLIST', 'APPROVED'] as const
export type ApprovalStatus = (typeof APPROVAL_STATUSES)[number]

export interface User {
  id: string
  tenantId: string
  email: string
  fullName: string
  phone: string | null
  role: UserRole
  approvalStatus: ApprovalStatus
  isSuperAdmin: boolean
  isActive: boolean
  hasRestaurant: boolean
}

export interface Tokens {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
}

export interface AuthResult {
  user: User
  tokens: Tokens
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  ownerName: string
  email: string
  phone: string
  password: string
}

export interface WaitlistUser extends User {
  createdAt?: string | null
}
