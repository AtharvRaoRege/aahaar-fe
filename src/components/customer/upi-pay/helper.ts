import { useState } from 'react'

/**
 * Builds a UPI intent link so the diner pays from their own app.
 *
 * No gateway, no card data, nothing sensitive on our servers — the amount and
 * payee are simply handed to the installed UPI app (PRD §34: payment details
 * never touch this codebase).
 */
export function buildUpiLink(params: {
  vpa: string
  payeeName: string | null
  amount: number
  note: string
}): string {
  const query = new URLSearchParams({
    pa: params.vpa,
    pn: params.payeeName || params.vpa,
    am: params.amount.toFixed(2),
    cu: 'INR',
    tn: params.note,
  })
  return `upi://pay?${query.toString()}`
}

export function useUpiPay(link: string) {
  const [failed, setFailed] = useState(false)

  return {
    failed,
    pay: () => {
      try {
        window.location.href = link
      } catch {
        setFailed(true)
      }
    },
  }
}
