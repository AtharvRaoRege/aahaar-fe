import { EllipsisVertical } from 'lucide-react'
import { useCallback, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

import { IconButton } from '@/components/global/icon-button'

import { useActionBox, useActionMenuLayer } from './helper'
import type { ActionMenuItem } from './helper'
import { Item, Menu, Wrap } from './styled'

export function ActionMenu({
  label,
  items,
  disabled,
  onPick,
}: {
  label?: string
  items: ActionMenuItem[]
  disabled?: boolean
  onPick: (id: string) => void
}) {
  const { t } = useTranslation('dashboard')
  const listId = useId()
  const wrapRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  useActionMenuLayer(open, close, wrapRef, menuRef)
  const box = useActionBox(open, wrapRef)

  return (
    <Wrap ref={wrapRef}>
      <IconButton
        type="button"
        size="sm"
        disabled={disabled}
        label={label ?? t('admin.more')}
        icon={<EllipsisVertical aria-hidden />}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => {
          if (disabled) return
          setOpen((current) => !current)
        }}
      />
      {open &&
        box &&
        createPortal(
          <Menu ref={menuRef} id={listId} role="menu" $top={box.top} $left={box.left} $width={box.width}>
            {items.map((item) => (
              <Item
                key={item.id}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                $busy={item.disabled}
                onClick={() => {
                  if (item.disabled) return
                  close()
                  onPick(item.id)
                }}
              >
                {item.label}
              </Item>
            ))}
          </Menu>,
          document.body,
        )}
    </Wrap>
  )
}
