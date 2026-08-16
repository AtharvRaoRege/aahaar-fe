import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { BrandMark } from '@/components/global/brand-mark'
import { Button } from '@/components/global/button'
import { authApi } from '@/lib/api/auth'
import { staffSignOut } from '@/lib/auth/staff-sign-out'
import { useAuth } from '@/lib/auth/use-auth'
import { queryKeys } from '@/lib/query/keys'

import { Actions, Inner, Page, Panel, Subtitle, Title } from '../access/styled'

export function WaitlistPage() {
  const { t } = useTranslation('dashboard')
  const { user } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const me = useQuery({
    queryKey: queryKeys.me,
    queryFn: authApi.me,
    refetchInterval: 15_000,
  })
  const current = me.data ?? user

  return (
    <Page>
      <Inner>
        <Panel>
          <BrandMark size={56} />
          <Title>{t('waitlist.title')}</Title>
          <Subtitle>{t('waitlist.subtitle')}</Subtitle>
          {current?.email && <Subtitle>{current.email}</Subtitle>}
          {current?.phone && <Subtitle>{current.phone}</Subtitle>}
          <Subtitle>{t('waitlist.hint')}</Subtitle>
          <Actions>
            <Button
              variant="secondary"
              onClick={() => void queryClient.invalidateQueries({ queryKey: queryKeys.me })}
              loading={me.isFetching}
            >
              {me.isFetching ? t('waitlist.checking') : t('waitlist.check')}
            </Button>
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
