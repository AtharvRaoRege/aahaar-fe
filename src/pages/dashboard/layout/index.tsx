import { NavLink, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ClerkUserButton } from '@/components/dashboard/clerk-user-button'
import { KitchenAlert } from '@/components/dashboard/kitchen-alert'
import { LogoutButton } from '@/components/dashboard/logout-confirm'
import { VenueSwitcher } from '@/components/dashboard/venue-switcher'
import { BrandMark } from '@/components/global/brand-mark'
import { Button } from '@/components/global/button'
import type { DashboardOutlet } from '@/hooks/dashboard/context'

import { ADMIN_NAV, formatNavBadge, MOBILE_NAV_KEYS, NAV_ITEMS, useDashboardLayout } from './helper'
import {
  AccountRow,
  BottomLink,
  BottomNav,
  Brand,
  ErrorBanner,
  IconBadge,
  IconSlot,
  LogoutWrap,
  Main,
  MobileBar,
  MobileBrand,
  MobileVenue,
  NavBadge,
  NavLabel,
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
    venueLoading,
    venueError,
    refetch,
    exitImpersonation,
    restaurants,
    pendingOrderCount,
    switchVenue,
  } = useDashboardLayout()

  const context: DashboardOutlet = {
    restaurant,
    venueLoading,
    venueError,
    refetchVenue: () => {
      void refetch()
    },
  }
  const mobileNav = NAV_ITEMS.filter((item) => MOBILE_NAV_KEYS.has(item.key))
  const venueOptions =
    restaurant && !restaurants.some((venue) => venue.id === restaurant.id)
      ? [restaurant, ...restaurants]
      : restaurants
  const pendingBadge = formatNavBadge(pendingOrderCount)

  return (
    <Shell>
      <Sidebar>
        <Brand>
          <BrandMark size={32} />
          {t('common:appName')}
        </Brand>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const showBadge = item.badge === 'pendingOrders' && pendingBadge
          return (
            <NavLink key={item.to} to={item.to} end={item.end}>
              {({ isActive }) => (
                <NavLinkItem $active={isActive}>
                  <Icon aria-hidden />
                  <NavLabel>{t(item.key)}</NavLabel>
                  {showBadge && (
                    <NavBadge $onAccent={isActive} aria-label={t('nav.pendingOrders', { count: pendingOrderCount })}>
                      {pendingBadge}
                    </NavBadge>
                  )}
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
                  <NavLabel>{t('nav.admin')}</NavLabel>
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
            <LogoutButton size="sm" fullWidth />
          </LogoutWrap>
        </SidebarFoot>
      </Sidebar>

      <KitchenAlert restaurantId={restaurant?.id} />
      <Main data-scroll-root>
        <MobileBar>
          <MobileBrand>
            <BrandMark size={22} />
            {t('common:appName')}
          </MobileBrand>
          {restaurant && <MobileVenue>{restaurant.name}</MobileVenue>}
        </MobileBar>
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
        {venueError && (
          <ErrorBanner>
            <span>{t('gate.venueLoadFailed')}</span>
            <Button variant="outline" size="sm" onClick={() => void refetch()}>
              {t('gate.retry')}
            </Button>
          </ErrorBanner>
        )}
        <Outlet context={context} />
      </Main>

      <BottomNav $count={mobileNav.length + (user?.isSuperAdmin ? 1 : 0)}>
        {mobileNav.map((item) => {
          const Icon = item.icon
          const showBadge = item.badge === 'pendingOrders' && pendingBadge
          return (
            <NavLink key={item.to} to={item.to} end={item.end}>
              {({ isActive }) => (
                <BottomLink
                  $active={isActive}
                  aria-label={
                    showBadge
                      ? `${t(item.key)}, ${t('nav.pendingOrders', { count: pendingOrderCount })}`
                      : t(item.key)
                  }
                >
                  <IconSlot>
                    <Icon aria-hidden />
                    {showBadge && <IconBadge aria-hidden>{pendingBadge}</IconBadge>}
                  </IconSlot>
                  {t(item.key)}
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
                  <IconSlot>
                    <Icon aria-hidden />
                  </IconSlot>
                  {t(ADMIN_NAV.key)}
                </BottomLink>
              )
            }}
          </NavLink>
        )}
      </BottomNav>
    </Shell>
  )
}
