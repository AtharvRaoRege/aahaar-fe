import type { ReactNode } from 'react'

import { Bar, Divider, Group, Scroller, Tab } from './styled'

export interface CategoryTab {
  id: string
  name: string
}

export interface CategoryTabsProps {
  tabs: CategoryTab[]
  activeId: string
  onSelect: (id: string) => void
  label: string
  /** Chips that share the rail — the diet filters, so both cost one tap. */
  leading?: ReactNode
}

/**
 * The one control rail on the menu.
 *
 * Diet filters ride in the same scroller as the categories rather than owning a
 * row of their own: on a phone every extra row of chrome is a dish the guest
 * cannot see.
 */
export function CategoryTabs({ tabs, activeId, onSelect, label, leading }: CategoryTabsProps) {
  return (
    <Bar>
      <Scroller>
        {leading}
        {leading && tabs.length > 0 && <Divider aria-hidden />}
        {tabs.length > 0 && (
          <Group role="tablist" aria-label={label}>
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={tab.id === activeId}
                $active={tab.id === activeId}
                onClick={() => onSelect(tab.id)}
              >
                {tab.name}
              </Tab>
            ))}
          </Group>
        )}
      </Scroller>
    </Bar>
  )
}
