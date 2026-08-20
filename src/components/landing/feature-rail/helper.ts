/** Stagger like the HTML page — one card every 100ms, capped so the last is not late. */
export function railDelay(index: number): number {
  return Math.min(index, 7) * 100
}
