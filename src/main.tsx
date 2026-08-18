import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/700.css'

import { App } from '@/App'
import '@/i18n'
import { ClerkSessionBridge } from '@/lib/auth/clerk-session-bridge'
import { clerkPublishableKey, clerkRedirectOrigins, isClerkEnabled } from '@/lib/auth/clerk'
import { queryClient } from '@/lib/query/client'
import { GlobalStyle } from '@/styles/global'
import { theme } from '@/styles/theme'
import { captureInstallPrompt } from '@/lib/pwa/install-store'

export function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          {isClerkEnabled() && <ClerkSessionBridge />}
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

captureInstallPrompt()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isClerkEnabled() ? (
      <ClerkProvider
        publishableKey={clerkPublishableKey()}
        afterSignOutUrl="/dashboard/login"
        signInUrl="/dashboard/login"
        signUpUrl="/dashboard/login"
        signInFallbackRedirectUrl="/dashboard"
        signUpFallbackRedirectUrl="/dashboard"
        allowedRedirectOrigins={clerkRedirectOrigins()}
      >
        <Root />
      </ClerkProvider>
    ) : (
      <Root />
    )}
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    void navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' })
  })
}
