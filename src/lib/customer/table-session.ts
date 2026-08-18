import { publicApi } from '@/lib/api/public'
import { guestProfileStore } from '@/lib/customer/guest-profile-store'
import { sessionStore, type StoredCustomerSession } from '@/lib/customer/session-store'
import type { CustomerSession } from '@/types/customer'

const inflight = new Map<string, Promise<StoredCustomerSession>>()

function toStored(session: CustomerSession, named: boolean): StoredCustomerSession {
  return {
    id: session.id,
    name: session.name,
    contactNumber: session.contactNumber,
    tableNumber: session.tableNumber,
    expiresAt: session.expiresAt,
    named,
  }
}

export function hasNamedTableSession(restaurantId: string, table: string | null): boolean {
  if (!table) return false
  const stored = sessionStore.get(restaurantId)
  return Boolean(stored?.named && stored.tableNumber === table.trim())
}

export async function ensureTableSession(
  restaurantId: string,
  _slug: string,
  table: string,
): Promise<StoredCustomerSession> {
  const tableNumber = table.trim()
  const stored = sessionStore.get(restaurantId)
  if (stored?.tableNumber === tableNumber) return stored
  throw new Error('NO_SESSION')
}

export async function createNamedTableSession(
  restaurantId: string,
  slug: string,
  table: string,
  profile: { name: string; contactNumber?: string },
): Promise<StoredCustomerSession> {
  const tableNumber = table.trim()
  const name = profile.name.trim()
  const contactNumber = profile.contactNumber?.trim() || null
  const stored = sessionStore.get(restaurantId)
  if (stored?.named && stored.tableNumber === tableNumber) {
    guestProfileStore.set(restaurantId, { name: stored.name, contactNumber: stored.contactNumber ?? null })
    return stored
  }

  const key = `${restaurantId}:${tableNumber}`
  const pending = inflight.get(key)
  if (pending) return pending

  const request = publicApi
    .createSession({
      slug,
      restaurantId,
      name,
      contactNumber,
      guestCount: 1,
      tableNumber,
    })
    .then((session) => {
      const next = toStored(session, true)
      sessionStore.set(restaurantId, next)
      guestProfileStore.set(restaurantId, {
        name: next.name,
        contactNumber: next.contactNumber ?? contactNumber,
      })
      return next
    })
    .finally(() => {
      inflight.delete(key)
    })

  inflight.set(key, request)
  return request
}
