import { useEffect, useState, useSyncExternalStore } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm, useWatch } from 'react-hook-form'

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
  mapsUrl: string
  googleReviewUrl: string
  upiVpa: string
  upiPayeeName: string
  venueKind: Restaurant['venueKind']
  waiterCallEnabled: boolean
}

function formValues(restaurant: Restaurant): SettingsForm {
  return {
    name: restaurant.name,
    phone: restaurant.phone ?? '',
    address: restaurant.address ?? '',
    mapsUrl: restaurant.mapsUrl ?? '',
    googleReviewUrl: restaurant.googleReviewUrl ?? '',
    upiVpa: restaurant.upiVpa ?? '',
    upiPayeeName: restaurant.upiPayeeName ?? '',
    venueKind: restaurant.venueKind,
    waiterCallEnabled: Boolean(restaurant.waiterCallEnabled),
  }
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
  const form = useForm<SettingsForm>({ defaultValues: formValues(restaurant) })
  const addForm = useForm<AddVenueForm>({
    defaultValues: { name: '', venueKind: 'RESTAURANT' },
  })

  const venuesQuery = useQuery({
    queryKey: queryKeys.restaurants,
    queryFn: () => restaurantsApi.list(),
  })

  useEffect(() => {
    form.reset(formValues(restaurant))
  }, [restaurant, form])

  const mutation = useMutation({
    mutationFn: (values: SettingsForm) =>
      restaurantsApi.update(restaurant.id, {
        name: values.name.trim(),
        phone: values.phone.trim() || null,
        address: values.address.trim() || null,
        mapsUrl: values.mapsUrl.trim() || null,
        googleReviewUrl: values.googleReviewUrl.trim() || null,
        upiVpa: values.upiVpa.trim() || null,
        upiPayeeName: values.upiPayeeName.trim() || null,
        venueKind: values.venueKind,
        waiterCallEnabled: values.waiterCallEnabled,
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

  const venueKind = useWatch({ control: form.control, name: 'venueKind' })
  const addVenueKind = useWatch({ control: addForm.control, name: 'venueKind' })
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
    venueKind,
    setVenueKind: (value: string) =>
      form.setValue('venueKind', value as Restaurant['venueKind'], {
        shouldDirty: true,
        shouldValidate: true,
      }),
    addOpen,
    openAdd: () => setAddOpen(true),
    closeAdd: () => {
      setAddOpen(false)
      addForm.reset({ name: '', venueKind: 'RESTAURANT' })
    },
    addForm,
    addVenueKind,
    setAddVenueKind: (value: string) =>
      addForm.setValue('venueKind', value as Restaurant['venueKind'], {
        shouldDirty: true,
        shouldValidate: true,
      }),
    onAddVenue: addForm.handleSubmit((values) => addVenue.mutate(values)),
    adding: addVenue.isPending,
    addError: addVenue.isError ? errorMessage(addVenue.error) : '',
  }
}
