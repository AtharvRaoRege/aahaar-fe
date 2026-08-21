import styled from 'styled-components'

import { fontSizes, masks, palette, radii, shadows, spacing, transitions } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export const Bar = styled.div`
  padding: ${spacing.sm} ${spacing.lg} ${spacing.sm};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.sm} ${spacing.xl} ${spacing.sm};
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.md} ${spacing['2xl']} ${spacing.sm};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.md} ${spacing['2xl']} ${spacing.sm};
  }

  ${({ theme }) => theme.media.xl} {
    padding: ${spacing.md} ${spacing['3xl']} ${spacing.sm};
  }
`

export const Scroller = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${spacing.sm};
  overflow-x: auto;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  mask-image: ${masks.railFade};
  -webkit-mask-image: ${masks.railFade};
  padding-inline: 2px;

  &::-webkit-scrollbar {
    display: none;
  }

  ${({ theme }) => theme.media.sm} {
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.lg} {
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.xl} {
    gap: ${spacing.md};
  }
`

export const Tab = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  max-width: min(200px, 70vw);
  min-height: 36px;
  padding: 0 ${spacing.md};
  background: ${({ $active }) => ($active ? brandVar.primary : palette.white)};
  color: ${({ $active }) => ($active ? brandVar.onPrimary : palette.ink)};
  border: 1px solid ${({ $active }) => ($active ? brandVar.primary : palette.line)};
  border-radius: ${radii.full};
  box-shadow: ${({ $active }) => ($active ? shadows.sm : 'none')};
  font-weight: 700;
  font-size: ${fontSizes.labelSm};
  letter-spacing: 0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: transform ${transitions.fast}, background ${transitions.fast}, color ${transitions.fast};

  &:active {
    transform: scale(0.98);
  }

  ${({ theme }) => theme.media.sm} {
    min-height: 38px;
    padding: 0 ${spacing.md};
    font-size: ${fontSizes.label};
    max-width: min(220px, 55vw);
  }

  ${({ theme }) => theme.media.md} {
    min-height: 40px;
    padding: 0 ${spacing.lg};
    font-size: ${fontSizes.label};
    max-width: 240px;
  }

  ${({ theme }) => theme.media.lg} {
    min-height: 40px;
    padding: 0 ${spacing.lg};
    max-width: 260px;
  }

  ${({ theme }) => theme.media.xl} {
    min-height: 42px;
    padding: 0 ${spacing.lg};
    max-width: 280px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: background ${transitions.fast}, color ${transitions.fast};

    &:active {
      transform: none;
    }
  }
`

export const Group = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-shrink: 0;
  align-items: center;
  gap: ${spacing.sm};

  ${({ theme }) => theme.media.md} {
    gap: ${spacing.md};
  }
`

export const Divider = styled.span`
  flex-shrink: 0;
  width: 1px;
  align-self: stretch;
  margin-inline: ${spacing.xs};
  background: ${palette.line};
`
