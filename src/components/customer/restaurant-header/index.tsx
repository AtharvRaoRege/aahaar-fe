import type { ReactNode } from 'react'

import { Bar, Left, Name, Pill } from './styled'

export interface RestaurantHeaderProps {
  name: string
  tableLabel?: string | null
  action?: ReactNode
}

export function RestaurantHeader({ name, tableLabel, action }: RestaurantHeaderProps) {
  return (
    <Bar>
      <Left>
        <Name>{name}</Name>
        {tableLabel && <Pill>{tableLabel}</Pill>}
      </Left>
      {action}
    </Bar>
  )
}
