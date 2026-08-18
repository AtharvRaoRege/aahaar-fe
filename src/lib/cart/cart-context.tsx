/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { ReactNode } from 'react'

import type { CreateOrderItemPayload } from '@/types/order'
import type { MenuItem } from '@/types/menu'

export interface CartLine {
  lineId: string
  item: MenuItem
  quantity: number
  variantId: string | null
  addonIds: string[]
  notes: string | null
  unitPrice: number
}

export interface AddToCartInput {
  variantId?: string | null
  addonIds?: string[]
  notes?: string | null
  quantity?: number
}

interface CartContextValue {
  lines: CartLine[]
  count: number
  subtotal: number
  orderNotes: string
  setOrderNotes: (notes: string) => void
  addItem: (item: MenuItem, input?: AddToCartInput) => void
  increment: (lineId: string) => void
  decrement: (lineId: string) => void
  decrementItem: (itemId: string) => void
  removeLine: (lineId: string) => void
  quantityForItem: (itemId: string) => number
  setLineNotes: (lineId: string, notes: string) => void
  clear: () => void
  toOrderItems: () => CreateOrderItemPayload[]
}

const CartContext = createContext<CartContextValue | null>(null)

function computeUnitPrice(
  item: MenuItem,
  variantId: string | null,
  addonIds: string[],
): number {
  let price = item.basePrice
  if (variantId) {
    const variant = item.variants.find((v) => v.id === variantId)
    if (variant) price += variant.priceDelta
  }
  for (const id of addonIds) {
    const addon = item.addons.find((a) => a.id === id)
    if (addon) price += addon.price
  }
  return price
}

function buildLineId(
  itemId: string,
  variantId: string | null,
  addonIds: string[],
  notes: string | null,
): string {
  return [itemId, variantId ?? '', [...addonIds].sort().join(','), notes ?? ''].join('::')
}

function loadLines(storageKey: string | null): CartLine[] {
  if (!storageKey) return []
  try {
    const raw = localStorage.getItem(storageKey)
    return raw ? (JSON.parse(raw) as CartLine[]) : []
  } catch {
    return []
  }
}

export function CartProvider({
  restaurantId,
  children,
}: {
  restaurantId: string | undefined
  children: ReactNode
}) {
  const storageKey = restaurantId ? `aahaar.cart.${restaurantId}` : null
  const [lines, setLines] = useState<CartLine[]>(() => loadLines(storageKey))
  const [orderNotes, setOrderNotes] = useState('')

  useEffect(() => {
    if (!storageKey) return
    localStorage.setItem(storageKey, JSON.stringify(lines))
  }, [storageKey, lines])

  const addItem = useCallback((item: MenuItem, input: AddToCartInput = {}) => {
    const variantId = input.variantId ?? null
    const addonIds = input.addonIds ?? []
    const notes = input.notes ?? null
    const quantity = input.quantity ?? 1
    const lineId = buildLineId(item.id, variantId, addonIds, notes)
    setLines((prev) => {
      const existing = prev.find((l) => l.lineId === lineId)
      if (existing) {
        return prev.map((l) =>
          l.lineId === lineId ? { ...l, quantity: l.quantity + quantity } : l,
        )
      }
      return [
        ...prev,
        {
          lineId,
          item,
          quantity,
          variantId,
          addonIds,
          notes,
          unitPrice: computeUnitPrice(item, variantId, addonIds),
        },
      ]
    })
  }, [])

  const increment = useCallback((lineId: string) => {
    setLines((prev) =>
      prev.map((l) => (l.lineId === lineId ? { ...l, quantity: l.quantity + 1 } : l)),
    )
  }, [])

  const decrement = useCallback((lineId: string) => {
    setLines((prev) =>
      prev
        .map((l) => (l.lineId === lineId ? { ...l, quantity: l.quantity - 1 } : l))
        .filter((l) => l.quantity > 0),
    )
  }, [])

  // Decrement the "quick add" line for an item (no variant/addons/notes).
  const decrementItem = useCallback((itemId: string) => {
    const lineId = buildLineId(itemId, null, [], null)
    setLines((prev) =>
      prev
        .map((l) => (l.lineId === lineId ? { ...l, quantity: l.quantity - 1 } : l))
        .filter((l) => l.quantity > 0),
    )
  }, [])

  const removeLine = useCallback((lineId: string) => {
    setLines((prev) => prev.filter((l) => l.lineId !== lineId))
  }, [])

  const setLineNotes = useCallback((lineId: string, notes: string) => {
    setLines((prev) =>
      prev.map((line) => (line.lineId === lineId ? { ...line, notes: notes || null } : line)),
    )
  }, [])

  const clear = useCallback(() => {
    setLines([])
    setOrderNotes('')
  }, [])

  const quantityForItem = useCallback(
    (itemId: string) =>
      lines
        .filter((l) => l.item.id === itemId)
        .reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  )

  const toOrderItems = useCallback(
    (): CreateOrderItemPayload[] =>
      lines.map((l) => ({
        menuItemId: l.item.id,
        quantity: l.quantity,
        variantId: l.variantId,
        addonIds: l.addonIds,
        notes: l.notes?.trim() || null,
      })),
    [lines],
  )

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, l) => sum + l.quantity, 0)
    const subtotal = lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0)
    return {
      lines,
      count,
      subtotal,
      orderNotes,
      setOrderNotes,
      addItem,
      increment,
      decrement,
      decrementItem,
      removeLine,
      quantityForItem,
      setLineNotes,
      clear,
      toOrderItems,
    }
  }, [
    lines,
    orderNotes,
    addItem,
    increment,
    decrement,
    decrementItem,
    removeLine,
    quantityForItem,
    setLineNotes,
    clear,
    toOrderItems,
  ])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
