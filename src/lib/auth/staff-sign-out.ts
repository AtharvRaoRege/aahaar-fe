import { authApi } from '@/lib/api/auth'
import { signOutClerk } from '@/lib/auth/clerk'
import { clearLocalSession } from '@/lib/auth/local-session'
import { tokenStore } from '@/lib/auth/token-store'

export async function staffSignOut() {
  const refresh = tokenStore.getRefresh()
  await signOutClerk()
  clearLocalSession()
  if (refresh) {
    await authApi.logout(refresh).catch(() => undefined)
  }
}
