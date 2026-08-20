import { useReveal } from '@/hooks/landing/use-reveal/helper'

/**
 * Observe one container, then stagger every child with index-based delay.
 *
 * Per-card observers fire together when a wrapped row is fully on screen — the
 * cards pop in as one block. One observer on the scroller matches the HTML page.
 */
export function useStaggerGroup<T extends HTMLElement = HTMLDivElement>(options?: {
  amount?: number
}) {
  return useReveal<T>(options)
}
