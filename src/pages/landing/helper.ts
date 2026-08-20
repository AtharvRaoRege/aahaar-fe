import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/lib/auth/use-auth'
import { prefersReducedMotion } from '@/utils/motion'

export const DEMO_SLUG = 'spice-garden'

/** Anchor ids, so the chapters can link to one another and to the skip link. */
export const CHAPTERS = {
  hook: 'chapter-hook',
  friction: 'chapter-friction',
  engine: 'chapter-engine',
  finale: 'chapter-finale',
} as const

export function useStoryPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [table, setTable] = useState('1')

  const scrollToChapter = useCallback((id: string) => {
    const target = document.getElementById(id)
    if (!target) return
    // Smoothness is a preference, not a default: honour the OS setting rather than
    // animating a whole viewport for someone who asked us not to.
    target.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [])

  return {
    isAuthenticated,
    chapters: CHAPTERS,
    table,
    setTable,
    enterStory: () => scrollToChapter(CHAPTERS.friction),
    // A blank or zero table still opens a real table, so the demo never dead-ends.
    openTable: () => {
      const wanted = table.trim() || '1'
      navigate(`/r/${DEMO_SLUG}/menu?table=${encodeURIComponent(wanted)}`)
    },
    goDemo: () => navigate(`/r/${DEMO_SLUG}/menu?table=1`),
    goLogin: () => navigate('/dashboard/login'),
    goRegister: () => navigate('/dashboard/login?mode=register'),
    // Straight to /dashboard: StaffGate already decides whether that means the
    // order screen, the setup wizard, or the waitlist.
    goKitchen: () => navigate('/dashboard'),
  }
}
