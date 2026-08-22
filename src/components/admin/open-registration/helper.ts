import { useMutation, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { adminApi } from '@/lib/api/admin'
import { queryClient } from '@/lib/query/client'
import { queryKeys } from '@/lib/query/keys'
import { errorMessage } from '@/utils/error-message'

export function useOpenRegistration() {
  const { t } = useTranslation('dashboard')

  const query = useQuery({
    queryKey: queryKeys.adminSettings,
    queryFn: () => adminApi.settings(),
  })

  const save = useMutation({
    mutationFn: (openRegistration: boolean) => adminApi.updateSettings({ openRegistration }),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.adminSettings, data)
    },
  })

  const enabled = Boolean(query.data?.openRegistration)

  return {
    loading: query.isLoading,
    busy: save.isPending,
    enabled,
    label: t('admin.openRegistration'),
    hint: t('admin.openRegistrationHint'),
    onLabel: t('admin.openRegistrationOn'),
    offLabel: t('admin.openRegistrationOff'),
    error: save.isError
      ? errorMessage(save.error, t('admin.openRegistrationFailed'))
      : '',
    setEnabled: (next: boolean) => {
      if (next === enabled) return
      save.mutate(next)
    },
  }
}
