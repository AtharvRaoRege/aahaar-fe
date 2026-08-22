import { PrinterArt } from '@/components/landing/art'

import type { OrderTicketProps } from './helper'
import {
  Printer,
  Stage,
  Stamp,
  Ticket,
  TicketHead,
  TicketNote,
  TicketRow,
  TicketTotal,
} from './styled'

export function OrderTicket({
  head,
  lines,
  note,
  discountLabel,
  discountAmount,
  totalLabel,
  totalAmount,
  stamp,
}: OrderTicketProps) {
  return (
    <Stage>
      <Printer aria-hidden>
        <PrinterArt />
      </Printer>
      <Ticket>
        <TicketHead>{head}</TicketHead>
        {lines.map((line) => (
          <TicketRow key={line.id}>
            <span>{line.label}</span>
            <span>{line.amount}</span>
          </TicketRow>
        ))}
        {note ? (
          <TicketNote>
            <span>{note}</span>
            <span />
          </TicketNote>
        ) : null}
        {discountLabel && discountAmount ? (
          <TicketRow>
            <span>{discountLabel}</span>
            <span>{discountAmount}</span>
          </TicketRow>
        ) : null}
        <TicketTotal>
          <span>{totalLabel}</span>
          <span>{totalAmount}</span>
        </TicketTotal>
        <Stamp>{stamp}</Stamp>
      </Ticket>
    </Stage>
  )
}
