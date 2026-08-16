export function errorMessage(error: unknown, fallback = 'Something went wrong. Try again.') {
  if (error instanceof Error && error.message) return error.message
  return fallback
}
