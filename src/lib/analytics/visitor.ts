/**
 * Stable per-browser id used only to count unique and repeat visitors.
 *
 * Deliberately anonymous: a random opaque token in localStorage, never a phone
 * number, email, or device fingerprint (PRD §34 data minimisation).
 */
const STORAGE_KEY = 'aahaar:visitor-key'

function randomKey(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID().replace(/-/g, '')
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function getVisitorKey(): string | null {
  try {
    const existing = window.localStorage.getItem(STORAGE_KEY)
    if (existing) return existing
    const created = randomKey()
    window.localStorage.setItem(STORAGE_KEY, created)
    return created
  } catch {
    // Private browsing or blocked storage — counting is best-effort.
    return null
  }
}
