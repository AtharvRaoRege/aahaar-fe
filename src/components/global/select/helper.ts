import { useEffect, useLayoutEffect, useState } from 'react'
import type { RefObject } from 'react'

export interface SelectOption {
  value: string
  label: string
}

export interface MenuBox {
  top: number
  left: number
  width: number
}

export function useSelectMenu(
  open: boolean,
  onClose: () => void,
  rootRef: RefObject<HTMLElement | null>,
  menuRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!open) return

    const onPointer = (event: Event) => {
      const target = event.target as Node
      if (rootRef.current?.contains(target) || menuRef.current?.contains(target)) return
      onClose()
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    const onReposition = (event?: Event) => {
      const target = event?.target
      if (target instanceof Node && menuRef.current?.contains(target)) return
      onClose()
    }

    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onReposition)
    document.addEventListener('scroll', onReposition, true)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onReposition)
      document.removeEventListener('scroll', onReposition, true)
    }
  }, [open, onClose, rootRef, menuRef])
}

export function useMenuBox(
  open: boolean,
  triggerRef: RefObject<HTMLElement | null>,
  optionCount: number,
) {
  const [box, setBox] = useState<MenuBox | null>(null)

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) {
      setBox(null)
      return
    }
    const rect = triggerRef.current.getBoundingClientRect()
    const gap = 6
    const maxHeight = Math.min(320, window.innerHeight * 0.5)
    const estimated = Math.min(maxHeight, Math.max(optionCount, 1) * 48 + 16)
    const spaceBelow = window.innerHeight - rect.bottom - gap
    const dropUp = spaceBelow < estimated && rect.top > spaceBelow
    const top = dropUp ? Math.max(8, rect.top - gap - estimated) : rect.bottom + gap
    const maxLeft = window.innerWidth - rect.width - 8
    setBox({
      top,
      left: Math.max(8, Math.min(rect.left, maxLeft)),
      width: rect.width,
    })
  }, [open, optionCount, triggerRef])

  return box
}
