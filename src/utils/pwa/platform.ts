export function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: minimal-ui)').matches ||
    Boolean((navigator as Navigator & { standalone?: boolean }).standalone)
  )
}

export function isIos(): boolean {
  return /iphone|ipad|ipod/i.test(navigator.userAgent)
}

export function isAndroid(): boolean {
  return /android/i.test(navigator.userAgent)
}

export function canUseWebPush(): boolean {
  return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window
}

export function iosNeedsHomeScreen(): boolean {
  return isIos() && !isStandalone()
}
