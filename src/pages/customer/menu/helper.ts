import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import {
  filterMenuGroups,
  type DietFilter,
  type PriceBand,
  type PriceSort,
} from '@/components/customer/menu-filters/helper'
import { useTrackMenuVisit } from '@/hooks/customer/use-analytics/helper'
import { useOpenOrder } from '@/hooks/customer/use-open-order/helper'
import { publicApi } from '@/lib/api/public'
import { useCart } from '@/lib/cart/cart-context'
import type { AddToCartInput } from '@/lib/cart/cart-context'
import { customerPath } from '@/lib/customer/paths'
import { sessionStore } from '@/lib/customer/session-store'
import { freshFor } from '@/lib/query/cache'
import { queryKeys } from '@/lib/query/keys'
import type { MenuCategoryGroup, MenuItem } from '@/types/menu'

const ALL = 'all'

export function itemHasOptions(item: MenuItem): boolean {
  return item.variants.length > 0 || item.addons.length > 0
}

export function useMenuPage(
  slug: string,
  restaurantId: string,
  tableNumber: string | null,
  canOrder: boolean,
) {
  const navigate = useNavigate()
  const cart = useCart()
  const session = sessionStore.get(restaurantId)
  const openOrder = useOpenOrder(restaurantId)
  const { track } = useTrackMenuVisit(slug, restaurantId)

  const menuQuery = useQuery({
    queryKey: queryKeys.publicMenu(slug),
    queryFn: () => publicApi.getMenu(slug),
    enabled: Boolean(slug),
    staleTime: freshFor.slow,
  })

  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>(ALL)
  const [diet, setDiet] = useState<DietFilter>('all')
  const [priceBand, setPriceBand] = useState<PriceBand>('all')
  const [sort, setSort] = useState<PriceSort>('menu')
  const [selected, setSelected] = useState<MenuItem | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)

  const groups = useMemo(
    () => menuQuery.data?.categories ?? [],
    [menuQuery.data?.categories],
  )

  const visibleGroups = useMemo<MenuCategoryGroup[]>(() => {
    const term = search.trim().toLowerCase()
    const scoped = term
      ? [
          {
            id: 'search',
            name: 'Results',
            sortOrder: 0,
            items: groups
              .flatMap((group) => group.items)
              .filter(
                (item) =>
                  item.name.toLowerCase().includes(term) ||
                  (item.description ?? '').toLowerCase().includes(term),
              ),
          },
        ]
      : activeCategory === ALL
        ? groups
        : groups.filter((group) => (group.id ?? 'other') === activeCategory)
    return filterMenuGroups(scoped, diet, priceBand, sort)
  }, [groups, search, activeCategory, diet, priceBand, sort])

  const openDetails = (item: MenuItem) => {
    setSelected(item)
    setSheetOpen(true)
    track('ITEM_VIEW', { targetId: item.id })
  }

  const table = tableNumber ?? session?.tableNumber ?? null

  return {
    menuQuery,
    groups,
    visibleGroups,
    canOrder,
    tableLabel: canOrder && table ? `Table ${table}` : null,
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
    diet,
    setDiet,
    priceBand,
    setPriceBand,
    sort,
    setSort,
    filtersOn: diet !== 'all' || priceBand !== 'all' || sort !== 'menu',
    priceFiltersOn: priceBand !== 'all' || sort !== 'menu',
    selected,
    sheetOpen,
    filterSheetOpen,
    openDetails,
    closeSheet: () => setSheetOpen(false),
    addQuick: (item: MenuItem) => {
      if (!canOrder) return
      cart.addItem(item)
    },
    incItem: (item: MenuItem) => {
      if (!canOrder) return
      cart.addItem(item)
    },
    decItem: (item: MenuItem) => {
      if (!canOrder) return
      cart.decrementItem(item.id)
    },
    confirmDetails: (item: MenuItem, input: AddToCartInput) => {
      if (!canOrder) return
      cart.addItem(item, input)
    },
    quantityForItem: (itemId: string) => (canOrder ? cart.quantityForItem(itemId) : 0),
    cartCount: canOrder ? cart.count : 0,
    cartSubtotal: canOrder ? cart.subtotal : 0,
    goToCart: () => {
      if (!canOrder) return
      navigate(customerPath(slug, '/cart', table))
    },
    openFilters: () => setFilterSheetOpen(true),
    closeFilters: () => setFilterSheetOpen(false),
    clearFilters: () => {
      setPriceBand('all')
      setSort('menu')
    },
    trackOfferView: (offerId: string) => track('OFFER_VIEW', { targetId: offerId }),
    openOrder: canOrder ? openOrder.order : null,
    goTrack: () => {
      if (!canOrder || !openOrder.order) return
      navigate(customerPath(slug, `/track/${openOrder.order.id}`, table))
    },
  }
}
