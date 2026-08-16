import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { publicApi } from '@/lib/api/public'
import { useCart } from '@/lib/cart/cart-context'
import type { AddToCartInput } from '@/lib/cart/cart-context'
import { customerPath } from '@/lib/customer/paths'
import { sessionStore } from '@/lib/customer/session-store'
import { queryKeys } from '@/lib/query/keys'
import type { MenuCategoryGroup, MenuItem } from '@/types/menu'

const ALL = 'all'

export function itemHasOptions(item: MenuItem): boolean {
  return item.variants.length > 0 || item.addons.length > 0
}

export function useMenuPage(slug: string, restaurantId: string, tableNumber: string | null) {
  const navigate = useNavigate()
  const cart = useCart()
  const session = sessionStore.get(restaurantId)

  const menuQuery = useQuery({
    queryKey: queryKeys.publicMenu(slug),
    queryFn: () => publicApi.getMenu(slug),
    enabled: Boolean(slug),
  })

  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>(ALL)
  const [selected, setSelected] = useState<MenuItem | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const groups = useMemo(
    () => menuQuery.data?.categories ?? [],
    [menuQuery.data?.categories],
  )

  const visibleGroups = useMemo<MenuCategoryGroup[]>(() => {
    const term = search.trim().toLowerCase()
    if (term) {
      const matched = groups
        .flatMap((g) => g.items)
        .filter(
          (item) =>
            item.name.toLowerCase().includes(term) ||
            (item.description ?? '').toLowerCase().includes(term),
        )
      return [{ id: 'search', name: 'Results', sortOrder: 0, items: matched }]
    }
    if (activeCategory === ALL) return groups
    return groups.filter((g) => (g.id ?? 'other') === activeCategory)
  }, [groups, search, activeCategory])

  const openDetails = (item: MenuItem) => {
    setSelected(item)
    setSheetOpen(true)
  }

  const table = tableNumber ?? session?.tableNumber ?? null

  return {
    menuQuery,
    groups,
    visibleGroups,
    tableLabel: table ? `Table ${table}` : null,
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
    selected,
    sheetOpen,
    openDetails,
    closeSheet: () => setSheetOpen(false),
    addQuick: (item: MenuItem) => cart.addItem(item),
    incItem: (item: MenuItem) => cart.addItem(item),
    decItem: (item: MenuItem) => cart.decrementItem(item.id),
    confirmDetails: (item: MenuItem, input: AddToCartInput) => cart.addItem(item, input),
    quantityForItem: cart.quantityForItem,
    cartCount: cart.count,
    cartSubtotal: cart.subtotal,
    goToCart: () => navigate(customerPath(slug, '/cart', table)),
  }
}
