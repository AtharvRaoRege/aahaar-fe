import { Button } from '@/components/global/button'

import { Bar, Meta } from './styled'

export function PaginationBar({
  page,
  pages,
  total,
  pageSize,
  onPage,
  rangeLabel,
  prevLabel,
  nextLabel,
}: {
  page: number
  pages: number
  total: number
  pageSize: number
  onPage: (page: number) => void
  rangeLabel: string
  prevLabel: string
  nextLabel: string
}) {
  if (total <= pageSize) return null
  return (
    <Bar>
      <Meta>{rangeLabel}</Meta>
      <div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
        >
          {prevLabel}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={page >= pages}
          onClick={() => onPage(page + 1)}
        >
          {nextLabel}
        </Button>
      </div>
    </Bar>
  )
}
