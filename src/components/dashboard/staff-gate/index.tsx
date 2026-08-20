import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'
import { RouteLoading } from '@/components/global/route-loading'
import { LogoutButton } from '@/components/dashboard/logout-confirm'
import { authApi } from '@/lib/api/auth'
import { tokenStore } from '@/lib/auth/token-store'
import { useAuth } from '@/lib/auth/use-auth'
import { freshFor } from '@/lib/query/cache'
import { queryKeys } from '@/lib/query/keys'
import type { User } from '@/types/auth'

import { Inner, Page, Panel, Subtitle, Title } from '@/pages/dashboard/access/styled'

function nextPath(user: User, current: string): string | null {
  const onPhone = current === '/dashboard/phone'
  const onWaitlist = current === '/dashboard/waitlist'
  const onSetup = current === '/dashboard/setup'
  const onAdmin = current === '/dashboard/admin'
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
    // Super admins can open kitchen tabs (skeleton / empty). Owners go set up.
    if (user.isSuperAdmin) {
      if (onSetup) return '/dashboard/admin'
      return null
    }
    if (onSetup) return null
    return '/dashboard/setup'
  }

  if (onSetup) return '/dashboard'
  if (onAdmin && !user.isSuperAdmin) return '/dashboard'
  return null
}

export function StaffGate() {
  const { t } = useTranslation(['dashboard', 'common'])
  const { isAuthenticated, user: cachedUser } = useAuth()
  const location = useLocation()
  const me = useQuery({
    queryKey: queryKeys.me,
    queryFn: authApi.me,
    enabled: isAuthenticated,
    // Approval is granted by a human, so a timer adds nothing a focus refetch
    // does not already cover when the staff member comes back to the tab.
    staleTime: freshFor.ownAction,
  })

  useEffect(() => {
    if (me.data) tokenStore.setUser(me.data)
  }, [me.data])

  if (isAuthenticated && me.isLoading && !me.data && !cachedUser) {
    return <RouteLoading />
  }

  const current = me.data ?? cachedUser

  if (isAuthenticated && me.isError && !current) {
    return (
      <Page>
        <Inner>
          <Panel>
            <Title>{t('gate.loadFailed')}</Title>
            <Subtitle>{t('login.loadFailed')}</Subtitle>
            <Button onClick={() => void me.refetch()}>{t('gate.retry')}</Button>
            <LogoutButton />
          </Panel>
        </Inner>
      </Page>
    )
  }

  if (!current) return <Outlet />

  const redirect = nextPath(current, location.pathname)
  if (redirect) return <Navigate to={redirect} replace />
  return <Outlet />
}
