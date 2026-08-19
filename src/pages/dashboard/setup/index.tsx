import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { LogoutButton } from '@/components/dashboard/logout-confirm'
import { Button } from '@/components/global/button'
import { FormField, TextField } from '@/components/global/field'
import { Select } from '@/components/global/select'
import { authApi } from '@/lib/api/auth'
import { restaurantsApi } from '@/lib/api/restaurants'
import { adoptUser } from '@/lib/auth/session-sync'
import { restaurantStore } from '@/lib/dashboard/restaurant-store'
import { queryKeys } from '@/lib/query/keys'
import type { Restaurant } from '@/types/restaurant'
import { errorMessage } from '@/utils/error-message'

import { Actions, ErrorText, Form, Inner, Page, Panel, Subtitle, Title } from '../access/styled'

interface SetupForm {
  name: string
  venueKind: Restaurant['venueKind']
}

export function SetupPage() {
  const { t } = useTranslation('dashboard')
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const form = useForm<SetupForm>({
    defaultValues: { name: '', venueKind: 'RESTAURANT' },
  })
  const venueKind = useWatch({ control: form.control, name: 'venueKind' })

  const mutation = useMutation({
    mutationFn: (values: SetupForm) =>
      restaurantsApi.create({ name: values.name.trim(), venueKind: values.venueKind }),
    onSuccess: async (restaurant) => {
      restaurantStore.set(restaurant.id)
      const me = await authApi.me()
      adoptUser(queryClient, me)
      await queryClient.invalidateQueries({ queryKey: queryKeys.restaurants })
      navigate('/dashboard/menu', { replace: true })
    },
  })

  return (
    <Page>
      <Inner>
        <Panel>
          <Title>{t('setup.title')}</Title>
          <Subtitle>{t('setup.subtitle')}</Subtitle>
          <Form
            onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
          >
            {mutation.isError && (
              <ErrorText>{errorMessage(mutation.error) || t('setup.error')}</ErrorText>
            )}
            <FormField label={t('setup.kind')}>
              <Select
                value={venueKind}
                options={[
                  { value: 'RESTAURANT', label: t('setup.restaurant') },
                  { value: 'HOTEL', label: t('setup.hotel') },
                  { value: 'CAFE', label: t('setup.cafe') },
                ]}
                onChange={(value) =>
                  form.setValue('venueKind', value as Restaurant['venueKind'], {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
              />
            </FormField>
            <TextField
              label={t('setup.name')}
              placeholder={t('setup.nameHint')}
              autoComplete="organization"
              autoFocus
              error={form.formState.errors.name ? t('login.required') : undefined}
              {...form.register('name', { required: true, minLength: 2 })}
            />
            <Button type="submit" size="lg" fullWidth loading={mutation.isPending}>
              {t('setup.submit')}
            </Button>
          </Form>
          <Actions>
            <LogoutButton />
          </Actions>
        </Panel>
      </Inner>
    </Page>
  )
}
