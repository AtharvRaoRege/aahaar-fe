import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'

import { useGoogleSignIn } from './helper'
import { ErrorText } from './styled'

export function GoogleSignInButton({
  label,
  intent = 'sign-in',
}: {
  label?: string
  intent?: 'sign-in' | 'sign-up'
}) {
  const { t } = useTranslation('dashboard')
  const { startGoogle, pending, failed, ready } = useGoogleSignIn(intent)

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="lg"
        fullWidth
        disabled={!ready}
        loading={pending}
        onClick={startGoogle}
      >
        {label ?? t('login.google')}
      </Button>
      {failed && <ErrorText>{t('login.googleError')}</ErrorText>}
    </>
  )
}
