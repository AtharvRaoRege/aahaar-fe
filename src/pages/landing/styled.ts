import styled, { createGlobalStyle } from 'styled-components'

import { focusRing } from '@/styles/mixins'
import { fontSizes, fontWeights, palette, radii, spacing, transitions } from '@/styles/theme'

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
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.md};
  background: ${palette.creamFog};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid ${palette.line};

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.md};
    padding: ${spacing.sm} ${spacing.xl};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.md} ${spacing['3xl']};
  }

  @media (prefers-reduced-transparency: reduce) {
    background: ${palette.cream};
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
`

/** Reading position. One composited transform, no layout per frame. */
export const Progress = styled.span<{ $value: number }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  transform: scaleX(${({ $value }) => $value});
  transform-origin: left center;
  background: ${palette.tomato};
  transition: transform ${transitions.fast};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const Brand = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  min-width: 0;
  font-size: ${fontSizes.body};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.03em;
  color: ${palette.ink};

  img {
    flex-shrink: 0;
  }

  span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ${({ theme }) => theme.media.sm} {
    font-size: ${fontSizes.subheading};
  }
`

/**
 * Below the small breakpoint there is no room for a courtesy link beside the brand
 * and the call to action — at 320px the three together overflow the bar.
 */
export const SkipLink = styled.a`
  ${focusRing};
  display: none;
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

  ${({ theme }) => theme.media.sm} {
    display: inline-flex;
  }
`

export const BarActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  flex-shrink: 0;
  min-width: 0;
`

/** Long label on a laptop, short one on a phone. Same button, no reflow. */
export const LabelLong = styled.span`
  display: none;

  ${({ theme }) => theme.media.sm} {
    display: inline;
  }
`

export const LabelShort = styled.span`
  display: inline;

  ${({ theme }) => theme.media.sm} {
    display: none;
  }
`
