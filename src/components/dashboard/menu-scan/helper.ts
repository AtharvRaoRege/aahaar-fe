import { useMemo, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { menuApi } from '@/lib/api/menu'
import { queryKeys } from '@/lib/query/keys'
import { errorMessage } from '@/utils/error-message'
import type { MenuScanResult, MenuScanRow, ScanConfidence } from '@/types/menu'

export const ACCEPTED_TYPES =
  'image/jpeg,image/png,image/webp,application/pdf,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv,.xlsx'
export const MAX_SCAN_BYTES = 10 * 1024 * 1024

/** A scanned row plus the owner's edits and their include decision. */
export interface DraftRow extends MenuScanRow {
  key: string
  include: boolean
}

function toDraft(row: MenuScanRow, index: number): DraftRow {
  return {
    ...row,
    key: `${index}-${row.name}`,
    include: row.confidence !== 'LOW',
  }
}

function fromResult(result: MenuScanResult): {
  rows: DraftRow[]
  quality: 'GOOD' | 'POOR'
  notes: string | null
  truncated: boolean
} {
  return {
    rows: result.rows.map(toDraft),
    quality: result.imageQuality,
    notes: result.notes,
    truncated: result.truncated,
  }
}

export function useMenuScan(
  restaurantId: string,
  onDone: (created: number) => void,
  seed: MenuScanResult | null,
  onQueueFile: (file: File) => void,
) {
  const queryClient = useQueryClient()
  const initial = seed ? fromResult(seed) : null
  const [rows, setRows] = useState<DraftRow[] | null>(initial?.rows ?? null)
  const [quality] = useState<'GOOD' | 'POOR'>(initial?.quality ?? 'GOOD')
  const [notes] = useState<string | null>(initial?.notes ?? null)
  const [truncated] = useState(initial?.truncated ?? false)
  const [error, setError] = useState('')

  const apply = useMutation({
    mutationFn: (approved: MenuScanRow[]) => menuApi.applyMenuScan(restaurantId, approved),
    onMutate: () => setError(''),
    onSuccess: (result) => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.dashboardMenu(restaurantId),
      })
      reset()
      onDone(result.created)
    },
    onError: (cause) => setError(errorMessage(cause)),
  })

  const reset = () => {
    setRows(null)
    setError('')
  }

  const ready = useMemo(
    () =>
      (rows ?? []).filter(
        (row) => row.include && row.name.trim() && row.price !== null && row.price > 0,
      ),
    [rows],
  )

  const patch = (key: string, changes: Partial<DraftRow>) =>
    setRows((current) =>
      (current ?? []).map((row) => (row.key === key ? { ...row, ...changes } : row)),
    )

  return {
    rows,
    quality,
    notes,
    truncated,
    error,
    applying: apply.isPending,
    readyCount: ready.length,
    lowCount: (rows ?? []).filter((row) => row.confidence === 'LOW').length,
    pickFile: (file: File | null) => {
      if (!file) return
      if (file.size > MAX_SCAN_BYTES) {
        setError('MAX_SIZE')
        return
      }
      setError('')
      onQueueFile(file)
    },
    setInclude: (key: string, include: boolean) => patch(key, { include }),
    setName: (key: string, name: string) => patch(key, { name }),
    setCategory: (key: string, category: string) => patch(key, { category }),
    setPrice: (key: string, raw: string) => {
      const parsed = Number.parseFloat(raw)
      patch(key, { price: Number.isFinite(parsed) && parsed >= 0 ? parsed : null })
    },
    approveConfident: () =>
      setRows((current) =>
        (current ?? []).map((row) =>
          row.confidence === 'LOW' ? row : { ...row, include: true },
        ),
      ),
    submit: () => {
      if (!ready.length) return
      apply.mutate(
        ready.map((row) => ({
          name: row.name.trim(),
          category: row.category.trim(),
          price: row.price,
          description: row.description,
          isVegetarian: row.isVegetarian,
          confidence: row.confidence,
        })),
      )
    },
    reset,
  }
}

export const CONFIDENCE_TONE: Record<ScanConfidence, 'ok' | 'warn' | 'bad'> = {
  HIGH: 'ok',
  MEDIUM: 'warn',
  LOW: 'bad',
}
