import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { subscriptionsApi } from '@/lib/api/subscriptions'
import { freshFor } from '@/lib/query/cache'
import { queryKeys } from '@/lib/query/keys'
import { invalidatePlanScopedQueries } from '@/lib/query/plan-scope'
import { errorMessage } from '@/utils/error-message'
import type { PlanSpec, PlanTier, Subscription } from '@/types/subscription'

function orderPlans(plans: PlanSpec[]): PlanSpec[] {
  return [...plans].sort((a, b) => a.monthlyPrice - b.monthlyPrice)
}

export function usePlanPage(restaurantId: string) {
  const queryClient = useQueryClient()
  const [cancelOpen, setCancelOpen] = useState(false)
  const [cancelReason, setCancelReason] = useState('')
  const [error, setError] = useState<string | null>(null)

  const plansQuery = useQuery({
    queryKey: queryKeys.plans,
    queryFn: () => subscriptionsApi.plans(),
    staleTime: freshFor.catalogue,
  })

  const subscriptionQuery = useQuery({
    queryKey: queryKeys.subscription(restaurantId),
    queryFn: () => subscriptionsApi.get(restaurantId),
  })

  const onSettled = (next: Subscription) => {
    queryClient.setQueryData(queryKeys.subscription(restaurantId), next)
    invalidatePlanScopedQueries(queryClient, restaurantId)
    setError(null)
  }

  const onFailed = (cause: unknown) => setError(errorMessage(cause))

  const changePlan = useMutation({
    mutationFn: (plan: PlanTier) => subscriptionsApi.changePlan(restaurantId, plan),
    onSuccess: onSettled,
    onError: onFailed,
  })

  const cancel = useMutation({
    mutationFn: () => subscriptionsApi.cancel(restaurantId, cancelReason.trim() || null),
    onSuccess: (next) => {
      onSettled(next)
      setCancelOpen(false)
      setCancelReason('')
    },
    onError: onFailed,
  })

  const resume = useMutation({
    mutationFn: () => subscriptionsApi.resume(restaurantId),
    onSuccess: onSettled,
    onError: onFailed,
  })

  const plans = useMemo(() => orderPlans(plansQuery.data ?? []), [plansQuery.data])
  const subscription = subscriptionQuery.data ?? null

  return {
    plans,
    subscription,
    isLoading: plansQuery.isLoading || subscriptionQuery.isLoading,
    error,
    busy: changePlan.isPending || cancel.isPending || resume.isPending,
    selectPlan: (plan: PlanTier) => changePlan.mutate(plan),
    cancelOpen,
    openCancel: () => setCancelOpen(true),
    closeCancel: () => setCancelOpen(false),
    cancelReason,
    setCancelReason,
    confirmCancel: () => cancel.mutate(),
    resumeSubscription: () => resume.mutate(),
  }
}

export function trialLabel(spec: PlanSpec): { key: 'trialDays' | 'trialDaysLong'; count: number } {
  if (spec.trialDays >= 60) {
    return { key: 'trialDaysLong', count: Math.round(spec.trialDays / 30) }
  }
  return { key: 'trialDays', count: spec.trialDays }
}
