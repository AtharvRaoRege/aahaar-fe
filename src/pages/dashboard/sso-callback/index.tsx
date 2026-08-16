import { AuthenticateWithRedirectCallback } from '@clerk/react'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'

import { isClerkEnabled } from '@/lib/auth/clerk'

import { Centered, Page, Title } from './styled'

export function SsoCallbackPage() {
  const { t } = useTranslation('dashboard')
  if (!isClerkEnabled()) {
    return <Navigate to="/dashboard/login" replace />
  }
  return (
    <Page>
      <Centered>
        <Title>{t('login.googleRedirect')}</Title>
        <AuthenticateWithRedirectCallback
          signInFallbackRedirectUrl="/dashboard"
          signUpFallbackRedirectUrl="/dashboard"
          signInForceRedirectUrl="/dashboard"
          signUpForceRedirectUrl="/dashboard"
        />
      </Centered>
    </Page>
  )
}
