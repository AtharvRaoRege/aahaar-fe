import { useMemo, useState } from 'react'

import type { AddToCartInput } from '@/lib/cart/cart-context'
import type { MenuItem } from '@/types/menu'

export function useFoodDetails(item: MenuItem | null) {
  const defaultVariant =
    item?.variants.find((v) => v.isDefault)?.id ?? item?.variants[0]?.id ?? null

  const [snapshotId, setSnapshotId] = useState(item?.id)
  const [variantId, setVariantId] = useState<string | null>(defaultVariant)
  const [addonIds, setAddonIds] = useState<string[]>([])
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState('')

  if (item?.id !== snapshotId) {
    setSnapshotId(item?.id)
    setVariantId(defaultVariant)
    setAddonIds([])
    setQuantity(1)
    setNotes('')
  }

  const toggleAddon = (id: string) =>
    setAddonIds((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    )

  const unitPrice = useMemo(() => {
    if (!item) return 0
    let price = item.basePrice
    const variant = item.variants.find((v) => v.id === variantId)
    if (variant) price += variant.priceDelta
    for (const id of addonIds) {
      const addon = item.addons.find((a) => a.id === id)
      if (addon) price += addon.price
    }
    return price
  }, [item, variantId, addonIds])

  const buildInput = (): AddToCartInput => ({
    variantId,
    addonIds,
    notes: notes.trim() || null,
    quantity,
  })

  return {
    variantId,
    setVariantId,
    addonIds,
    toggleAddon,
    quantity,
    increment: () => setQuantity((q) => q + 1),
    decrement: () => setQuantity((q) => Math.max(1, q - 1)),
    notes,
    setNotes,
    unitPrice,
    total: unitPrice * quantity,
    buildInput,
  }
}
