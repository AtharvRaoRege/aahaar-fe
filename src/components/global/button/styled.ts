import styled, { css, keyframes } from 'styled-components'

import { focusRing, neoPressable } from '@/styles/mixins'
import { palette, radii, shadows } from '@/styles/theme'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface StyledButtonProps {
  $variant: ButtonVariant
  $size: ButtonSize
  $fullWidth: boolean
  $loading: boolean
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

export const Spinner = styled.span`
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.55s linear infinite;
  flex-shrink: 0;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.55;
  }
`

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.palette.white};
    border-color: ${({ theme }) => theme.colors.primary};
  `,
  secondary: css`
    background: ${palette.mango};
    color: ${palette.ink};
    border-color: ${palette.ink};
  `,
  outline: css`
    background: ${palette.white};
    color: ${palette.ink};
    box-shadow: ${shadows.sm};
  `,
  danger: css`
    background: ${palette.chili};
    color: ${palette.white};
    border-color: ${palette.chili};
  `,
  ghost: css`
    background: transparent;
    color: ${palette.ink};
    border-color: transparent;
    box-shadow: none;
  `,
}

const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
  sm: css`
    min-height: 40px;
    padding: 0 14px;
    font-size: 0.875rem;
  `,
  md: css`
    min-height: 44px;
    padding: 0 18px;
    font-size: 0.9375rem;
  `,
  lg: css`
    min-height: 52px;
    padding: 0 22px;
    font-size: 1rem;
  `,
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  border: 1.5px solid ${palette.ink};
  border-radius: ${radii.md};
  box-shadow: ${shadows.sm};
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1;
  white-space: nowrap;
  ${({ $size }) => sizeStyles[$size]};
  ${({ $variant }) => variantStyles[$variant]};
  ${neoPressable};
  ${focusRing};
  opacity: ${({ $loading, disabled }) => ($loading || disabled ? 0.72 : 1)};

  svg {
    width: 1.15em;
    height: 1.15em;
    stroke-width: 1.75;
  }
`
