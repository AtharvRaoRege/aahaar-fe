import { useEffect } from 'react'

import type { BrandPalette } from '@/utils/theme/brand-palette'
import { brandCssVars, buildBrandPalette } from '@/utils/theme/brand-palette'

/** Push brand tokens onto `:root` so portaled UI (modals, sheets, menus) inherits them. */
export function applyBrandToDocument(primaryColor: string | null | undefined) {
  const palette = buildBrandPalette(primaryColor)
  const root = document.documentElement
  const vars = brandCssVars(palette)
  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value)
  }
  root.dataset.brandPrimary = palette.primary
  return palette
}

export function clearBrandFromDocument() {
  const root = document.documentElement
  for (const key of Object.keys(brandCssVars(buildBrandPalette(null)))) {
    root.style.removeProperty(key)
  }
  delete root.dataset.brandPrimary
}

export function useDocumentBrand(primaryColor: string | null | undefined): BrandPalette {
  const palette = buildBrandPalette(primaryColor)

  useEffect(() => {
    applyBrandToDocument(primaryColor)
    return () => {
      clearBrandFromDocument()
    }
  }, [primaryColor])

  return palette
}
