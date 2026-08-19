/**
 * How long each kind of answer stays trustworthy.
 *
 * React Query only refetches data it considers stale, so these windows are what
 * decide whether moving between screens costs a request or costs nothing. They
 * are deliberately generous: anything that can change under us either arrives
 * over the live socket or is invalidated by the mutation that changed it, so a
 * timer is the last resort rather than the mechanism.
 */
export const freshFor = {
  /** Socket-backed lists — events do the real work, this only covers the gap. */
  live: 15_000,
  /** Changes only when someone on this device acts, and that invalidates it. */
  ownAction: 5 * 60_000,
  /** Menus, QR codes, venue profile: edited rarely, invalidated on save. */
  slow: 15 * 60_000,
  /** Plan catalogue and other near-constants. */
  catalogue: 60 * 60_000,
} as const

/** Keep answers around long enough that back-navigation is free. */
export const keepFor = {
  standard: 30 * 60_000,
  long: 2 * 60 * 60_000,
} as const

/**
 * Poll only while the live socket is down.
 *
 * With the socket up this returns `false`, which switches the timer off entirely
 * instead of merely slowing it.
 */
export function fallbackPoll(connected: boolean, everyMs: number): number | false {
  return connected ? false : everyMs
}
