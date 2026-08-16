import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ClerkUserButton } from '@/components/dashboard/clerk-user-button'
import { BrandMark } from '@/components/global/brand-mark'
import { VenueSwitcher } from '@/components/dashboard/venue-switcher'
import { Button } from '@/components/global/button'
import { Skeleton } from '@/components/global/skeleton'
import type { DashboardOutlet } from '@/hooks/dashboard/context'

import { ADMIN_NAV, NAV_ITEMS, useDashboardLayout } from './helper'
import {
  AccountRow,
  BottomLink,
  BottomNav,
  Brand,
  Centered,
  LogoutWrap,
  Main,
  NavLinkItem,
  Shell,
  Sidebar,
  SidebarFoot,
  SidebarSwitch,
  UserName,
  ViewingBanner,
  ViewingCopy,
} from './styled'

export function DashboardLayout() {
  const { t } = useTranslation(['dashboard', 'common'])
  const {
    user,
    restaurant,
    impersonation,
    onAdmin,
    isLoading,
    isError,
    refetch,
    logout,
    exitImpersonation,
    restaurants,
    switchVenue,
  } = useDashboardLayout()

  if (isLoading) {
    return (
      <Shell>
        <Centered>
          <Skeleton height="240px" width="320px" />
        </Centered>
      </Shell>
    )
  }

  if (isError) {
    return (
      <Shell>
        <Centered>
          <div style={{ display: 'grid', gap: 12, justifyItems: 'start', maxWidth: 360 }}>
            <p>{t('gate.venueLoadFailed')}</p>
            <Button onClick={() => void refetch()}>{t('gate.retry')}</Button>
            {impersonation && (
              <Button variant="outline" onClick={exitImpersonation}>
                {t('admin.backAdmin')}
              </Button>
            )}
            <Button variant="outline" onClick={logout}>
              {t('nav.logout')}
            </Button>
          </div>
        </Centered>
      </Shell>
    )
  }

  if (!restaurant && !onAdmin) {
    return (
      <Navigate
        to={user?.isSuperAdmin ? '/dashboard/admin' : '/dashboard/setup'}
        replace
      />
    )
  }

  const context: DashboardOutlet = { restaurant }
  const venueOptions =
    restaurant && !restaurants.some((venue) => venue.id === restaurant.id)
      ? [restaurant, ...restaurants]
      : restaurants

  return (
    <Shell>
      <Sidebar>
        <Brand>
          <BrandMark size={32} />
          {t('common:appName')}
        </Brand>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <NavLink key={item.to} to={item.to} end={item.end}>
              {({ isActive }) => (
                <NavLinkItem $active={isActive}>
                  <Icon aria-hidden />
                  {t(item.key)}
                </NavLinkItem>
              )}
            </NavLink>
          )
        })}
        {user?.isSuperAdmin && (
          <NavLink to={ADMIN_NAV.to} end>
            {({ isActive }) => {
              const Icon = ADMIN_NAV.icon
              return (
                <NavLinkItem $active={isActive}>
                  <Icon aria-hidden />
                  {t('nav.admin')}
                </NavLinkItem>
              )
            }}
          </NavLink>
        )}
        <SidebarFoot>
          {restaurant && (
            <SidebarSwitch>
              <VenueSwitcher
                restaurants={venueOptions}
                current={restaurant}
                impersonating={Boolean(impersonation)}
                onSelect={switchVenue}
                dropUp
              />
            </SidebarSwitch>
          )}
          <AccountRow>
            <ClerkUserButton />
            {user && <UserName>{user.fullName}</UserName>}
          </AccountRow>
          <LogoutWrap>
            <Button variant="outline" size="sm" fullWidth onClick={logout}>
              {t('nav.logout')}
            </Button>
          </LogoutWrap>
        </SidebarFoot>
      </Sidebar>

      <Main data-scroll-root>
        {impersonation && (
          <ViewingBanner>
            <ViewingCopy>
              <strong>{t('admin.viewing', { name: impersonation.restaurantName })}</strong>
              <span>{t('admin.viewingHint')}</span>
            </ViewingCopy>
            <Button variant="outline" size="sm" onClick={exitImpersonation}>
              {t('admin.backAdmin')}
            </Button>
          </ViewingBanner>
        )}
        <Outlet context={context} />
      </Main>

      <BottomNav $count={user?.isSuperAdmin ? 5 : 4}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <NavLink key={item.to} to={item.to} end={item.end}>
              {({ isActive }) => (
                <BottomLink $active={isActive} aria-label={t(item.key)}>
                  <Icon aria-hidden />
                </BottomLink>
              )}
            </NavLink>
          )
        })}
        {user?.isSuperAdmin && (
          <NavLink to={ADMIN_NAV.to} end>
            {({ isActive }) => {
              const Icon = ADMIN_NAV.icon
              return (
                <BottomLink $active={isActive} aria-label={t(ADMIN_NAV.key)}>
                  <Icon aria-hidden />
                </BottomLink>
              )
            }}
          </NavLink>
        )}
      </BottomNav>
    </Shell>
  )
}
