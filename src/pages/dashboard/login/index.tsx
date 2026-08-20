import { useTranslation } from 'react-i18next'

import { BrandMark } from '@/components/global/brand-mark'
import { GoogleSignInButton } from '@/components/dashboard/google-sign-in'
import { Button } from '@/components/global/button'
import { TextField } from '@/components/global/field'
import { RouteLoading } from '@/components/global/route-loading'
import { isClerkEnabled } from '@/lib/auth/clerk'
import { useClerkSyncPending } from '@/lib/auth/clerk-sync-state'

import { useClerkEmailAuth } from './clerk-helper'
import { useLoginPage } from './helper'
import {
  Brand,
  CaptchaSlot,
  Divider,
  ErrorBanner,
  Form,
  HomeLink,
  Inner,
  Page,
  Panel,
  Subtitle,
  Switcher,
  Title,
} from './styled'

export function LoginPage() {
  const { t } = useTranslation(['dashboard', 'common'])
  const page = useLoginPage()
  const clerkOn = isClerkEnabled()
  const isRegister = page.isRegister
  const syncing = useClerkSyncPending()

  // Reached only if a guard bounced here while the sign-in was still completing.
  if (syncing) return <RouteLoading label={t('login.googleRedirect')} />

  return (
    <Page>
      <Inner>
        <Panel>
          <Brand>
            <BrandMark size={36} />
            {t('common:appName')}
          </Brand>
          <Title>{isRegister ? t('login.registerTitle') : t('login.title')}</Title>
          <Subtitle>
            {isRegister ? t('login.registerSubtitle') : t('login.subtitle')}
          </Subtitle>
          {page.sessionReplaced && <ErrorBanner>{t('login.sessionReplaced')}</ErrorBanner>}

          {clerkOn ? (
            <ClerkEmailPanel
              key={isRegister ? 'register' : 'login'}
              isRegister={isRegister}
              onToggleMode={page.toggleMode}
            />
          ) : isRegister ? (
            <Form onSubmit={page.onRegister} noValidate>
              {page.registerFailed && (
                <ErrorBanner>{page.registerError || t('login.registerError')}</ErrorBanner>
              )}
              <TextField
                label={t('login.ownerName')}
                autoComplete="name"
                error={page.registerForm.formState.errors.ownerName ? t('login.required') : undefined}
                {...page.registerForm.register('ownerName', { required: true })}
              />
              <TextField
                label={t('login.email')}
                type="email"
                autoComplete="email"
                error={page.registerForm.formState.errors.email ? t('login.required') : undefined}
                {...page.registerForm.register('email', { required: true })}
              />
              <TextField
                label={t('login.phone')}
                type="tel"
                autoComplete="tel"
                error={page.registerForm.formState.errors.phone ? t('phone.error') : undefined}
                {...page.registerForm.register('phone', { required: true, minLength: 8 })}
              />
              <TextField
                label={t('login.password')}
                type="password"
                autoComplete="new-password"
                error={
                  page.registerForm.formState.errors.password ? t('login.passwordShort') : undefined
                }
                {...page.registerForm.register('password', { required: true, minLength: 8 })}
              />
              <Button type="submit" size="lg" fullWidth loading={page.registerPending}>
                {t('login.registerSubmit')}
              </Button>
            </Form>
          ) : (
            <Form onSubmit={page.onLogin} noValidate>
              {page.loginFailed && (
                <ErrorBanner>{page.loginError || t('login.error')}</ErrorBanner>
              )}
              <TextField
                label={t('login.email')}
                type="email"
                autoComplete="email"
                autoFocus
                error={page.loginForm.formState.errors.email ? t('login.required') : undefined}
                {...page.loginForm.register('email', { required: true })}
              />
              <TextField
                label={t('login.password')}
                type="password"
                autoComplete="current-password"
                error={page.loginForm.formState.errors.password ? t('login.required') : undefined}
                {...page.loginForm.register('password', { required: true })}
              />
              <Button type="submit" size="lg" fullWidth loading={page.loginPending}>
                {t('login.submit')}
              </Button>
            </Form>
          )}

          {!clerkOn && (
            <Switcher type="button" onClick={page.toggleMode}>
              {isRegister ? t('login.switchToLogin') : t('login.switchToRegister')}
            </Switcher>
          )}
          <HomeLink to="/">{t('login.backHome')}</HomeLink>
        </Panel>
      </Inner>
    </Page>
  )
}

