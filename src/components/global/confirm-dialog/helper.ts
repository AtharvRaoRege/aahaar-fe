import { useEffect } from 'react'

export function useConfirmDialogLayer(open: boolean, onClose: () => void, locked = false) {
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.stopImmediatePropagation()
      if (!locked) onClose()
    }

    window.addEventListener('keydown', onKeyDown, true)
    return () => window.removeEventListener('keydown', onKeyDown, true)
  }, [open, onClose, locked])
}
