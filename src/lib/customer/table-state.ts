import { guestOrderStore } from '@/lib/customer/guest-order-store'
import { sessionStore } from '@/lib/customer/session-store'

const cartKey = (restaurantId: string) => `aahaar.cart.${restaurantId}`

/**
 * Wipe everything tied to one seating so the next scan starts clean.
 *
 * A table session otherwise survives until its 4-hour expiry, which meant the
 * next guest to scan that table inherited the previous guest's name, cart, and
 * finished order. Once a ticket is closed the seating is over — the identity
 * goes with it.
 *
 * The guest profile is kept on purpose: it is the returning diner's own name on
 * their own phone, and pre-filling it is a courtesy, not stale state.
 */
export function clearTableState(restaurantId: string): void {
  sessionStore.clear(restaurantId)
  guestOrderStore.clear(restaurantId)
  try {
    window.localStorage.removeItem(cartKey(restaurantId))
  } catch {
    // Blocked storage — nothing to clear.
  }
}
