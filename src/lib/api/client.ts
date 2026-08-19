import axios from 'axios'
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'

import { API_BASE } from '@/lib/api/origin'
import { signOutClerk } from '@/lib/auth/clerk'
import { clearLocalSession, markSessionReplaced } from '@/lib/auth/local-session'
import { tokenStore } from '@/lib/auth/token-store'
import { getAccessToken, isSupabaseEnabled, signOut } from '@/lib/supabase/auth'
import type { Tokens } from '@/types/auth'

export { API_BASE }


export class ApiRequestError extends Error {
  code: string
  status: number
  details?: unknown

  constructor(code: string, message: string, status: number, details?: unknown) {
    super(message)
    this.name = 'ApiRequestError'
    this.code = code
    this.status = status
    this.details = details
  }
}

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = (await getAccessToken()) ?? tokenStore.getAccess()
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  if (config.data instanceof FormData) {
    config.headers.delete('Content-Type')
  }
  return config
})

let refreshing: Promise<string | null> | null = null

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = tokenStore.getRefresh()
  if (!refreshToken) return null
  try {
    const { data } = await axios.post<Tokens>(`${API_BASE}/auth/refresh`, {
      refreshToken,
    })
    tokenStore.setTokens(data)
    return data.accessToken
  } catch {
    clearLocalSession()
    window.dispatchEvent(new CustomEvent('aahaar:unauthorized'))
    return null
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ error?: { code: string; message: string; details?: unknown } }>) => {
    const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined
    const status = error.response?.status ?? 0
    const payload = error.response?.data?.error

    if (status === 401 && payload?.code === 'SESSION_REPLACED') {
      markSessionReplaced()
      clearLocalSession()
      await signOutClerk()
      window.dispatchEvent(new CustomEvent('aahaar:unauthorized'))
      throw new ApiRequestError(
        payload.code,
        payload.message ?? 'This account is signed in on another device.',
        status,
        payload.details,
      )
    }

    const isAuthEndpoint =
      original?.url?.includes('/auth/refresh') || original?.url?.includes('/auth/login')
    if (
      status === 401 &&
      original &&
      !original._retry &&
      !isAuthEndpoint &&
      tokenStore.getRefresh()
    ) {
      original._retry = true
      refreshing = refreshing ?? refreshAccessToken()
      const newToken = await refreshing
      refreshing = null
      if (newToken) {
        original.headers.set('Authorization', `Bearer ${newToken}`)
        return api(original)
      }
    }

    if (status === 401 && !isAuthEndpoint) {
      if (isSupabaseEnabled) await signOut()
      clearLocalSession()
      window.dispatchEvent(new CustomEvent('aahaar:unauthorized'))
    }

    // The account is still on the waitlist. Keep the session and send them to
    // the waitlist screen instead of surfacing a permission error per request.
    if (status === 403 && payload?.code === 'WAITLISTED') {
      window.dispatchEvent(new CustomEvent('aahaar:waitlisted'))
    }

    throw new ApiRequestError(
      payload?.code ?? 'NETWORK_ERROR',
      payload?.message ?? error.message ?? 'Something went wrong.',
      status,
      payload?.details,
    )
  },
)
