export interface StoredCustomerSession {
  id: string
  name: string
  contactNumber?: string | null
  tableNumber: string | null
  expiresAt?: string
  named?: boolean
}

const key = (restaurantId: string) => `aahaar.session.${restaurantId}`

function isExpired(session: StoredCustomerSession) {
  if (!session.expiresAt) return false
  const expires = Date.parse(session.expiresAt)
  return Number.isFinite(expires) && expires <= Date.now()
}

export const sessionStore = {
  get(restaurantId: string): StoredCustomerSession | null {
    const raw = localStorage.getItem(key(restaurantId))
    if (!raw) return null
    try {
      const session = JSON.parse(raw) as StoredCustomerSession
      if (isExpired(session)) {
        localStorage.removeItem(key(restaurantId))
        return null
      }
      return session
    } catch {
      return null
    }
  },
  set(restaurantId: string, session: StoredCustomerSession) {
    localStorage.setItem(key(restaurantId), JSON.stringify(session))
  },
  clear(restaurantId: string) {
    localStorage.removeItem(key(restaurantId))
  },
}
