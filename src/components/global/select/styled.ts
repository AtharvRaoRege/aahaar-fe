import styled from 'styled-components'

import { focusRing } from '@/styles/mixins'
import { fontSizes, palette, radii, shadows, spacing } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

export const Wrap = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;
`

export const Trigger = styled.button<{ $open?: boolean; $error?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.sm};
  width: 100%;
  min-height: 48px;
  padding: ${spacing.md} 14px;
  text-align: left;
  color: ${palette.ink};
  background: ${palette.white};
  border: 1.5px solid ${({ $error }) => ($error ? palette.chili : palette.line)};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};
  font-size: ${fontSizes.body};
  font-weight: 500;
  ${focusRing};

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    color: ${palette.inkSoft};
    stroke-width: 1.75;
    transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
    transition: transform 140ms ease-out;
  }

  ${({ theme }) => theme.media.sm} {
    min-height: 48px;
  }

  ${({ theme }) => theme.media.md} {
    padding: ${spacing.md} ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    min-height: 48px;
  }

  ${({ theme }) => theme.media.xl} {
    min-height: 48px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  @media (prefers-reduced-motion: reduce) {
    svg {
      transition: none;
    }
  }
`

export const Value = styled.span<{ $placeholder?: boolean }>`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ $placeholder }) => ($placeholder ? palette.inkSoft : palette.ink)};
  font-weight: ${({ $placeholder }) => ($placeholder ? 500 : 600)};
`

export const Menu = styled.div<{ $top: number; $left: number; $width: number }>`
  position: fixed;
  top: ${({ $top }) => `${$top}px`};
  left: ${({ $left }) => `${$left}px`};
  width: ${({ $width }) => `${$width}px`};
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  padding: ${spacing.xs};
  background: ${palette.white};
  border: 1px solid ${palette.line};
  border-radius: ${radii.md};
  box-shadow: ${shadows.lg};
  max-height: min(320px, 50vh);
  overflow-y: auto;
  overflow-x: hidden;

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.sm};
    gap: ${spacing.xs};
  }

  ${({ theme }) => theme.media.md} {
    max-height: min(360px, 50vh);
  }

  ${({ theme }) => theme.media.lg} {
    max-height: min(400px, 48vh);
  }

  ${({ theme }) => theme.media.xl} {
    max-height: min(420px, 46vh);
  }
`

export const Option = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.sm};
  width: 100%;
  min-height: 44px;
  padding: ${spacing.sm} ${spacing.md};
  text-align: left;
  color: ${({ $active }) => ($active ? brandVar.onPrimary : palette.ink)};
  background: ${({ $active }) => ($active ? brandVar.primary : 'transparent')};
  border-radius: ${radii.sm};
  font-size: ${fontSizes.body};
  font-weight: ${({ $active }) => ($active ? 700 : 600)};

    svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: ${({ $active }) => ($active ? brandVar.onPrimary : palette.ink)};
    stroke-width: 1.75;
  }

  ${({ theme }) => theme.media.sm} {
    min-height: 44px;
  }

  ${({ theme }) => theme.media.md} {
    min-height: 44px;
    padding: ${spacing.sm} ${spacing.md};
  }

  ${({ theme }) => theme.media.lg} {
    min-height: 48px;
  }

  ${({ theme }) => theme.media.xl} {
    min-height: 48px;
  }

  @media (hover: hover) {
    &:hover {
      background: ${({ $active }) => ($active ? brandVar.primary : palette.cream)};
      color: ${({ $active }) => ($active ? brandVar.onPrimary : palette.ink)};
    }
  }
`
