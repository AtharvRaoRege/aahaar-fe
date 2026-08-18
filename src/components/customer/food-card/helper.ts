import type { MenuItem } from '@/types/menu'

export function hasDishImage(item: MenuItem): boolean {
  return Boolean(item.imageUrl)
}

export function isBestseller(item: MenuItem): boolean {
  return Boolean(item.isBestseller)
}

export function isCustomizable(item: MenuItem): boolean {
  return item.variants.length > 0 || item.addons.length > 0
}
