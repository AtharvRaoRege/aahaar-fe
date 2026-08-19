import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { menuApi } from '@/lib/api/menu'
import { queryKeys } from '@/lib/query/keys'
import { errorMessage } from '@/utils/error-message'

export const MAX_UPSELLS = 4

export function useUpsellPicker(menuItemId: string) {
  const queryClient = useQueryClient()
  // ``null`` means "no local edits yet" — the saved list is shown as-is. Keeping
  // the draft separate avoids syncing server data into state via an effect.
  const [draft, setDraft] = useState<string[] | null>(null)
  const [saved, setSaved] = useState(false)

  const query = useQuery({
    queryKey: queryKeys.upsells(menuItemId),
    queryFn: () => menuApi.getUpsells(menuItemId),
    enabled: Boolean(menuItemId),
  })

  const serverIds = query.data?.suggestions.map((suggestion) => suggestion.menuItemId) ?? []
  const selected = draft ?? serverIds

  const save = useMutation({
    mutationFn: () => menuApi.setUpsells(menuItemId, selected),
    onSuccess: () => {
      setSaved(true)
      setDraft(null)
      void queryClient.invalidateQueries({ queryKey: queryKeys.upsells(menuItemId) })
    },
  })

  return {
    selected,
    isLoading: query.isLoading,
    atLimit: selected.length >= MAX_UPSELLS,
    saving: save.isPending,
    saved,
    error: save.isError ? errorMessage(save.error) : null,
    toggle: (candidateId: string) => {
      setSaved(false)
      const current = draft ?? serverIds
      if (current.includes(candidateId)) {
        setDraft(current.filter((id) => id !== candidateId))
        return
      }
      if (current.length >= MAX_UPSELLS) return
      setDraft([...current, candidateId])
    },
    submit: () => save.mutate(),
  }
}
