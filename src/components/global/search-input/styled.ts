import styled, { css, keyframes } from 'styled-components'

import { fontSizes, palette, radii, shadows, spacing, transitions } from '@/styles/theme'
import { brandVar } from '@/utils/theme/brand-palette'

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
`

export const Shell = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
`

export const Wrap = styled.div<{ $listening?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  min-width: 0;
  padding: 0 ${spacing.sm} 0 ${spacing.md};
  background: ${palette.white};
  border: 1px solid ${({ $listening }) => ($listening ? brandVar.primary : palette.line)};
  border-radius: ${radii.full};
  box-shadow: ${shadows.sm};
  transition:
    border-color ${transitions.fast},
    box-shadow ${transitions.fast};

  &:focus-within {
    border-color: ${brandVar.primary};
    box-shadow: ${shadows.mangoRing}, ${shadows.sm};
  }

  > svg {
    width: 20px;
    height: 20px;
    stroke-width: 2;
    flex-shrink: 0;
    color: ${palette.inkSoft};
  }

  ${({ theme }) => theme.media.sm} {
    padding: 0 ${spacing.sm} 0 ${spacing.lg};
    gap: ${spacing.sm};
  }

  ${({ theme }) => theme.media.md} {
    padding: 0 ${spacing.md} 0 ${spacing.lg};
    gap: ${spacing.md};
  }

  ${({ theme }) => theme.media.lg} {
    padding: 0 ${spacing.md} 0 ${spacing.lg};
  }

  ${({ theme }) => theme.media.xl} {
    padding: 0 ${spacing.md} 0 ${spacing.xl};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  min-height: 48px;
  border: none;
  background: transparent;
  font-weight: 500;
  font-size: ${fontSizes.body};
  outline: none;
  appearance: none;

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }

  &::placeholder {
    color: ${palette.inkSoft};
    opacity: 0.75;
    font-weight: 500;
  }

  ${({ theme }) => theme.media.sm} {
    min-height: 48px;
  }

  ${({ theme }) => theme.media.md} {
    min-height: 52px;
  }

  ${({ theme }) => theme.media.lg} {
    min-height: 52px;
  }

  ${({ theme }) => theme.media.xl} {
    min-height: 56px;
  }
`

export const MicButton = styled.button<{ $listening?: boolean }>`
  position: relative;
  z-index: 1;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background: ${({ $listening }) => ($listening ? brandVar.primary : 'transparent')};
  border: none;
  border-radius: ${radii.full};
  color: ${({ $listening }) => ($listening ? brandVar.onPrimary : palette.inkSoft)};
  cursor: pointer;
  pointer-events: auto;
  touch-action: manipulation;
  ${({ $listening }) =>
    $listening &&
    css`
      animation: ${pulse} 1s ease-in-out infinite;
    `}

  svg {
    width: 20px;
    height: 20px;
    stroke-width: 2;
  }

  ${({ theme }) => theme.media.sm} {
    width: 40px;
    height: 40px;
  }

  ${({ theme }) => theme.media.md} {
    width: 44px;
    height: 44px;
  }

  ${({ theme }) => theme.media.lg} {
    width: 44px;
    height: 44px;
  }

  ${({ theme }) => theme.media.xl} {
    width: 48px;
    height: 48px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const Hint = styled.p`
  position: absolute;
  top: calc(100% + ${spacing.xs});
  left: ${spacing.md};
  right: ${spacing.md};
  z-index: ${({ theme }) => theme.zIndex.header};
  margin: 0;
  padding: ${spacing.xs} ${spacing.sm};
  background: ${palette.ink};
  color: ${palette.white};
  border-radius: ${radii.sm};
  font-size: ${fontSizes.labelSm};
  font-weight: 600;
  pointer-events: none;

  ${({ theme }) => theme.media.sm} {
    font-size: ${fontSizes.label};
  }

  ${({ theme }) => theme.media.md} {
    left: ${spacing.lg};
    right: ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    left: ${spacing.lg};
    right: ${spacing.lg};
  }

  ${({ theme }) => theme.media.xl} {
    left: ${spacing.lg};
    right: ${spacing.lg};
  }
`
