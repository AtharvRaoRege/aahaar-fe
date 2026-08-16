import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, ChevronDown } from 'lucide-react'

import type { Restaurant } from '@/types/restaurant'

import {
  CheckMark,
  Kind,
  Menu,
  Option,
  Trigger,
  TriggerMeta,
  TriggerName,
  Wrap,
} from './styled'

export interface VenueSwitcherProps {
  restaurants: Restaurant[]
  current: Restaurant | null
  impersonating?: boolean
  dropUp?: boolean
  onSelect: (restaurantId: string) => void
}

export function VenueSwitcher({
  restaurants,
  current,
  impersonating = false,
  dropUp = false,
  onSelect,
}: VenueSwitcherProps) {
  const { t } = useTranslation(['dashboard', 'common'])
  const wrapRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onPointer = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const label = current?.name ?? t('venues.choose')

  return (
    <Wrap ref={wrapRef}>
      <Trigger
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('settings.switchVenue')}
        onClick={() => setOpen((value) => !value)}
      >
        <span>
          <TriggerName>{label}</TriggerName>
          {impersonating && <TriggerMeta>{t('venues.viewingAsAdmin')}</TriggerMeta>}
        </span>
        <ChevronDown aria-hidden />
      </Trigger>
      {open && (
        <Menu $dropUp={dropUp} role="listbox" aria-label={t('venues.switch')}>
          {restaurants.map((venue) => (
            <Option
              key={venue.id}
              type="button"
              role="option"
              aria-selected={venue.id === current?.id && !impersonating}
              onClick={() => {
                onSelect(venue.id)
                setOpen(false)
              }}
            >
              <span>
                <strong>{venue.name}</strong>
                <Kind>{kindLabel(venue.venueKind, t)}</Kind>
              </span>
              {venue.id === current?.id && !impersonating && (
                <CheckMark>
                  <Check aria-hidden />
                </CheckMark>
              )}
            </Option>
          ))}
        </Menu>
      )}
    </Wrap>
  )
}

function kindLabel(kind: Restaurant['venueKind'], t: (key: string) => string) {
  if (kind === 'HOTEL') return t('setup.hotel')
  if (kind === 'CAFE') return t('setup.cafe')
  return t('setup.restaurant')
}
