import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { waiterApi } from '@/lib/api/waiter'
import { sessionStore } from '@/lib/customer/session-store'
import { errorMessage } from '@/utils/error-message'

export function useCallWaiter(
  slug: string,
  restaurantId: string,
  tableNumber: string | null,
) {
  const [called, setCalled] = useState(false)
  const mutation = useMutation({
    mutationFn: () =>
      waiterApi.create(slug, {
        tableNumber: tableNumber ?? '',
        customerSessionId: sessionStore.get(restaurantId)?.id ?? null,
      }),
    onSuccess: () => setCalled(true),
  })

  return {
    show: Boolean(tableNumber),
    called,
    busy: mutation.isPending,
    error: mutation.isError ? errorMessage(mutation.error) : '',
    request: () => {
      if (!tableNumber || called || mutation.isPending) return
      mutation.mutate()
    },
  }
}
