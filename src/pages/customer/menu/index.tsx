import { SlidersHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { CartBar } from '@/components/customer/cart-bar'
import { CategoryTabs } from '@/components/customer/category-tabs'
import { FoodCard } from '@/components/customer/food-card'
import { FoodDetailsSheet } from '@/components/customer/food-details-sheet'
import { MenuFilterSheet } from '@/components/customer/menu-filter-sheet'
import { MenuFilters } from '@/components/customer/menu-filters'
import { OpenOrderBanner } from '@/components/customer/open-order-banner'
import { RestaurantHeader } from '@/components/customer/restaurant-header'
import { EmptyState } from '@/components/global/empty-state'
import { IconButton } from '@/components/global/icon-button'
import { SearchInput } from '@/components/global/search-input'
import { Skeleton } from '@/components/global/skeleton'
import { useCustomerContext } from '@/hooks/customer/context'

import { itemHasOptions, useMenuPage } from './helper'
import { FilterSlot, Grid, Page, SearchSlot, BannerSlot, SectionTitle, StickyChrome, Toolbar } from './styled'

export function MenuPage() {
  const { t } = useTranslation(['customer', 'common'])
  const { restaurant, slug, tableNumber } = useCustomerContext()
  const page = useMenuPage(slug, restaurant.id, tableNumber)

  const tabs = [
    { id: 'all', name: t('menu.all') },
    ...page.groups.map((g) => ({ id: g.id ?? 'other', name: g.name })),
  ]

  return (
    <Page>
      <RestaurantHeader name={restaurant.name} tableLabel={page.tableLabel} />

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

      <StickyChrome>
        {!page.search && (
          <CategoryTabs
            tabs={tabs}
            activeId={page.activeCategory}
            onSelect={page.setActiveCategory}
          />
        )}
        <MenuFilters diet={page.diet} onDiet={page.setDiet} />
      </StickyChrome>

      {page.menuQuery.isLoading && (
        <Grid>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} height="260px" />
          ))}
        </Grid>
      )}

      {page.menuQuery.isSuccess &&
        page.visibleGroups.every((g) => g.items.length === 0) && (
          <EmptyState
            emoji="🍽️"
            title={page.filtersOn || page.search ? t('menu.emptyFilters') : t('menu.empty')}
          />
        )}

      {page.visibleGroups.map((group) =>
        group.items.length === 0 ? null : (
          <section key={group.id ?? 'search'}>
            {!page.search && <SectionTitle>{group.name}</SectionTitle>}
            <Grid>
              {group.items.map((item) => (
                <FoodCard
                  key={item.id}
                  item={item}
                  currency={restaurant.currency}
                  quantity={page.quantityForItem(item.id)}
                  hasOptions={itemHasOptions(item)}
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

      <CartBar
        count={page.cartCount}
        total={page.cartSubtotal}
        currency={restaurant.currency}
        onClick={page.goToCart}
      />
    </Page>
  )
}
