import { useState } from 'react'
import type { TFunction } from 'i18next'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { ActionMenuItem } from '@/components/global/action-menu/helper'
import { qrApi } from '@/lib/api/qr'
import { subscriptionsApi } from '@/lib/api/subscriptions'
import { showProUpgrade } from '@/lib/dashboard/pro-upgrade-store'
import { freshFor } from '@/lib/query/cache'
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
    staleTime: freshFor.ownAction,
  })
  const reviewQuery = useQuery({
    queryKey: queryKeys.reviewQr(restaurantId),
    queryFn: () => qrApi.review(restaurantId),
    staleTime: freshFor.ownAction,
  })
  const subscriptionQuery = useQuery({
    queryKey: queryKeys.subscription(restaurantId),
    queryFn: () => subscriptionsApi.get(restaurantId),
  })

  const isPro = subscriptionQuery.data?.effectivePlan === 'PRO'
  const tableLimit = subscriptionQuery.data?.tableLimit ?? 10
  const tableCodes = (query.data ?? []).filter((qr) => qr.kind !== 'REVIEW')
  const atTableLimit = !isPro && tableLimit !== null && tableCodes.length >= tableLimit

  const create = useMutation({
    mutationFn: () =>
      qrApi.create(restaurantId, {
        label: label.trim(),
        tableNumber: tableNumber.trim(),
      }),
    onSuccess: (qr) => {
      setLabel('')
      setTableNumber('')
      queryClient.setQueryData<QrCode[]>(queryKeys.qr(restaurantId), (current) => {
        const list = current ?? []
        if (list.some((item) => item.id === qr.id)) return list
        return [qr, ...list]
      })
      void queryClient.invalidateQueries({ queryKey: queryKeys.qr(restaurantId) })
    },
  })

  return {
    query,
    reviewQr: reviewQuery.data,
    reviewLoading: reviewQuery.isLoading,
    tableCodes,
    isPro,
    tableLimit,
    atTableLimit,
    label,
    setLabel,
    tableNumber,
    setTableNumber,
    create: () => {
      if (atTableLimit) {
        showProUpgrade()
        return
      }
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

export function qrActions(qr: QrCode, copiedId: string | null, t: TFunction): ActionMenuItem[] {
  return [
    {
      id: 'copy',
      label: copiedId === qr.id ? t('qr.copied') : t('qr.copy'),
    },
    { id: 'download', label: t('qr.download') },
  ]
}

export function runQrAction(
  id: string,
  qr: QrCode,
  handlers: {
    onCopy: (qr: QrCode) => void
    onDownload: (qr: QrCode) => void
  },
) {
  if (id === 'copy') void handlers.onCopy(qr)
  if (id === 'download') handlers.onDownload(qr)
}
