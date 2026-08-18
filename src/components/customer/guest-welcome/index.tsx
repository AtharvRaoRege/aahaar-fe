import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'
import { Card, Message, Overlay, Title } from '@/components/global/confirm-dialog/styled'
import { TextField } from '@/components/global/field'

import { useGuestWelcome } from './helper'
import { Failed, Form, Optional } from './styled'

export interface GuestWelcomeProps {
  restaurantName: string
  restaurantId: string
  slug: string
  tableNumber: string
  onReady: () => void
}

export function GuestWelcome({
  restaurantName,
  restaurantId,
  slug,
  tableNumber,
  onReady,
}: GuestWelcomeProps) {
  const { t } = useTranslation(['customer', 'common'])
  const form = useGuestWelcome({ restaurantId, slug, tableNumber, onReady })

  return (
    <Overlay role="dialog" aria-modal="true" aria-labelledby="guest-welcome-title">
      <Card>
        <Title id="guest-welcome-title">{t('welcome.greet', { name: restaurantName })}</Title>
        <Message>{t('welcome.greetHint')}</Message>
        <Message>{t('welcome.table', { table: tableNumber })}</Message>
        <Form onSubmit={form.onSubmit}>
          <TextField
            label={t('welcome.name')}
            placeholder={t('welcome.namePlaceholder')}
            autoComplete="name"
            autoFocus
            value={form.name}
            error={form.nameError ? t('welcome.nameRequired') : undefined}
            onChange={(event) => form.setName(event.target.value)}
          />
          <TextField
            label={t('welcome.contact')}
            placeholder={t('welcome.contactPlaceholder')}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.contactNumber}
            onChange={(event) => form.setContactNumber(event.target.value)}
          />
          <Optional>{t('welcome.contactHint')}</Optional>
          {form.failed && <Failed>{t('welcome.failed')}</Failed>}
          <Button type="submit" fullWidth loading={form.submitting}>
            {t('welcome.start')}
          </Button>
        </Form>
      </Card>
    </Overlay>
  )
}
