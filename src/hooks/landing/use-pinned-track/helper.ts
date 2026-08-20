import { useEffect, useRef, useState } from 'react'

import { prefersReducedMotion } from '@/utils/motion'

/**
 * Drive a horizontal track from the vertical scroll of a pinned section.
 *
 * Travel is `track width − viewport width`. Measuring against the track's own
 * clientWidth is always ~0 for an inline-flex that grows with its content, so
 * the sentence never moves. Sticky also needs an ancestor without
 * `overflow: hidden` — the page uses `overflow-x: clip` for that reason.
 */
export function usePinnedTrack() {
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const section = sectionRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!section || !viewport || !track) return

    let frame = 0
    let travel = 0

    const measure = () => {
      travel = Math.max(0, track.scrollWidth - viewport.clientWidth)
    }

    const update = () => {
      frame = 0
      const range = section.offsetHeight - window.innerHeight
      if (range <= 0 || travel <= 0) {
        setOffset(0)
        setProgress(0)
        return
      }
      const scrolled = -section.getBoundingClientRect().top
      const nextProgress = Math.min(1, Math.max(0, scrolled / range))
      setProgress(nextProgress)
      setOffset(-travel * nextProgress)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    const onResize = () => {
      measure()
      onScroll()
    }

    measure()
    update()

    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(track)
    resizeObserver.observe(viewport)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return { sectionRef, viewportRef, trackRef, offset, progress }
}
