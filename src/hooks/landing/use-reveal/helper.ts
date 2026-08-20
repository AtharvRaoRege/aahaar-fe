import { useEffect, useRef, useState } from 'react'

import { prefersReducedMotion } from '@/utils/motion'

/** Nothing to animate: skip straight to the finished state. */
function startsShown(): boolean {
  return prefersReducedMotion() || typeof IntersectionObserver === 'undefined'
}

/**
 * Reveal an element the first time it scrolls into view.
 *
 * Built on IntersectionObserver rather than a scroll listener so the work stays
 * off the main thread — on a mid-range Android, a scroll handler that reads layout
 * is exactly what makes a story page feel sticky.
 *
 * Reveals are one-way. Re-hiding on the way back up reads as a bug when someone
 * scrolls up to re-read a line.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  /** Fraction of the element that must be visible. Lower it for tall blocks. */
  amount?: number
}) {
  const ref = useRef<T>(null)
  // Decided at init, not in an effect, so the reduced-motion path never paints a
  // hidden frame it then has to correct.
  const [shown, setShown] = useState(startsShown)

  useEffect(() => {
    if (shown) return
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: options?.amount ?? 0.15,
      },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [shown, options?.amount])

  return { ref, shown }
}

/**
 * True one frame after mount, so the opening screen animates in on load.
 *
 * The first paint needs the "before" state or there is nothing to transition
 * from, and a rAF is the cheapest way to guarantee that ordering.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(prefersReducedMotion)

  useEffect(() => {
    if (mounted) return
    const frame = window.requestAnimationFrame(() => setMounted(true))
    return () => window.cancelAnimationFrame(frame)
  }, [mounted])

  return mounted
}

/**
 * How far through the page the reader is, 0 to 1.
 *
 * Reads are batched into a rAF so a fast flick cannot queue one layout read per
 * scroll event.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - doc.clientHeight
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, doc.scrollTop / scrollable)) : 0)
    }
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(measure)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return progress
}
