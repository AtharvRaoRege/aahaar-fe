import { useCallback, useState } from 'react'

/** One question open at a time, exactly like the source page. */
export function useAccordion() {
  const [openKey, setOpenKey] = useState<string | null>(null)

  const toggle = useCallback((key: string) => {
    setOpenKey((current) => (current === key ? null : key))
  }, [])

  return { openKey, toggle }
}
