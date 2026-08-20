import { useTranslation } from 'react-i18next'

/**
 * Feature bullets live in the translation file as an array, so a plan can gain or
 * lose a line without a code change.
 */
export function usePlanFeatures(plan: 'basic' | 'pro'): string[] {
  const { t } = useTranslation('common')
  const value = t(`landing.pricing.${plan}.features`, { returnObjects: true })
  return Array.isArray(value) ? (value as string[]) : []
}
