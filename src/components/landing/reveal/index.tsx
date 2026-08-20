import type { ReactNode } from 'react'

import { useReveal } from '@/hooks/landing/use-reveal/helper'

import { Wrap } from './styled'

export interface RevealProps {
  children: ReactNode
  /** Stagger within a group, in milliseconds. Keep it under ~240. */
  delay?: number
  /** Lower this for tall blocks so they do not fire while still off screen. */
  amount?: number
}

/**
 * Fades and lifts its children the first time they scroll into view.
 *
 * A wrapper rather than a prop on every styled component: the observer belongs to
 * one small component, and chapters stay declarative.
 */
export function Reveal({ children, delay = 0, amount }: RevealProps) {
  const { ref, shown } = useReveal<HTMLDivElement>({ amount })

  return (
    <Wrap ref={ref} $in={shown} $delay={delay}>
      {children}
    </Wrap>
  )
}
