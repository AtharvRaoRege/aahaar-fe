import { useMemo, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { menuApi } from '@/lib/api/menu'
import { queryKeys } from '@/lib/query/keys'
import { errorMessage } from '@/utils/error-message'
import type { MenuScanRow, ScanConfidence } from '@/types/menu'

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
    // Low-confidence rows start unchecked: the owner has to look at each one
    // before it can reach the live menu (PRD §18).
    include: row.confidence !== 'LOW',
  }
}

export function useMenuScan(restaurantId: string, onDone: (created: number) => void) {
  const queryClient = useQueryClient()
  const [rows, setRows] = useState<DraftRow[] | null>(null)
  const [quality, setQuality] = useState<'GOOD' | 'POOR'>('GOOD')
  const [notes, setNotes] = useState<string | null>(null)
  const [truncated, setTruncated] = useState(false)
  const [error, setError] = useState('')

  const scan = useMutation({
    mutationFn: (file: File) => menuApi.scanMenu(restaurantId, file),
    onMutate: () => setError(''),
    onSuccess: (result) => {
      setRows(result.rows.map(toDraft))
      setQuality(result.imageQuality)
      setNotes(result.notes)
      setTruncated(result.truncated)
    },
    onError: (cause) => setError(errorMessage(cause)),
  })

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
    setNotes(null)
    setTruncated(false)
    setError('')
    scan.reset()
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
    scanning: scan.isPending,
    applying: apply.isPending,
    readyCount: ready.length,
    lowCount: (rows ?? []).filter((row) => row.confidence === 'LOW').length,
    pickFile: (file: File | null) => {
      if (!file) return
      if (file.size > MAX_SCAN_BYTES) {
        setError('MAX_SIZE')
        return
      }
      scan.mutate(file)
    },
    setInclude: (key: string, include: boolean) => patch(key, { include }),
    setName: (key: string, name: string) => patch(key, { name }),
    setCategory: (key: string, category: string) => patch(key, { category }),
    setPrice: (key: string, raw: string) => {
      const parsed = Number.parseFloat(raw)
      patch(key, { price: Number.isFinite(parsed) && parsed >= 0 ? parsed : null })
    },
    /** Bulk shortcut deliberately skips LOW rows — those need individual eyes. */
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
