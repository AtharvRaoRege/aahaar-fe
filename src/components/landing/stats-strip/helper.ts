import { useEffect, useState } from 'react'

import { useReveal } from '@/hooks/landing/use-reveal/helper'
import { prefersReducedMotion } from '@/utils/motion'

const FRAMES = 40

/**
 * Counts up to `target` once the tile is on screen.
 *
 * Each tile owns its own observer and its own count, so the four numbers roll in
 * as the strip arrives rather than all snapping together.
 */
export function useCountTile(target: number) {
  const { ref, shown } = useReveal<HTMLDivElement>({ amount: 0.4 })
  const [value, setValue] = useState(() => (prefersReducedMotion() ? target : 0))

  useEffect(() => {
    if (!shown || prefersReducedMotion()) return

    const step = Math.max(1, Math.ceil(target / FRAMES))
    let current = 0
    let frame = 0

    const tick = () => {
      current = Math.min(target, current + step)
      setValue(current)
      if (current < target) frame = window.requestAnimationFrame(tick)
    }
    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [shown, target])

  return { ref, shown, value }
}
