import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { offersApi } from '@/lib/api/offers'
import { subscriptionsApi } from '@/lib/api/subscriptions'
import { queryKeys } from '@/lib/query/keys'
import { errorMessage } from '@/utils/error-message'
import type { Offer, OfferKind, OfferPayload } from '@/types/offer'

export const OFFER_KINDS: OfferKind[] = [
  'PERCENT',
  'FLAT',
  'BOGO',
  'COMBO',
  'HAPPY_HOUR',
  'SPECIAL_DAY',
]

/** Percent and flat are on Basic; the rest need Pro (mirrors the server gate). */
export const BASIC_OFFER_KINDS: OfferKind[] = ['PERCENT', 'FLAT']

export interface OfferFormState {
  kind: OfferKind
  title: string
  description: string
  terms: string
  couponCode: string
  value: string
  startsAt: string
  endsAt: string
  isActive: boolean
}

const EMPTY_FORM: OfferFormState = {
  kind: 'PERCENT',
  title: '',
  description: '',
  terms: '',
  couponCode: '',
  value: '',
  startsAt: '',
  endsAt: '',
  isActive: true,
}

/** ``datetime-local`` needs ``YYYY-MM-DDTHH:mm`` in local time. */
function toLocalInput(value: string | null): string {
  if (!value) return ''
  const date = new Date(value)
  const offset = date.getTimezoneOffset() * 60_000
  return new Date(date.getTime() - offset).toISOString().slice(0, 16)
}

function toIso(value: string): string | null {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date.toISOString()
}

function toPayload(form: OfferFormState): OfferPayload {
  const numeric = Number.parseFloat(form.value)
  return {
    kind: form.kind,
    title: form.title.trim(),
    description: form.description.trim() || null,
    terms: form.terms.trim() || null,
    couponCode: form.couponCode.trim().toUpperCase() || null,
    value: Number.isFinite(numeric) ? numeric : null,
    startsAt: toIso(form.startsAt),
    endsAt: toIso(form.endsAt),
    isActive: form.isActive,
  }
}

function toForm(offer: Offer): OfferFormState {
  return {
    kind: offer.kind,
    title: offer.title,
    description: offer.description ?? '',
    terms: offer.terms ?? '',
    couponCode: offer.couponCode ?? '',
    value: offer.value === null ? '' : String(offer.value),
    startsAt: toLocalInput(offer.startsAt),
    endsAt: toLocalInput(offer.endsAt),
    isActive: offer.isActive,
  }
}

export function useOffersPage(restaurantId: string) {
  const queryClient = useQueryClient()
  const [editing, setEditing] = useState<Offer | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState<OfferFormState>(EMPTY_FORM)
  const [pendingDelete, setPendingDelete] = useState<Offer | null>(null)
  const [error, setError] = useState<string | null>(null)

  const listQuery = useQuery({
    queryKey: queryKeys.offers(restaurantId),
    queryFn: () => offersApi.list(restaurantId),
  })

  const subscriptionQuery = useQuery({
    queryKey: queryKeys.subscription(restaurantId),
    queryFn: () => subscriptionsApi.get(restaurantId),
  })

  const isPro = subscriptionQuery.data?.effectivePlan === 'PRO'

  const refresh = () => {
    void queryClient.invalidateQueries({ queryKey: queryKeys.offers(restaurantId) })
    setError(null)
  }

  const save = useMutation({
    mutationFn: () =>
      editing
        ? offersApi.update(restaurantId, editing.id, toPayload(form))
        : offersApi.create(restaurantId, toPayload(form)),
    onSuccess: () => {
      refresh()
      setFormOpen(false)
      setEditing(null)
      setForm(EMPTY_FORM)
    },
    onError: (cause) => setError(errorMessage(cause)),
  })

  const toggleActive = useMutation({
    mutationFn: (offer: Offer) =>
      offersApi.update(restaurantId, offer.id, { isActive: !offer.isActive }),
    onSuccess: refresh,
    onError: (cause) => setError(errorMessage(cause)),
  })

  const remove = useMutation({
    mutationFn: (offer: Offer) => offersApi.remove(restaurantId, offer.id),
    onSuccess: () => {
      refresh()
      setPendingDelete(null)
    },
    onError: (cause) => setError(errorMessage(cause)),
  })

  const availableKinds = useMemo(
    () => (isPro ? OFFER_KINDS : BASIC_OFFER_KINDS),
    [isPro],
  )

  return {
    offers: listQuery.data ?? [],
    isLoading: listQuery.isLoading,
    isPro,
    availableKinds,
    error,
    busy: save.isPending || toggleActive.isPending || remove.isPending,
    form,
    setField: <K extends keyof OfferFormState>(key: K, value: OfferFormState[K]) =>
      setForm((current) => ({ ...current, [key]: value })),
    formOpen,
    isEditing: editing !== null,
    openCreate: () => {
      setEditing(null)
      setForm(EMPTY_FORM)
      setError(null)
      setFormOpen(true)
    },
    openEdit: (offer: Offer) => {
      setEditing(offer)
      setForm(toForm(offer))
      setError(null)
      setFormOpen(true)
    },
    closeForm: () => {
      setFormOpen(false)
      setEditing(null)
    },
    submit: () => {
      if (!form.title.trim()) return
      save.mutate()
    },
    toggle: (offer: Offer) => toggleActive.mutate(offer),
    pendingDelete,
    askDelete: (offer: Offer) => setPendingDelete(offer),
    cancelDelete: () => setPendingDelete(null),
    confirmDelete: () => {
      if (pendingDelete) remove.mutate(pendingDelete)
    },
  }
}
