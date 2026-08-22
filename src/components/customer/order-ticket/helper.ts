export type OrderTicketLine = {
  id: string
  label: string
  amount: string
}

export type OrderTicketProps = {
  head: string
  lines: OrderTicketLine[]
  note?: string | null
  discountLabel?: string | null
  discountAmount?: string | null
  totalLabel: string
  totalAmount: string
  stamp: string
}
