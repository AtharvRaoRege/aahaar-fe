import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { authApi } from '@/lib/api/auth'
import { staffHomePath } from '@/lib/auth/staff-home'
import { consumeSessionReplaced } from '@/lib/auth/local-session'
import { adoptSession } from '@/lib/auth/session-sync'
import { useAuth } from '@/lib/auth/use-auth'
import { errorMessage } from '@/utils/error-message'

export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  ownerName: string
  email: string
  phone: string
  password: string
}

export function useLoginPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const { isAuthenticated, user } = useAuth()
  const [sessionReplaced] = useState(() => consumeSessionReplaced())
  const [mode, setMode] = useState<'login' | 'register'>(() =>
    searchParams.get('mode') === 'register' ? 'register' : 'login',
  )

  useEffect(() => {
    if (isAuthenticated && user) navigate(staffHomePath(user), { replace: true })
  }, [isAuthenticated, user, navigate])

  const loginForm = useForm<LoginForm>({
    defaultValues: { email: '', password: '' },
  })
  const registerForm = useForm<RegisterForm>({
    defaultValues: { ownerName: '', email: '', phone: '', password: '' },
  })

  const loginMutation = useMutation({
    mutationFn: (values: LoginForm) => authApi.login(values),
    onSuccess: (result) => {
      adoptSession(queryClient, result.user, result.tokens)
      navigate(staffHomePath(result.user), { replace: true })
    },
  })

  const registerMutation = useMutation({
    mutationFn: (values: RegisterForm) => authApi.register(values),
    onSuccess: (result) => {
      adoptSession(queryClient, result.user, result.tokens)
      navigate(staffHomePath(result.user), { replace: true })
    },
  })

  return {
    isRegister: mode === 'register',
    sessionReplaced,
    toggleMode: () => setMode((current) => (current === 'login' ? 'register' : 'login')),
    loginForm,
    registerForm,
    onLogin: loginForm.handleSubmit((values) => loginMutation.mutate(values)),
    onRegister: registerForm.handleSubmit((values) => registerMutation.mutate(values)),
    loginPending: loginMutation.isPending,
    registerPending: registerMutation.isPending,
    loginFailed: loginMutation.isError,
    loginError: loginMutation.isError ? errorMessage(loginMutation.error) : '',
    registerFailed: registerMutation.isError,
    registerError: registerMutation.isError ? errorMessage(registerMutation.error) : '',
  }
}
