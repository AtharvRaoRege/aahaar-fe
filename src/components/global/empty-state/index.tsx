import type { ReactNode } from 'react'

import { Action, Emoji, Hint, Title, Wrap } from './styled'

export interface EmptyStateProps {
  emoji?: string
  title: string
  hint?: string
  action?: ReactNode
}

export function EmptyState({ emoji = '🍽️', title, hint, action }: EmptyStateProps) {
  return (
    <Wrap>
      <Emoji aria-hidden>{emoji}</Emoji>
      <Title>{title}</Title>
      {hint && <Hint>{hint}</Hint>}
      {action && <Action>{action}</Action>}
    </Wrap>
  )
}
