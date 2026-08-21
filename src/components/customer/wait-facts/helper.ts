import { useEffect, useState } from 'react'

import { WAIT_FACTS } from '@/constants/wait-facts'

/** How long each fact stays on screen — keep in sync with the timer bar animation. */
export const FACT_ROTATE_MS = 10_000

function pickFact(exclude?: string): string {
  if (WAIT_FACTS.length === 0) return ''
  if (WAIT_FACTS.length === 1) return WAIT_FACTS[0]
  let next = WAIT_FACTS[Math.floor(Math.random() * WAIT_FACTS.length)]
  let guard = 0
  while (next === exclude && guard < 8) {
    next = WAIT_FACTS[Math.floor(Math.random() * WAIT_FACTS.length)]
    guard += 1
  }
  return next
}

export function useRotatingWaitFact(enabled: boolean) {
  const [fact, setFact] = useState(pickFact)

  useEffect(() => {
    if (!enabled) return
    const timer = window.setInterval(() => {
      setFact((current) => pickFact(current))
    }, FACT_ROTATE_MS)
    return () => window.clearInterval(timer)
  }, [enabled])

  return fact
}
