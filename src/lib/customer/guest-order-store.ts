const key = (restaurantId: string) => `aahaar.guestOrder.${restaurantId}`

export const guestOrderStore = {
  get(restaurantId: string): string | null {
    return localStorage.getItem(key(restaurantId))
  },
  set(restaurantId: string, orderId: string) {
    localStorage.setItem(key(restaurantId), orderId)
  },
  clear(restaurantId: string) {
    localStorage.removeItem(key(restaurantId))
  },
}
