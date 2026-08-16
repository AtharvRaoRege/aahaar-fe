import { useEffect, useState, useSyncExternalStore } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { authApi } from '@/lib/api/auth'
import { restaurantsApi } from '@/lib/api/restaurants'
import { tokenStore } from '@/lib/auth/token-store'
import { impersonationStore } from '@/lib/dashboard/impersonation-store'
import { restaurantStore } from '@/lib/dashboard/restaurant-store'
import { queryClient } from '@/lib/query/client'
import { queryKeys } from '@/lib/query/keys'
import type { Restaurant } from '@/types/restaurant'
import { errorMessage } from '@/utils/error-message'

export interface SettingsForm {
  name: string
  phone: string
  address: string
  venueKind: Restaurant['venueKind']
}

export interface AddVenueForm {
  name: string
  venueKind: Restaurant['venueKind']
}

export function useSettingsPage(restaurant: Restaurant) {
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const impersonation = useSyncExternalStore(
    impersonationStore.subscribe,
    impersonationStore.getSnapshot,
    impersonationStore.getSnapshot,
  )
  const form = useForm<SettingsForm>({
    defaultValues: {
      name: restaurant.name,
      phone: restaurant.phone ?? '',
      address: restaurant.address ?? '',
      venueKind: restaurant.venueKind,
    },
  })
  const addForm = useForm<AddVenueForm>({
    defaultValues: { name: '', venueKind: 'RESTAURANT' },
  })

  const venuesQuery = useQuery({
    queryKey: queryKeys.restaurants,
    queryFn: () => restaurantsApi.list(),
  })

  useEffect(() => {
    form.reset({
      name: restaurant.name,
      phone: restaurant.phone ?? '',
      address: restaurant.address ?? '',
      venueKind: restaurant.venueKind,
    })
  }, [
    restaurant.id,
    restaurant.name,
    restaurant.phone,
    restaurant.address,
    restaurant.venueKind,
    form,
  ])

  const mutation = useMutation({
    mutationFn: (values: SettingsForm) =>
      restaurantsApi.update(restaurant.id, {
        name: values.name.trim(),
        phone: values.phone.trim() || null,
        address: values.address.trim() || null,
        venueKind: values.venueKind,
      }),
    onSuccess: (_updated, values) => {
      form.reset(values)
      void queryClient.invalidateQueries({ queryKey: queryKeys.restaurants })
      void queryClient.invalidateQueries({ queryKey: queryKeys.restaurant(restaurant.id) })
    },
  })

  const addVenue = useMutation({
    mutationFn: (values: AddVenueForm) =>
      restaurantsApi.create({
        name: values.name.trim(),
        venueKind: values.venueKind,
      }),
    onSuccess: async (created) => {
      impersonationStore.clear()
      restaurantStore.set(created.id)
      const me = await authApi.me()
      tokenStore.setUser(me)
      await queryClient.invalidateQueries({ queryKey: queryKeys.restaurants })
      await queryClient.invalidateQueries({ queryKey: queryKeys.me })
      addForm.reset({ name: '', venueKind: 'RESTAURANT' })
      setAddOpen(false)
    },
  })

  const publicUrl =
    typeof window === 'undefined'
      ? `/r/${restaurant.slug}`
      : `${window.location.origin}/r/${restaurant.slug}`

  return {
    form,
    onSubmit: form.handleSubmit((values) => mutation.mutate(values)),
    saving: mutation.isPending,
    saved: mutation.isSuccess && !form.formState.isDirty,
    failed: mutation.isError,
    failMessage: mutation.isError ? errorMessage(mutation.error) : '',
    publicUrl,
    copied,
    copyFailed,
    copyLink: async () => {
      setCopyFailed(false)
      try {
        await navigator.clipboard.writeText(publicUrl)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1800)
      } catch {
        setCopyFailed(true)
      }
    },
    venues: venuesQuery.data ?? [restaurant],
    impersonating: Boolean(impersonation),
    switchVenue: (restaurantId: string) => {
      if (!restaurantId || restaurantId === restaurant.id) return
      impersonationStore.clear()
      restaurantStore.set(restaurantId)
    },
    addOpen,
    openAdd: () => setAddOpen(true),
    closeAdd: () => {
      setAddOpen(false)
      addForm.reset({ name: '', venueKind: 'RESTAURANT' })
    },
    addForm,
    onAddVenue: addForm.handleSubmit((values) => addVenue.mutate(values)),
    adding: addVenue.isPending,
    addError: addVenue.isError ? errorMessage(addVenue.error) : '',
  }
}
