import { useTranslation } from 'react-i18next'

import { CartBar } from '@/components/customer/cart-bar'
import { CategoryTabs } from '@/components/customer/category-tabs'
import { FoodCard } from '@/components/customer/food-card'
import { FoodDetailsSheet } from '@/components/customer/food-details-sheet'
import { RestaurantHeader } from '@/components/customer/restaurant-header'
import { EmptyState } from '@/components/global/empty-state'
import { SearchInput } from '@/components/global/search-input'
import { Skeleton } from '@/components/global/skeleton'
import { useCustomerContext } from '@/hooks/customer/context'

import { itemHasOptions, useMenuPage } from './helper'
import { Grid, Page, SectionTitle, Toolbar } from './styled'

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
        <SearchInput
          value={page.search}
          onChange={page.setSearch}
          placeholder={t('common:actions.search')}
        />
      </Toolbar>

      {!page.search && (
        <CategoryTabs
          tabs={tabs}
          activeId={page.activeCategory}
          onSelect={page.setActiveCategory}
        />
      )}

      {page.menuQuery.isLoading && (
        <Grid>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} height="260px" />
          ))}
        </Grid>
      )}

      {page.menuQuery.isSuccess &&
        page.visibleGroups.every((g) => g.items.length === 0) && (
          <EmptyState emoji="🍽️" title={t('menu.empty')} />
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

      <CartBar
        count={page.cartCount}
        total={page.cartSubtotal}
        currency={restaurant.currency}
        onClick={page.goToCart}
      />
    </Page>
  )
}
