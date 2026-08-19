import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'

import { buildUpiLink, useUpiPay } from './helper'
import { Card, Hint, Title, Warning } from './styled'

export interface UpiPayProps {
  vpa: string
  payeeName: string | null
  amount: number
  orderNumber: number
}

export function UpiPay({ vpa, payeeName, amount, orderNumber }: UpiPayProps) {
  const { t } = useTranslation('customer')
  const link = buildUpiLink({
    vpa,
    payeeName,
    amount,
    note: `Order ${orderNumber}`,
  })
  const upi = useUpiPay(link)

  return (
    <Card>
      <Title>{t('pay.title')}</Title>
      <Hint>{t('pay.hint')}</Hint>
      {payeeName && <Hint>{t('pay.payee', { name: payeeName })}</Hint>}
      <Button fullWidth onClick={upi.pay}>
        {t('pay.payAmount', { amount: amount.toLocaleString('en-IN') })}
      </Button>
      {upi.failed && <Warning>{t('pay.noApp')}</Warning>}
    </Card>
  )
}
