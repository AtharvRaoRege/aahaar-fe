import { useEffect } from 'react'
import type { NavigateFunction } from 'react-router-dom'

import { proUpgradeStore, showProUpgrade } from '@/lib/dashboard/pro-upgrade-store'

export function closeProUpgrade() {
  proUpgradeStore.hide()
}

export function goToProPlan(navigate: NavigateFunction) {
  proUpgradeStore.hide()
  void navigate('/dashboard/plan')
}

/** Listen for API-side Pro denials while this modal host is mounted. */
export function useProUpgradeFromApi() {
  useEffect(() => {
    const onUpgrade = () => showProUpgrade()
    window.addEventListener('aahaar:pro-upgrade', onUpgrade)
    return () => window.removeEventListener('aahaar:pro-upgrade', onUpgrade)
  }, [])
}
