export function isClerkEnabled(): boolean {
  const key = clerkPublishableKey()
  return key.startsWith('pk_')
}

export function clerkPublishableKey(): string {
  return (import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ?? '').trim()
}

export function clerkRedirectOrigins(): string[] {
  const fromEnv = (import.meta.env.VITE_APP_ORIGIN ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
  const current = typeof window === 'undefined' ? '' : window.location.origin
  return [...new Set(['http://localhost:5174', 'http://localhost:5173', ...fromEnv, current].filter(Boolean))]
}

export async function signOutClerk(): Promise<void> {
  const clerk = (window as unknown as { Clerk?: { signOut?: () => Promise<unknown> } }).Clerk
  if (clerk?.signOut) {
    await clerk.signOut()
  }
}
