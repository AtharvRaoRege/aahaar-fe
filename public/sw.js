const CACHE = 'aahaar-shell-v7'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(['/', '/manifest.webmanifest'])),
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))),
    ),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.pathname.startsWith('/api') || url.pathname.startsWith('/socket.io')) return

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('/') || caches.match('/index.html')),
    )
  }
})

self.addEventListener('push', (event) => {
  let payload = {}
  try {
    payload = event.data ? event.data.json() : {}
  } catch {
    payload = { body: event.data ? event.data.text() : '' }
  }

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      const focused = clients.some((client) => client.focused && client.url.includes('/dashboard'))
      if (focused) {
        clients.forEach((client) => client.postMessage(payload))
        return undefined
      }
      const title = payload.title || 'Aahaar'
      return self.registration.showNotification(title, {
        body: payload.body || '',
        icon: '/icons/pwa-192.png',
        badge: '/icons/pwa-192.png',
        tag: payload.tag || 'aahaar',
        renotify: true,
        vibrate: [90, 40, 90, 40, 160],
        data: { url: payload.url || '/dashboard' },
      })
    }),
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const target = (event.notification.data && event.notification.data.url) || '/dashboard'
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      const existing = clients.find((client) => 'focus' in client)
      if (existing) {
        return existing.focus().then((client) => {
          if (client && 'navigate' in client) return client.navigate(target)
          return client
        })
      }
      return self.clients.openWindow(target)
    }),
  )
})
