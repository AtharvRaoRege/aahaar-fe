import type { CartLine } from '@/lib/cart/cart-context'

export function lineMeta(line: CartLine): string {
  const parts: string[] = []
  if (line.variantId) {
    const variant = line.item.variants.find((v) => v.id === line.variantId)
    if (variant) parts.push(variant.name)
  }
  for (const id of line.addonIds) {
    const addon = line.item.addons.find((a) => a.id === id)
    if (addon) parts.push(addon.name)
  }
  return parts.join(' · ')
}
