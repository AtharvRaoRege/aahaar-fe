import type { HTMLAttributes } from 'react'

import { StyledCard } from './styled'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
  surface?: string
}

export function Card({ interactive, surface, children, ...rest }: CardProps) {
  return (
    <StyledCard $interactive={interactive} $surface={surface} {...rest}>
      {children}
    </StyledCard>
  )
}
