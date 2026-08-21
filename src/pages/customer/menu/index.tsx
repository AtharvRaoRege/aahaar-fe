import { SlidersHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { CallWaiterButton } from '@/components/customer/call-waiter'
import { CartBar } from '@/components/customer/cart-bar'
import { CategoryTabs } from '@/components/customer/category-tabs'
import { FoodCard } from '@/components/customer/food-card'
import { FoodDetailsSheet } from '@/components/customer/food-details-sheet'
import { MenuFilterSheet } from '@/components/customer/menu-filter-sheet'
import { MenuFilters } from '@/components/customer/menu-filters'
import { OfferStrip } from '@/components/customer/offer-strip'
import { OpenOrderBanner } from '@/components/customer/open-order-banner'
import { RestaurantHeader } from '@/components/customer/restaurant-header'
import { VenueHero } from '@/components/customer/venue-hero'
import { EmptyState } from '@/components/global/empty-state'
import { IconButton } from '@/components/global/icon-button'
import { SearchInput } from '@/components/global/search-input'
import { Skeleton } from '@/components/global/skeleton'
import { useCustomerContext } from '@/hooks/customer/context'

import { itemHasOptions, useMenuPage } from './helper'
import {
  BannerSlot,
  EmptySlot,
  FilterSlot,
  Grid,
  Page,
  Rule,
  SearchSlot,
  SectionCount,
  SectionHead,
  SectionTitle,
  StickyStack,
  Toolbar,
  ViewOnlyBanner,
} from './styled'

export function MenuPage() {
  const { t } = useTranslation(['customer', 'common'])
  const { restaurant, slug, tableNumber, canOrder } = useCustomerContext()
  const page = useMenuPage(slug, restaurant.id, tableNumber, canOrder)

  const tabs = [
    { id: 'all', name: t('menu.all') },
    ...page.groups.map((g) => ({ id: g.id ?? 'other', name: g.name })),
  ]

  return (
    <Page>
      <VenueHero restaurant={restaurant} tableLabel={page.tableLabel} />

      <StickyStack>
        <RestaurantHeader
          name={restaurant.name}
          logoUrl={restaurant.logoUrl}
          tableLabel={page.tableLabel}
          action={
            canOrder && restaurant.waiterCallEnabled ? (
              <CallWaiterButton
                slug={slug}
                restaurantId={restaurant.id}
                tableNumber={tableNumber}
              />
            ) : undefined
          }
        />
        <Toolbar>
          <SearchSlot>
            <SearchInput
              value={page.search}
              onChange={page.setSearch}
              placeholder={t('common:actions.search')}
              voice
              voiceLabel={t('common:actions.voiceSearch')}
            />
          </SearchSlot>
          <FilterSlot>
            <IconButton
              type="button"
              label={t('menu.openFilters')}
              icon={<SlidersHorizontal aria-hidden />}
              tone={page.priceFiltersOn ? 'primary' : 'default'}
              onClick={page.openFilters}
            />
          </FilterSlot>
        </Toolbar>
        <CategoryTabs
          label={t('menu.categories')}
          tabs={page.search ? [] : tabs}
          activeId={page.activeCategory}
          onSelect={page.setActiveCategory}
          leading={<MenuFilters inline diet={page.diet} onDiet={page.setDiet} />}
        />
      </StickyStack>

      {!canOrder && (
        <BannerSlot>
          <ViewOnlyBanner>{t('menu.viewOnlyHint')}</ViewOnlyBanner>
        </BannerSlot>
      )}

      {page.openOrder && (
        <BannerSlot>
          <OpenOrderBanner
            orderNumber={page.openOrder.orderNumber}
            statusLabel={t(`common:status.${page.openOrder.status}`)}
            liveLabel={t('menu.liveOrder')}
            trackLabel={t('menu.trackOrder')}
            onOpen={page.goTrack}
          />
        </BannerSlot>
      )}

      <OfferStrip slug={slug} currency={restaurant.currency} onOfferView={page.trackOfferView} />

      {page.menuQuery.isLoading && (
        <>
          <SectionHead>
            <Skeleton height="20px" width="140px" />
          </SectionHead>
          <Grid>
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} height="132px" />
            ))}
          </Grid>
        </>
      )}

      {page.menuQuery.isSuccess &&
        page.visibleGroups.every((g) => g.items.length === 0) && (
          <EmptySlot>
            <EmptyState
              emoji="🍽️"
              title={page.filtersOn || page.search ? t('menu.emptyFilters') : t('menu.empty')}
            />
          </EmptySlot>
        )}

      {page.visibleGroups.map((group) =>
        group.items.length === 0 ? null : (
          <section key={group.id ?? 'search'}>
            <SectionHead>
              <SectionTitle>{page.search ? t('menu.results') : group.name}</SectionTitle>
              <Rule aria-hidden />
              <SectionCount>{group.items.length}</SectionCount>
            </SectionHead>
            <Grid>
              {group.items.map((item) => (
                <FoodCard
                  key={item.id}
                  item={item}
                  currency={restaurant.currency}
                  quantity={page.quantityForItem(item.id)}
                  hasOptions={itemHasOptions(item)}
                  readOnly={!canOrder}
                  onAdd={() => page.addQuick(item)}
                  onIncrement={() => page.incItem(item)}
                  onDecrement={() => page.decItem(item)}
                  onOpen={() => page.openDetails(item)}
                />
              ))}
            </Grid>
          </section>
        ),
      )}

      <FoodDetailsSheet
        item={page.selected}
        open={page.sheetOpen}
        currency={restaurant.currency}
        readOnly={!canOrder}
        onClose={page.closeSheet}
        onConfirm={page.confirmDetails}
      />

      <MenuFilterSheet
        open={page.filterSheetOpen}
        priceBand={page.priceBand}
        sort={page.sort}
        onPriceBand={page.setPriceBand}
        onSort={page.setSort}
        onClear={page.clearFilters}
        onClose={page.closeFilters}
      />

      {canOrder && (
        <CartBar
          count={page.cartCount}
          total={page.cartSubtotal}
          currency={restaurant.currency}
          onClick={page.goToCart}
        />
      )}
    </Page>
  )
}
