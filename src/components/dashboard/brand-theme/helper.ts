import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

import { applyBrandToDocument } from '@/hooks/theme/use-document-brand/helper'
import { restaurantsApi } from '@/lib/api/restaurants'
import { subscriptionsApi } from '@/lib/api/subscriptions'
import { queryClient } from '@/lib/query/client'
import { invalidatePublicVenue } from '@/lib/query/invalidate-public'
import { queryKeys } from '@/lib/query/keys'
import type { Restaurant } from '@/types/restaurant'
import { errorMessage } from '@/utils/error-message'
import type { BrandPalette } from '@/utils/theme/brand-palette'
import { PLATFORM_PRIMARY, buildBrandPalette, normalizeHex } from '@/utils/theme/brand-palette'

export { PLATFORM_PRIMARY, buildBrandPalette }

export function useBrandThemeSettings(restaurant: Restaurant) {
  const saved = normalizeHex(restaurant.primaryColor) ?? PLATFORM_PRIMARY
  const [override, setOverride] = useState<string | null>(null)
  const [hexOverride, setHexOverride] = useState<string | null>(null)

  const subscriptionQuery = useQuery({
    queryKey: queryKeys.subscription(restaurant.id),
    queryFn: () => subscriptionsApi.get(restaurant.id),
  })
  const isPro =
    subscriptionQuery.data?.effectivePlan === 'PRO' ||
    Boolean(subscriptionQuery.data?.features?.includes('BRAND_THEME'))

  const draft = override ?? saved
  const hexInput = hexOverride ?? saved
  const palette = useMemo(() => buildBrandPalette(draft), [draft])
  const dirty = draft.toUpperCase() !== saved.toUpperCase()
  const hexValid = normalizeHex(hexInput) !== null

  const save = useMutation({
    mutationFn: (primaryColor: string) =>
      restaurantsApi.update(restaurant.id, { primaryColor }),
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKeys.restaurant(updated.id), updated)
      queryClient.setQueryData<Restaurant[]>(queryKeys.restaurants, (current) =>
        current?.map((row) => (row.id === updated.id ? updated : row)),
      )
      void queryClient.invalidateQueries({ queryKey: queryKeys.restaurants })
      void queryClient.invalidateQueries({ queryKey: queryKeys.restaurant(updated.id) })
      invalidatePublicVenue(queryClient, updated.slug)
      applyBrandToDocument(updated.primaryColor)
      setOverride(null)
      setHexOverride(null)
    },
  })

  return {
    isPro,
    locked: subscriptionQuery.isSuccess && !isPro,
    draft,
    hexInput,
    palette,
    dirty,
    hexValid,
    saved,
    isDefault: draft.toUpperCase() === PLATFORM_PRIMARY,
    busy: save.isPending,
    error: save.isError ? errorMessage(save.error) : '',
    savedOk: save.isSuccess && !dirty,
    onPickerChange: (value: string) => {
      if (!isPro) return
      const next = normalizeHex(value) ?? draft
      setOverride(next)
      setHexOverride(next)
      applyBrandToDocument(next)
      save.reset()
    },
    onHexChange: (value: string) => {
      if (!isPro) return
      setHexOverride(value)
      const next = normalizeHex(value)
      if (next) {
        setOverride(next)
        applyBrandToDocument(next)
        save.reset()
      }
    },
    resetDefault: () => {
      if (!isPro) return
      setOverride(PLATFORM_PRIMARY)
      setHexOverride(PLATFORM_PRIMARY)
      applyBrandToDocument(PLATFORM_PRIMARY)
      save.reset()
    },
    save: () => {
      if (!isPro || !hexValid) return
      save.mutate(draft)
    },
  }
}

export type BrandThemeState = ReturnType<typeof useBrandThemeSettings>
export type { BrandPalette }
