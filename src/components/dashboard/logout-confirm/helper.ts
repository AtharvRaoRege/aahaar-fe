import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { staffSignOut } from '@/lib/auth/staff-sign-out'

export function useLogoutConfirm() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)

  const close = () => {
    if (pending) return
    setOpen(false)
  }

  const confirm = () => {
    setPending(true)
    void staffSignOut().finally(() => {
      navigate('/', { replace: true })
    })
  }

  return {
    open,
    pending,
    ask: () => setOpen(true),
    close,
    confirm,
  }
}
