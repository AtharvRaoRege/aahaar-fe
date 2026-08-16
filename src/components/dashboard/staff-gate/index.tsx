import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'
import { Skeleton } from '@/components/global/skeleton'
import { authApi } from '@/lib/api/auth'
import { staffSignOut } from '@/lib/auth/staff-sign-out'
import { tokenStore } from '@/lib/auth/token-store'
import { useAuth } from '@/lib/auth/use-auth'
import { impersonationStore } from '@/lib/dashboard/impersonation-store'
import { queryKeys } from '@/lib/query/keys'
import type { User } from '@/types/auth'

import { Inner, Page, Panel, Subtitle, Title } from '@/pages/dashboard/access/styled'

function nextPath(user: User, current: string, impersonating: boolean): string | null {
  const onPhone = current === '/dashboard/phone'
  const onWaitlist = current === '/dashboard/waitlist'
  const onSetup = current === '/dashboard/setup'
  const onAdmin = current === '/dashboard/admin'
  const onKitchen =
    current === '/dashboard' ||
    current.startsWith('/dashboard/menu') ||
    current.startsWith('/dashboard/qr') ||
    current.startsWith('/dashboard/settings')
  const approved = user.isSuperAdmin || user.approvalStatus !== 'WAITLIST'
  const hasPhone = Boolean(user.phone?.trim())

  if (!hasPhone && !onPhone) return '/dashboard/phone'
  if (!hasPhone && onPhone) return null

  if (!approved) {
    return onWaitlist ? null : '/dashboard/waitlist'
  }

  if (onPhone || onWaitlist) {
    if (user.hasRestaurant === false) {
      return user.isSuperAdmin ? '/dashboard/admin' : '/dashboard/setup'
    }
    return '/dashboard'
  }

  if (user.hasRestaurant === false) {
    if (onSetup || (user.isSuperAdmin && onAdmin)) return null
    if (user.isSuperAdmin && impersonating && onKitchen) return null
    return user.isSuperAdmin ? '/dashboard/admin' : '/dashboard/setup'
  }

  if (onSetup) return '/dashboard'
  if (onAdmin && !user.isSuperAdmin) return '/dashboard'
  return null
}

export function StaffGate() {
  const { t } = useTranslation(['dashboard', 'common'])
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const me = useQuery({
    queryKey: queryKeys.me,
    queryFn: authApi.me,
    enabled: isAuthenticated,
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
  })

  useEffect(() => {
    if (me.data) tokenStore.setUser(me.data)
  }, [me.data])

  if (isAuthenticated && me.isLoading && !me.data) {
    return (
      <div style={{ flex: 1, display: 'grid', placeItems: 'center', minHeight: '100dvh' }}>
        <Skeleton height="72px" width="240px" />
      </div>
    )
  }

  if (isAuthenticated && me.isError && !me.data) {
    return (
      <Page>
        <Inner>
          <Panel>
            <Title>{t('gate.loadFailed')}</Title>
            <Subtitle>{t('login.loadFailed')}</Subtitle>
            <Button onClick={() => void me.refetch()}>{t('gate.retry')}</Button>
            <Button
              variant="outline"
              onClick={() => {
                void staffSignOut().finally(() => {
                  navigate('/dashboard/login', { replace: true })
                })
              }}
            >
              {t('nav.logout')}
            </Button>
          </Panel>
        </Inner>
      </Page>
    )
  }

  const current = me.data
  if (!current) return <Outlet />

  const redirect = nextPath(
    current,
    location.pathname,
    Boolean(impersonationStore.get()),
  )
  if (redirect) return <Navigate to={redirect} replace />
  return <Outlet />
}
