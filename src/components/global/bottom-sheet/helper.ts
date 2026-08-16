import { useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'

function project(initialVelocity: number, decelerationRate = 0.998) {
  return (initialVelocity / 1000) * decelerationRate / (1 - decelerationRate)
}

function rubberband(overshoot: number, dimension: number, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot))
}

/** Locks body scroll, closes on Escape, and lets the sheet be dragged down to dismiss. */
export function useBottomSheetBehavior(open: boolean, onClose: () => void) {
  const [offset, setOffset] = useState(0)
  const [dragging, setDragging] = useState(false)
  const draggingRef = useRef(false)
  const offsetRef = useRef(0)
  const drag = useRef({ startY: 0, lastY: 0, lastT: 0, velocity: 0 })

  const resetPosition = () => {
    offsetRef.current = 0
    draggingRef.current = false
    setOffset(0)
    setDragging(false)
  }

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = {
      startY: event.clientY,
      lastY: event.clientY,
      lastT: event.timeStamp,
      velocity: 0,
    }
    draggingRef.current = true
    setDragging(true)
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    const dy = event.clientY - drag.current.startY
    const dt = Math.max(event.timeStamp - drag.current.lastT, 1)
    drag.current.velocity = ((event.clientY - drag.current.lastY) / dt) * 1000
    drag.current.lastY = event.clientY
    drag.current.lastT = event.timeStamp
    const next = dy <= 0 ? rubberband(dy, 420) : dy
    offsetRef.current = next
    setOffset(next)
  }

  const onPointerUp = () => {
    if (!draggingRef.current) return
    draggingRef.current = false
    setDragging(false)
    const current = offsetRef.current
    const velocity = drag.current.velocity
    const projected = current + project(velocity)
    const shouldClose = projected > 140 || (current > 48 && velocity > 700)
    if (shouldClose) {
      resetPosition()
      onClose()
      return
    }
    offsetRef.current = 0
    setOffset(0)
  }

  return {
    offset,
    dragging,
    resetPosition,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  }
}
