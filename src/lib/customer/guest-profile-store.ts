export interface GuestProfile {
  name: string
  contactNumber: string | null
}

const key = (restaurantId: string) => `aahaar.guestProfile.${restaurantId}`

export const guestProfileStore = {
  get(restaurantId: string): GuestProfile | null {
    const raw = localStorage.getItem(key(restaurantId))
    if (!raw) return null
    try {
      const profile = JSON.parse(raw) as GuestProfile
      const name = profile.name?.trim()
      if (!name) return null
      return {
        name,
        contactNumber: profile.contactNumber?.trim() || null,
      }
    } catch {
      return null
    }
  },
  set(restaurantId: string, profile: GuestProfile) {
    const name = profile.name.trim()
    if (!name) return
    localStorage.setItem(
      key(restaurantId),
      JSON.stringify({
        name,
        contactNumber: profile.contactNumber?.trim() || null,
      }),
    )
  },
  clear(restaurantId: string) {
    localStorage.removeItem(key(restaurantId))
  },
}
