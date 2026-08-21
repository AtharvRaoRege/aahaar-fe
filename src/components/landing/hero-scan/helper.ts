import { useSyncExternalStore } from 'react'

export const APP_TOUR_GIF = '/landing/app-tour.gif'
export const APP_TOUR_POSTER = '/landing/app-poster.png'

function subscribeReducedMotion(onChange: () => void) {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return () => undefined
  }
  const media = window.matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

function reducedMotionSnapshot() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** Still poster when the OS asks for less motion; otherwise the live app GIF. */
export function useAppTourSrc(): string {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    reducedMotionSnapshot,
    () => false,
  )
  return reduceMotion ? APP_TOUR_POSTER : APP_TOUR_GIF
}
