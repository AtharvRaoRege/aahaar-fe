import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/global/button'
import { TextField } from '@/components/global/field'
import { authApi } from '@/lib/api/auth'
import { staffHomePath } from '@/lib/auth/staff-home'
import { staffSignOut } from '@/lib/auth/staff-sign-out'
import { tokenStore } from '@/lib/auth/token-store'
import { errorMessage } from '@/utils/error-message'

import { Actions, ErrorText, Form, Inner, Page, Panel, Subtitle, Title } from '../access/styled'

export function PhonePage() {
  const { t } = useTranslation('dashboard')
  const navigate = useNavigate()
  const form = useForm<{ phone: string }>({ defaultValues: { phone: '' } })

  const mutation = useMutation({
    mutationFn: (phone: string) => authApi.updateMe({ phone }),
    onSuccess: (user) => {
      tokenStore.setUser(user)
      navigate(staffHomePath(user), { replace: true })
    },
  })

  return (
    <Page>
      <Inner>
        <Panel>
          <Title>{t('phone.title')}</Title>
          <Subtitle>{t('phone.subtitle')}</Subtitle>
          <Form
            onSubmit={form.handleSubmit((values) => mutation.mutate(values.phone.trim()))}
          >
            {mutation.isError && (
              <ErrorText>{errorMessage(mutation.error) || t('phone.error')}</ErrorText>
            )}
            <TextField
              label={t('login.phone')}
              type="tel"
              autoComplete="tel"
              autoFocus
              error={form.formState.errors.phone ? t('phone.error') : undefined}
              {...form.register('phone', { required: true, minLength: 8 })}
            />
            <Button type="submit" size="lg" fullWidth loading={mutation.isPending}>
              {t('phone.submit')}
            </Button>
          </Form>
          <Actions>
            <Button
              variant="outline"
              onClick={() => {
                void staffSignOut().finally(() => {
                  navigate('/dashboard/login', { replace: true })
                })
              }}
            >
              {t('nav.logout')}
            </Button>
          </Actions>
        </Panel>
      </Inner>
    </Page>
  )
}
