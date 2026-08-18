import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { reviewsApi } from '@/lib/api/reviews'
import { customerPath } from '@/lib/customer/paths'
import { errorMessage } from '@/utils/error-message'

export function usePublicReview(slug: string, tableNumber: string | null) {
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: (values: { rating: number; comment: string; improvement: string }) =>
      reviewsApi.createPublic(slug, {
        rating: values.rating,
        comment: values.comment || undefined,
        improvement: values.improvement || undefined,
      }),
  })

  return {
    submit: mutation.mutate,
    submitted: mutation.isSuccess,
    loading: mutation.isPending,
    error: mutation.isError ? errorMessage(mutation.error) : '',
    goMenu: () => navigate(customerPath(slug, '/menu', tableNumber)),
  }
}
