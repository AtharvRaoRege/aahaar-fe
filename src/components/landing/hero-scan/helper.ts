import { useEffect, useState } from 'react'

import { prefersReducedMotion } from '@/utils/motion'

/** Six-by-six grid of blocks, so the QR is markup rather than an image. */
export const QR_CELLS = Array.from({ length: 36 }, (_, index) => index)

const SCAN_MS = 1_600
const LOOP_MS = 5_200

/**
 * Runs the scan-then-menu loop in the hero phone.
 *
 * Reduced motion settles on the finished state — the menu on screen — rather than
 * looping a beam forever, because the point of the shot is the outcome.
 */
export function useScanLoop(): boolean {
  const [done, setDone] = useState(prefersReducedMotion)

  useEffect(() => {
    if (prefersReducedMotion()) return

    let scanTimer = window.setTimeout(() => setDone(true), SCAN_MS)
    const loop = window.setInterval(() => {
      setDone(false)
      scanTimer = window.setTimeout(() => setDone(true), SCAN_MS)
    }, LOOP_MS)

    return () => {
      window.clearTimeout(scanTimer)
      window.clearInterval(loop)
    }
  }, [])

  return done
}
