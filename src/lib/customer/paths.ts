export function customerPath(
  slug: string,
  path: string,
  table?: string | null,
) {
  const base = `/r/${slug}${path}`
  if (!table) return base
  return `${base}?table=${encodeURIComponent(table)}`
}
