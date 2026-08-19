import { Skeleton } from '@/components/global/skeleton'

import { Cards, Head, Wrap } from './styled'

/**
 * Stand-in for a dashboard screen whose venue is still resolving.
 *
 * These screens used to `return null`, which paints a blank panel — an empty box
 * is indistinguishable from "there is nothing here", so it reads as broken rather
 * than busy.
 */
export function PageSkeleton({ cards = 3 }: { cards?: number }) {
  return (
    <Wrap>
      <Head>
        <Skeleton height="32px" width="220px" />
        <Skeleton height="14px" width="320px" />
      </Head>
      <Cards>
        {Array.from({ length: cards }).map((_, index) => (
          <Skeleton key={index} height="160px" />
        ))}
      </Cards>
    </Wrap>
  )
}
