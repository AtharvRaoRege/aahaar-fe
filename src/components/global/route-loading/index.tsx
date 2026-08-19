import { Skeleton } from '@/components/global/skeleton'

import { Label, Page, Panel } from './styled'

/**
 * Full-screen hold for a route that cannot decide yet.
 *
 * Used while a sign-in is being exchanged for a session: the alternative is
 * bouncing to the login screen and back, which reads as a bug.
 */
export function RouteLoading({ label }: { label?: string }) {
  return (
    <Page>
      <Panel>
        <Skeleton height="56px" width="56px" />
        <Skeleton height="14px" width="180px" />
        {label && <Label role="status">{label}</Label>}
      </Panel>
    </Page>
  )
}