function ClerkEmailPanel({
  isRegister,
  onToggleMode,
}: {
  isRegister: boolean
  onToggleMode: () => void
}) {
  const { t } = useTranslation('dashboard')
  const auth = useClerkEmailAuth(isRegister)

  const banner =
    auth.error === 'gmail'
      ? t('login.gmailOnly')
      : auth.error === 'exists'
        ? t('login.emailExists')
        : auth.error === 'code'
          ? t('login.codeRequired')
          : auth.error === 'incomplete'
            ? t('login.verifyFailed')
            : auth.error === 'login'
              ? t('login.error')
              : auth.error

  if (auth.step === 'otp') {
    return (
      <Form
        onSubmit={(event) => {
          event.preventDefault()
          void auth.verifyCode()
        }}
        noValidate
      >
        <Subtitle>
          {t('login.otpSubtitle', { email: auth.pendingEmail })}
        </Subtitle>
        {banner && <ErrorBanner>{banner}</ErrorBanner>}
        <TextField
          label={t('login.otp')}
          inputMode="numeric"
          autoComplete="one-time-code"
          autoFocus
          maxLength={6}
          placeholder="123456"
          value={auth.code}
          onChange={(event) => auth.setCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
        />
        <Button type="submit" size="lg" fullWidth loading={auth.busy} disabled={!auth.ready}>
          {t('login.otpSubmit')}
        </Button>
        <Switcher type="button" onClick={() => void auth.resendCode()}>
          {t('login.otpResend')}
        </Switcher>
        <Switcher type="button" onClick={auth.backToForm}>
          {t('login.otpBack')}
        </Switcher>
      </Form>
    )
  }

  return (
    <>
      <GoogleSignInButton
        intent={isRegister ? 'sign-up' : 'sign-in'}
        label={isRegister ? t('login.googleRegister') : t('login.google')}
      />
      <Divider>{t('login.orEmail')}</Divider>
      {isRegister ? (
        <Form onSubmit={auth.startRegister} noValidate>
          {banner && <ErrorBanner>{banner}</ErrorBanner>}
          <TextField
            label={t('login.ownerName')}
            autoComplete="name"
            error={auth.registerForm.formState.errors.ownerName ? t('login.required') : undefined}
            {...auth.registerForm.register('ownerName', { required: true })}
          />
          <TextField
            label={t('login.gmail')}
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@gmail.com"
            error={auth.registerForm.formState.errors.email ? t('login.gmailOnly') : undefined}
            {...auth.registerForm.register('email', {
              required: true,
              validate: (value) =>
                value.toLowerCase().endsWith('@gmail.com') ||
                value.toLowerCase().endsWith('@googlemail.com'),
            })}
          />
          <TextField
            label={t('login.phone')}
            type="tel"
            autoComplete="tel"
            error={auth.registerForm.formState.errors.phone ? t('phone.error') : undefined}
            {...auth.registerForm.register('phone', { required: true, minLength: 8 })}
          />
          <TextField
            label={t('login.password')}
            type="password"
            autoComplete="new-password"
            error={
              auth.registerForm.formState.errors.password ? t('login.passwordShort') : undefined
            }
            {...auth.registerForm.register('password', { required: true, minLength: 8 })}
          />
          <CaptchaSlot id="clerk-captcha" />
          <Button type="submit" size="lg" fullWidth loading={auth.busy} disabled={!auth.ready}>
            {t('login.sendCode')}
          </Button>
        </Form>
      ) : (
        <Form onSubmit={auth.startLogin} noValidate>
          {banner && <ErrorBanner>{banner}</ErrorBanner>}
          <TextField
            label={t('login.email')}
            type="email"
            autoComplete="email"
            autoFocus
            error={auth.loginForm.formState.errors.email ? t('login.required') : undefined}
            {...auth.loginForm.register('email', { required: true })}
          />
          <TextField
            label={t('login.password')}
            type="password"
            autoComplete="current-password"
            error={auth.loginForm.formState.errors.password ? t('login.required') : undefined}
            {...auth.loginForm.register('password', { required: true })}
          />
          <Button type="submit" size="lg" fullWidth loading={auth.busy} disabled={!auth.ready}>
            {t('login.submit')}
          </Button>
        </Form>
      )}
      <Switcher type="button" onClick={onToggleMode}>
        {isRegister ? t('login.switchToLogin') : t('login.switchToRegister')}
      </Switcher>
    </>
  )
}
