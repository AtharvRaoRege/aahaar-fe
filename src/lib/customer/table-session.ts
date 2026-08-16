import { publicApi } from '@/lib/api/public'
import { sessionStore, type StoredCustomerSession } from '@/lib/customer/session-store'

const inflight = new Map<string, Promise<StoredCustomerSession>>()

function toStored(session: {
  id: string
  name: string
  tableNumber: string | null
  expiresAt?: string
}): StoredCustomerSession {
  return {
    id: session.id,
    name: session.name,
    tableNumber: session.tableNumber,
    expiresAt: session.expiresAt,
  }
}

export async function ensureTableSession(
  restaurantId: string,
  slug: string,
  table: string,
): Promise<StoredCustomerSession> {
  const tableNumber = table.trim()
  const stored = sessionStore.get(restaurantId)
  if (stored?.tableNumber === tableNumber) return stored

  const key = `${restaurantId}:${tableNumber}`
  const pending = inflight.get(key)
  if (pending) return pending

  const request = publicApi
    .createSession({
      slug,
      restaurantId,
      guestCount: 1,
      tableNumber,
    })
    .then((session) => {
      const next = toStored(session)
      sessionStore.set(restaurantId, next)
      return next
    })
    .finally(() => {
      inflight.delete(key)
    })

  inflight.set(key, request)
  return request
}
