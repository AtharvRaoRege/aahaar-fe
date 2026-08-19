/**
 * Where the backend lives.
 *
 * In development both of these stay relative, because the Vite dev server
 * proxies `/api` and `/socket.io` to the local API. In production there is no
 * proxy in front of a static host, so the deployed app is pointed straight at
 * the API's own origin and the backend allows it through `CORS_ORIGINS`.
 *
 * Pointing the socket at the API directly matters more than it looks: a static
 * host's rewrite rules can forward plain HTTP but not a WebSocket upgrade, so a
 * proxied socket would silently fall back to long-polling.
 */
const trimEnd = (value: string): string => value.replace(/\/+$/, '')

const apiOrigin = trimEnd((import.meta.env.VITE_API_ORIGIN ?? '').trim())

/** Base for every REST call. Relative in dev, absolute in production. */
export const API_BASE = apiOrigin ? `${apiOrigin}/api/v1` : '/api/v1'

/** Origin the Socket.IO client dials. `/` means "same origin as this page". */
export const SOCKET_ORIGIN = apiOrigin || '/'
