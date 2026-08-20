import { useTranslation } from 'react-i18next'
import { Navigate, Outlet } from 'react-router-dom'

import { GuestOrderWatch } from '@/components/customer/guest-order-watch'
import { GuestWelcome } from '@/components/customer/guest-welcome'
import { EmptyState } from '@/components/global/empty-state'
import { Skeleton } from '@/components/global/skeleton'
import { CartProvider } from '@/lib/cart/cart-context'
import { customerPath } from '@/lib/customer/paths'
import type { CustomerOutlet } from '@/hooks/customer/context'

import { useCustomerLayout } from './helper'
import { Centered, LoadingGrid, Shell } from './styled'

export function CustomerLayout() {
  const { t } = useTranslation(['customer', 'common'])
  const {
    slug,
    query,
    tableNumber,
    canOrder,
    onIndex,
    needsTableInUrl,
    needsIdentity,
    markIdentified,
    restPath,
  } = useCustomerLayout()

  if (query.isLoading) {
    return (
      <Shell>
        <Centered>
          <LoadingGrid>
            <Skeleton height="120px" />
            <Skeleton height="24px" width="60%" />
            <Skeleton height="220px" />
          </LoadingGrid>
        </Centered>
      </Shell>
    )
  }

  if (query.isError || !query.data) {
    return (
      <Shell>
        <Centered>
          <EmptyState emoji="🔍" title={t('common:states.error')} hint={t('common:states.notFound')} />
        </Centered>
      </Shell>
    )
  }

  if (!query.data.isServing) {
    return (
      <Shell>
        <Centered>
          <EmptyState
            emoji="🕒"
            title={t('unavailable.title')}
            hint={
              query.data.unavailableReason === 'NOT_PUBLISHED'
                ? t('unavailable.notPublished')
                : t('unavailable.suspended')
            }
          />
        </Centered>
      </Shell>
    )
  }

  if (needsTableInUrl && tableNumber) {
    return <Navigate to={customerPath(slug, restPath === '/' ? '/menu' : restPath, tableNumber)} replace />
  }

  if (needsIdentity && tableNumber) {
    return (
      <Shell>
        <GuestWelcome
          restaurant={query.data}
          tableNumber={tableNumber}
          onReady={markIdentified}
        />
      </Shell>
    )
  }

  if (canOrder && tableNumber && onIndex) {
    return <Navigate to={customerPath(slug, '/menu', tableNumber)} replace />
  }

  if (!canOrder && restPath.startsWith('/cart')) {
    return <Navigate to={customerPath(slug, '/menu', null)} replace />
  }

  const context: CustomerOutlet = {
    restaurant: query.data,
    slug,
    tableNumber,
    canOrder,
  }

  return (
    <Shell>
      <CartProvider key={`${query.data.id}:${tableNumber ?? 'none'}`} restaurantId={query.data.id}>
        {canOrder && (
          <GuestOrderWatch
            restaurantId={query.data.id}
            slug={slug}
            tableNumber={tableNumber}
          />
        )}
        <Outlet context={context} />
      </CartProvider>
    </Shell>
  )
}
