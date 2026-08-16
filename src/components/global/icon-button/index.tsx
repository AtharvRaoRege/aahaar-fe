import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { StyledIconButton } from './styled'
import type { IconButtonSize, IconButtonTone } from './styled'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required for accessibility — icon-only controls need an accessible name. */
  label: string
  icon: ReactNode
  tone?: IconButtonTone
  size?: IconButtonSize
}

export function IconButton({
  label,
  icon,
  tone = 'default',
  size = 'md',
  ...rest
}: IconButtonProps) {
  return (
    <StyledIconButton $tone={tone} $size={size} aria-label={label} title={label} {...rest}>
      {icon}
    </StyledIconButton>
  )
}
