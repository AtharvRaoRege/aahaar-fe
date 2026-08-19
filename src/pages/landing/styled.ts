import styled, { createGlobalStyle } from 'styled-components'

import { focusRing } from '@/styles/mixins'
import { fontSizes, fontWeights, palette, radii, spacing } from '@/styles/theme'

/**
 * Snap the document, not a nested box, and only while this page is mounted.
 *
 * A wrapper with its own `overflow-y: auto` would also snap, but it sits inside
 * `#root { min-height: 100dvh }`, so a `100svh` child leaves the document free to
 * scroll the difference — two scrollbars — and a nested scroller stops the mobile
 * browser toolbar from collapsing. styled-components removes this rule again on
 * unmount, so the dashboard and the guest menu never see it.
 *
 * `proximity`, not `mandatory`: chapters two and three grow taller than a phone
 * viewport once their cards stack, and mandatory snapping fights a reader who is
 * halfway down one.
 */
export const StoryScroll = createGlobalStyle`
  html {
    scroll-snap-type: y proximity;
  }
`

export const Page = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${palette.canvas};
`

export const TopBar = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.md};
  padding: ${spacing.md} ${spacing.xl};
  background: ${palette.creamFog};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid ${palette.line};

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.md} ${spacing['3xl']};
  }

  @media (prefers-reduced-transparency: reduce) {
    background: ${palette.cream};
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
`

export const Brand = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  min-width: 0;
  font-size: ${fontSizes.subheading};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.03em;
  color: ${palette.ink};

  img {
    flex-shrink: 0;
  }
`

export const SkipLink = styled.a`
  ${focusRing};
  flex-shrink: 0;
  padding: ${spacing.xs} ${spacing.md};
  border-radius: ${radii.full};
  font-size: ${fontSizes.labelSm};
  font-weight: ${fontWeights.bold};
  color: ${palette.inkSoft};
  white-space: nowrap;

  &:hover {
    color: ${palette.ink};
  }
`

export const BarActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  flex-shrink: 0;
`
