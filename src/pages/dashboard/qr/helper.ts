import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { qrApi } from '@/lib/api/qr'
import { queryKeys } from '@/lib/query/keys'
import type { QrCode } from '@/types/qr'
import { errorMessage } from '@/utils/error-message'

export function downloadQr(qr: QrCode) {
  const link = document.createElement('a')
  link.href = qr.imageDataUrl
  link.download = `${qr.label.replace(/\s+/g, '-').toLowerCase()}.png`
  link.click()
}

export async function copyText(value: string) {
  await navigator.clipboard.writeText(value)
}

export function useQrPage(restaurantId: string) {
  const queryClient = useQueryClient()
  const [label, setLabel] = useState('')
  const [tableNumber, setTableNumber] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [hint, setHint] = useState('')

  const query = useQuery({
    queryKey: queryKeys.qr(restaurantId),
    queryFn: () => qrApi.list(restaurantId),
  })

  const create = useMutation({
    mutationFn: () =>
      qrApi.create(restaurantId, {
        label: label.trim(),
        tableNumber: tableNumber.trim(),
      }),
    onSuccess: () => {
      setLabel('')
      setTableNumber('')
      void queryClient.invalidateQueries({ queryKey: queryKeys.qr(restaurantId) })
    },
  })

  return {
    query,
    label,
    setLabel,
    tableNumber,
    setTableNumber,
    create: () => {
      if (!label.trim()) {
        setHint('qr.needLabel')
        return
      }
      if (!tableNumber.trim()) {
        setHint('qr.needTable')
        return
      }
      setHint('')
      create.mutate()
    },
    creating: create.isPending,
    createError: create.isError ? errorMessage(create.error) : '',
    hint,
    downloadQr,
    copiedId,
    copyLink: async (qr: QrCode) => {
      try {
        await copyText(qr.targetUrl)
        setCopiedId(qr.id)
        window.setTimeout(() => setCopiedId(null), 1800)
      } catch {
        setCopiedId(null)
      }
    },
  }
}
