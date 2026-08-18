import { ArrowRight } from 'lucide-react'

import type { OpenOrderBannerProps } from './helper'
import { Action, Banner, Copy, Kicker, Meta, Title } from './styled'

export function OpenOrderBanner({
  orderNumber,
  statusLabel,
  onOpen,
  trackLabel,
  liveLabel,
}: OpenOrderBannerProps) {
  return (
    <Banner type="button" onClick={onOpen}>
      <Copy>
        <Kicker>{liveLabel}</Kicker>
        <Title>
          #{orderNumber} · {statusLabel}
        </Title>
        <Meta>{trackLabel}</Meta>
      </Copy>
      <Action>
        <ArrowRight aria-hidden />
      </Action>
    </Banner>
  )
}
