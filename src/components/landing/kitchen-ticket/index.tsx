import { useTranslation } from 'react-i18next'

import { PrinterArt } from '@/components/landing/art'
import { LineIcon } from '@/components/landing/icons'
import { Doodle, Eyebrow, GhostType } from '@/components/landing/kit/styled'
import { TICKET_LINES } from '@/constants/landing'
import { useReveal } from '@/hooks/landing/use-reveal/helper'

import {
  Bar,
  Dot,
  Flow,
  Printer,
  Section,
  Stamp,
  Ticket,
  TicketHead,
  TicketRow,
  TicketTotal,
  Title,
} from './styled'

export function KitchenTicket() {
  const { t } = useTranslation('common')
  const { ref: ticketRef, shown: ticketShown } = useReveal<HTMLDivElement>({ amount: 0.3 })
  const { ref: flowRef, shown: flowShown } = useReveal<HTMLDivElement>({ amount: 0.6 })

  return (
    <Section>
      <GhostType $tone="paper" $top="2%" $left="-8%" aria-hidden>
        {t('landing.kitchen.ghost')}
      </GhostType>
      <Doodle $size={34} $tone="paper" $float="a" $top="8%" $left="10%" $fade={0.35} aria-hidden>
        <LineIcon name="steam" />
      </Doodle>
      <Doodle $size={26} $tone="turmeric" $float="b" $top="10%" $right="12%" aria-hidden>
        <LineIcon name="bellPlain" />
      </Doodle>

      <Eyebrow $tone="turmeric">{t('landing.kitchen.eyebrow')}</Eyebrow>
      <Title>
        {t('landing.kitchen.titleTop')}
        <br />
        {t('landing.kitchen.titleBottom')}
      </Title>

      <Printer aria-hidden>
        <PrinterArt />
      </Printer>

      <Ticket ref={ticketRef} $in={ticketShown}>
        <TicketHead>{t('landing.kitchen.ticketHead')}</TicketHead>
        {TICKET_LINES.map((line, index) => (
          <TicketRow key={line} $in={ticketShown} $delay={index * 200}>
            <span>{t(`landing.kitchen.items.${line}.label`)}</span>
            <span>{t(`landing.kitchen.items.${line}.price`)}</span>
          </TicketRow>
        ))}
        <TicketRow $in={ticketShown} $delay={TICKET_LINES.length * 200}>
          <span>{t('landing.kitchen.ticketNote')}</span>
          <span />
        </TicketRow>
        <TicketTotal>
          <span>{t('landing.kitchen.ticketTotal')}</span>
          <span>{t('landing.kitchen.totalValue')}</span>
        </TicketTotal>
        <Stamp $in={ticketShown}>{t('landing.kitchen.ticketStamp')}</Stamp>
      </Ticket>

      <Flow ref={flowRef} role="img" aria-label={t('landing.kitchen.flowLabel')}>
        <Dot $in={flowShown} $skin="turmeric" $delay={0} />
        <Bar />
        <Dot $in={flowShown} $skin="turmeric" $delay={600} />
        <Bar />
        <Dot $in={flowShown} $skin="mint" $delay={1200} />
      </Flow>
    </Section>
  )
}
