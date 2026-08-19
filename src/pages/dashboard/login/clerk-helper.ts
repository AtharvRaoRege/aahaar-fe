import { useState } from 'react'
import { useAuth as useClerkAuth, useClerk, useSignIn, useSignUp } from '@clerk/react'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { authApi } from '@/lib/api/auth'
import {
  clerkErrorCode,
  clerkErrorMessage,
  isGmailAddress,
  splitOwnerName,
} from '@/lib/auth/clerk-errors'
import { adoptSession } from '@/lib/auth/session-sync'
import { staffHomePath } from '@/lib/auth/staff-home'
import { errorMessage } from '@/utils/error-message'

import type { LoginForm, RegisterForm } from './helper'

export type ClerkAuthStep = 'form' | 'otp'

export function useClerkEmailAuth(isRegister: boolean) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { signUp, fetchStatus: signUpFetch } = useSignUp()
  const { signIn, fetchStatus: signInFetch } = useSignIn()
  const { getToken } = useClerkAuth()
  const clerk = useClerk()
  const [step, setStep] = useState<ClerkAuthStep>('form')
  const [pendingEmail, setPendingEmail] = useState('')
  const [pendingPhone, setPendingPhone] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const registerForm = useForm<RegisterForm>({
    defaultValues: { ownerName: '', email: '', phone: '', password: '' },
  })
  const loginForm = useForm<LoginForm>({
    defaultValues: { email: '', password: '' },
  })

  const fetching = (isRegister ? signUpFetch : signInFetch) === 'fetching'
  const ready = Boolean(isRegister ? signUp : signIn)

  const finishSession = async (phone?: string) => {
    const token = (await clerk.session?.getToken()) ?? (await getToken())
    if (!token) throw new Error('missing clerk token')
    const result = await authApi.syncClerk(token)
    if (phone?.trim()) {
      const user = await authApi.updateMe({ phone: phone.trim() })
      adoptSession(queryClient, user, result.tokens)
      navigate(staffHomePath(user), { replace: true })
    } else {
      adoptSession(queryClient, result.user, result.tokens)
      navigate(staffHomePath(result.user), { replace: true })
    }
  }

  const startRegister = registerForm.handleSubmit(async (values) => {
    if (!signUp) return
    setError('')
    const email = values.email.trim().toLowerCase()
    if (!isGmailAddress(email)) {
      setError('gmail')
      return
    }
    setBusy(true)
    try {
      const names = splitOwnerName(values.ownerName)
      const created = await signUp.password({
        emailAddress: email,
        password: values.password,
        firstName: names.firstName,
        lastName: names.lastName,
      })
      if (created.error) {
        const code = clerkErrorCode(created.error)
        setError(code === 'form_identifier_exists' ? 'exists' : clerkErrorMessage(created.error))
        return
      }
      if (signUp.status === 'complete') {
        const finalized = await signUp.finalize()
        if (finalized.error) {
          setError(clerkErrorMessage(finalized.error))
          return
        }
        await finishSession(values.phone)
        return
      }
      const sent = await signUp.verifications.sendEmailCode()
      if (sent.error) {
        setError(clerkErrorMessage(sent.error))
        return
      }
      setPendingEmail(email)
      setPendingPhone(values.phone.trim())
      setStep('otp')
    } catch (caught) {
      const code = clerkErrorCode(caught)
      setError(code === 'form_identifier_exists' ? 'exists' : clerkErrorMessage(caught))
    } finally {
      setBusy(false)
    }
  })

  const verifyCode = async () => {
    if (!signUp) return
    const trimmed = code.trim()
    if (trimmed.length < 6) {
      setError('code')
      return
    }
    setError('')
    setBusy(true)
    try {
      const verified = await signUp.verifications.verifyEmailCode({ code: trimmed })
      if (verified.error) {
        setError(clerkErrorMessage(verified.error, 'That code did not match. Try again.'))
        return
      }
      if (signUp.status === 'complete') {
        const finalized = await signUp.finalize()
        if (finalized.error) {
          setError(clerkErrorMessage(finalized.error))
          return
        }
        await finishSession(pendingPhone)
        return
      }
      setError('incomplete')
    } catch (caught) {
      setError(clerkErrorMessage(caught, 'That code did not match. Try again.'))
    } finally {
      setBusy(false)
    }
  }

  const resendCode = async () => {
    if (!signUp) return
    setError('')
    setBusy(true)
    try {
      const sent = await signUp.verifications.sendEmailCode()
      if (sent.error) setError(clerkErrorMessage(sent.error))
    } catch (caught) {
      setError(clerkErrorMessage(caught))
    } finally {
      setBusy(false)
    }
  }

  const startLogin = loginForm.handleSubmit(async (values) => {
    setError('')
    setBusy(true)
    try {
      if (signIn) {
        const result = await signIn.password({
          identifier: values.email.trim(),
          password: values.password,
        })
        if (!result.error && signIn.status === 'complete') {
          const finalized = await signIn.finalize()
          if (finalized.error) {
            setError(clerkErrorMessage(finalized.error))
            return
          }
          await finishSession()
          return
        }
        const code = clerkErrorCode(result.error)
        if (code === 'form_password_incorrect') {
          setError('login')
          return
        }
        if (code && code !== 'form_identifier_not_found') {
          setError(clerkErrorMessage(result.error))
          return
        }
      }
      const result = await authApi.login({
        email: values.email.trim(),
        password: values.password,
      })
      adoptSession(queryClient, result.user, result.tokens)
      navigate(staffHomePath(result.user), { replace: true })
    } catch (caught) {
      setError(errorMessage(caught) || 'login')
    } finally {
      setBusy(false)
    }
  })

  const backToForm = () => {
    void signUp?.reset()
    setStep('form')
    setCode('')
    setError('')
  }

  return {
    ready,
    step,
    pendingEmail,
    code,
    setCode,
    error,
    busy: busy || fetching,
    registerForm,
    loginForm,
    startRegister,
    startLogin,
    verifyCode,
    resendCode,
    backToForm,
  }
}
