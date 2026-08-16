import { useTranslation } from 'react-i18next'
import { Navigate, Outlet } from 'react-router-dom'

import { EmptyState } from '@/components/global/empty-state'
import { Skeleton } from '@/components/global/skeleton'
import { CartProvider } from '@/lib/cart/cart-context'
import { customerPath } from '@/lib/customer/paths'
import type { CustomerOutlet } from '@/hooks/customer/context'

import { useCustomerLayout } from './helper'
import { Centered, LoadingGrid, Shell } from './styled'

export function CustomerLayout() {
  const { t } = useTranslation(['customer', 'common'])
  const { slug, query, tableNumber, onTrack, onIndex, needsTableInUrl, restPath, sessionQuery } =
    useCustomerLayout()

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

  if (needsTableInUrl && tableNumber) {
    return <Navigate to={customerPath(slug, restPath === '/' ? '/menu' : restPath, tableNumber)} replace />
  }

  if (!tableNumber && !onTrack) {
    return (
      <Shell>
        <Centered>
          <EmptyState
            emoji="📱"
            title={t('welcome.scanTitle')}
            hint={t('welcome.scanHint')}
          />
        </Centered>
      </Shell>
    )
  }

  if (tableNumber && sessionQuery.isLoading) {
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

  if (tableNumber && sessionQuery.isError) {
    return (
      <Shell>
        <Centered>
          <EmptyState
            emoji="📱"
            title={t('welcome.scanTitle')}
            hint={t('welcome.scanFailed')}
          />
        </Centered>
      </Shell>
    )
  }

  if (tableNumber && onIndex) {
    return <Navigate to={customerPath(slug, '/menu', tableNumber)} replace />
  }

  const context: CustomerOutlet = {
    restaurant: query.data,
    slug,
    tableNumber,
  }

  return (
    <Shell>
      <CartProvider key={`${query.data.id}:${tableNumber ?? 'none'}`} restaurantId={query.data.id}>
        <Outlet context={context} />
      </CartProvider>
    </Shell>
  )
}

