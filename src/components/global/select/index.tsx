import { Check, ChevronDown } from 'lucide-react'
import { useCallback, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

import { useMenuBox, useSelectMenu } from './helper'
import type { SelectOption } from './helper'
import { Menu, Option, Trigger, Value, Wrap } from './styled'

export type { SelectOption }

export interface SelectProps {
  value: string
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  error?: boolean
  name?: string
  onChange: (value: string) => void
}

export function Select({
  value,
  options,
  placeholder,
  disabled = false,
  error = false,
  name,
  onChange,
}: SelectProps) {
  const { t } = useTranslation('common')
  const listId = useId()
  const wrapRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  useSelectMenu(open, close, wrapRef, menuRef)
  const box = useMenuBox(open, triggerRef, options.length)
  const selected = options.find((option) => option.value === value)
  const label = selected?.label ?? placeholder ?? t('actions.choose')

  return (
    <Wrap ref={wrapRef}>
      {name && <input type="hidden" name={name} value={value} />}
      <Trigger
        ref={triggerRef}
        type="button"
        $open={open}
        $error={error}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => {
          if (disabled) return
          setOpen((current) => !current)
        }}
      >
        <Value $placeholder={!selected}>{label}</Value>
        <ChevronDown aria-hidden />
      </Trigger>
      {open &&
        box &&
        createPortal(
          <Menu
            ref={menuRef}
            id={listId}
            role="listbox"
            $top={box.top}
            $left={box.left}
            $width={box.width}
          >
            {options.map((option) => {
              const active = option.value === value
              return (
                <Option
                  key={option.value}
                  type="button"
                  role="option"
                  $active={active}
                  aria-selected={active}
                  onClick={() => {
                    onChange(option.value)
                    close()
                  }}
                >
                  {option.label}
                  {active && <Check aria-hidden />}
                </Option>
              )
            })}
          </Menu>,
          document.body,
        )}
    </Wrap>
  )
}
