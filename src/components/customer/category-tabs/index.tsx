import { Bar, Scroller, Tab } from './styled'

export interface CategoryTab {
  id: string
  name: string
}

export interface CategoryTabsProps {
  tabs: CategoryTab[]
  activeId: string
  onSelect: (id: string) => void
}

export function CategoryTabs({ tabs, activeId, onSelect }: CategoryTabsProps) {
  return (
    <Bar>
      <Scroller role="tablist">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            role="tab"
            aria-selected={tab.id === activeId}
            $active={tab.id === activeId}
            onClick={() => onSelect(tab.id)}
          >
            {tab.name}
          </Tab>
        ))}
      </Scroller>
    </Bar>
  )
}
