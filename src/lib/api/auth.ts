import axios from 'axios'

import { api, API_BASE } from '@/lib/api/client'
import type {
  AuthResult,
  LoginPayload,
  RegisterPayload,
  Tokens,
  User,
} from '@/types/auth'

export const authApi = {
  async syncClerk(clerkToken: string): Promise<AuthResult> {
    const { data } = await axios.post<AuthResult>(
      `${API_BASE}/auth/clerk/sync`,
      {},
      { headers: { Authorization: `Bearer ${clerkToken}` } },
    )
    return data
  },
  async login(payload: LoginPayload): Promise<AuthResult> {
    const { data } = await api.post<AuthResult>('/auth/login', payload)
    return data
  },
  async register(payload: RegisterPayload): Promise<AuthResult> {
    const { data } = await api.post<AuthResult>('/auth/register', payload)
    return data
  },
  async me(): Promise<User> {
    const { data } = await api.get<User>('/auth/me')
    return data
  },
  async updateMe(payload: { phone?: string; fullName?: string }): Promise<User> {
    const { data } = await api.patch<User>('/auth/me', payload)
    return data
  },
  async logout(refreshToken: string): Promise<void> {
    await api.post('/auth/logout', { refreshToken })
  },
  async refresh(refreshToken: string): Promise<Tokens> {
    const { data } = await api.post<Tokens>('/auth/refresh', { refreshToken })
    return data
  },
}
