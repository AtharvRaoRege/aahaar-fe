import { useState } from 'react'
import type { FormEvent } from 'react'

import { guestProfileStore } from '@/lib/customer/guest-profile-store'
import { sessionStore } from '@/lib/customer/session-store'
import { createNamedTableSession } from '@/lib/customer/table-session'

export interface UseGuestWelcomeArgs {
  restaurantId: string
  slug: string
  tableNumber: string
  onReady: () => void
}

export function useGuestWelcome({ restaurantId, slug, tableNumber, onReady }: UseGuestWelcomeArgs) {
  const saved = guestProfileStore.get(restaurantId)
  const [name, setName] = useState(saved?.name ?? '')
  const [contactNumber, setContactNumber] = useState(saved?.contactNumber ?? '')
  const [nameError, setNameError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [failed, setFailed] = useState(false)

  const submit = async () => {
    const trimmedName = name.trim()
    if (!trimmedName) {
      setNameError(true)
      return
    }
    setNameError(false)
    setFailed(false)
    setSubmitting(true)
    try {
      await createNamedTableSession(restaurantId, slug, tableNumber, {
        name: trimmedName,
        contactNumber: contactNumber.trim() || undefined,
      })
      onReady()
    } catch {
      sessionStore.clear(restaurantId)
      setFailed(true)
    } finally {
      setSubmitting(false)
    }
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    void submit()
  }

  return {
    name,
    contactNumber,
    nameError,
    submitting,
    failed,
    setName: (value: string) => {
      setName(value)
      if (value.trim()) setNameError(false)
    },
    setContactNumber,
    onSubmit,
  }
}
