import type { ReactNode } from 'react'

import { Bar, Left, Logo, Name, Pill, Right } from './styled'

export interface RestaurantHeaderProps {
  name: string
  logoUrl?: string | null
  tableLabel?: string | null
  action?: ReactNode
}

/**
 * Compact identity strip for the sticky menu chrome.
 *
 * The full venue presentation lives in the hero; this only has to keep the diner
 * oriented while they scroll, so it stays one row tall.
 */
export function RestaurantHeader({ name, logoUrl, tableLabel, action }: RestaurantHeaderProps) {
  return (
    <Bar>
      <Left>
        {logoUrl && <Logo src={logoUrl} alt="" width={28} height={28} />}
        <Name>{name}</Name>
        {tableLabel && <Pill>{tableLabel}</Pill>}
      </Left>
      {action && <Right>{action}</Right>}
    </Bar>
  )
}
