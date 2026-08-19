import { useLayoutEffect, useState } from 'react'
import type { RefObject } from 'react'

export { useSelectMenu as useActionMenuLayer } from '@/components/global/select/helper'

export interface ActionMenuItem {
  id: string
  label: string
  disabled?: boolean
}

export interface ActionBox {
  top: number
  left: number
  width: number
}

export function useActionBox(open: boolean, triggerRef: RefObject<HTMLElement | null>) {
  const [box, setBox] = useState<ActionBox | null>(null)

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) {
      setBox(null)
      return
    }
    const rect = triggerRef.current.getBoundingClientRect()
    const gap = 6
    const width = 220
    const estimated = 220
    const spaceBelow = window.innerHeight - rect.bottom - gap
    const dropUp = spaceBelow < estimated && rect.top > spaceBelow
    const top = dropUp ? Math.max(8, rect.top - gap - estimated) : rect.bottom + gap
    const left = Math.max(8, Math.min(rect.right - width, window.innerWidth - width - 8))
    setBox({ top, left, width })
  }, [open, triggerRef])

  return box
}
