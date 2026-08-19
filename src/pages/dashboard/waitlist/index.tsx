import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { BrandMark } from '@/components/global/brand-mark'
import { Button } from '@/components/global/button'
import { LogoutButton } from '@/components/dashboard/logout-confirm'
import { authApi } from '@/lib/api/auth'
import { useAuth } from '@/lib/auth/use-auth'
import { freshFor } from '@/lib/query/cache'
import { queryKeys } from '@/lib/query/keys'

import { Actions, Inner, Page, Panel, Subtitle, Title } from '../access/styled'

export function WaitlistPage() {
  const { t } = useTranslation('dashboard')
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const me = useQuery({
    queryKey: queryKeys.me,
    queryFn: authApi.me,
    // The only screen that legitimately waits on someone else to act.
    staleTime: freshFor.live,
    refetchInterval: 60_000,
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
            <LogoutButton />
          </Actions>
        </Panel>
      </Inner>
    </Page>
  )
}
