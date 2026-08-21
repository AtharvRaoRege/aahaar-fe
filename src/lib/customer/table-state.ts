import { guestOrderStore } from '@/lib/customer/guest-order-store'
import { sessionStore } from '@/lib/customer/session-store'

const cartKey = (restaurantId: string) => `aahaar.cart.${restaurantId}`

/**
 * Wipe seating-tied cart and open-order pointers once a ticket is closed.
 *
 * The guest profile stays on this phone so "back to menu" can recreate the
 * named table session without asking for name and number again.
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
