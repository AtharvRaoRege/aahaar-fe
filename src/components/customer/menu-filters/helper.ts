import type { MenuCategoryGroup, MenuItem } from '@/types/menu'

export type DietFilter = 'all' | 'veg' | 'nonveg'
export type PriceBand = 'all' | 'under' | 'mid' | 'over'
export type PriceSort = 'menu' | 'asc' | 'desc'

export const PRICE_UNDER = 150
export const PRICE_MID_MAX = 300

export function matchesDiet(item: MenuItem, diet: DietFilter): boolean {
  if (diet === 'all') return true
  if (diet === 'veg') return item.isVegetarian
  return !item.isVegetarian
}

export function matchesPrice(item: MenuItem, band: PriceBand): boolean {
  const price = item.basePrice
  if (band === 'all') return true
  if (band === 'under') return price < PRICE_UNDER
  if (band === 'mid') return price >= PRICE_UNDER && price <= PRICE_MID_MAX
  return price > PRICE_MID_MAX
}

export function sortMenuItems(items: MenuItem[], sort: PriceSort): MenuItem[] {
  if (sort === 'menu') return items
  return [...items].sort((left, right) =>
    sort === 'asc' ? left.basePrice - right.basePrice : right.basePrice - left.basePrice,
  )
}

export function filterMenuGroups(
  groups: MenuCategoryGroup[],
  diet: DietFilter,
  band: PriceBand,
  sort: PriceSort,
): MenuCategoryGroup[] {
  return groups.map((group) => ({
    ...group,
    items: sortMenuItems(
      group.items.filter((item) => matchesDiet(item, diet) && matchesPrice(item, band)),
      sort,
    ),
  }))
}
