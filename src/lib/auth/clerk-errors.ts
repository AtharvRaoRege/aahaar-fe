export function clerkErrorMessage(error: unknown, fallback = 'Something went wrong. Try again.') {
  if (!error || typeof error !== 'object') return fallback
  const record = error as {
    longMessage?: string
    message?: string
    errors?: Array<{ longMessage?: string; message?: string }>
  }
  if (record.longMessage) return record.longMessage
  if (record.message) return record.message
  const first = record.errors?.[0]
  if (first?.longMessage) return first.longMessage
  if (first?.message) return first.message
  if (error instanceof Error && error.message) return error.message
  return fallback
}

export function clerkErrorCode(error: unknown): string {
  if (!error || typeof error !== 'object') return ''
  const record = error as { code?: string; errors?: Array<{ code?: string }> }
  if (typeof record.code === 'string' && record.code) return record.code
  return record.errors?.[0]?.code ?? ''
}

export function isGmailAddress(email: string): boolean {
  const domain = email.trim().toLowerCase().split('@').at(-1) ?? ''
  return domain === 'gmail.com' || domain === 'googlemail.com'
}

export function splitOwnerName(fullName: string): { firstName: string; lastName?: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  const firstName = parts[0] ?? 'Owner'
  const lastName = parts.slice(1).join(' ')
  return lastName ? { firstName, lastName } : { firstName }
}
