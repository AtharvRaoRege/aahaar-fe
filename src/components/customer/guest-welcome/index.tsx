import { useTranslation } from 'react-i18next'

import { VenueHero } from '@/components/customer/venue-hero'
import { Button } from '@/components/global/button'
import { TextField } from '@/components/global/field'
import type { PublicRestaurant } from '@/types/restaurant'

import { useGuestWelcome } from './helper'
import { Card, Failed, Form, Optional, Panel, Prompt, Screen } from './styled'

export interface GuestWelcomeProps {
  restaurant: PublicRestaurant
  tableNumber: string
  onReady: () => void
}

/**
 * Arrival screen for a diner who just scanned a table QR.
 *
 * The venue leads — they scanned a code on a physical table and need to see they
 * are in the right place — then we ask for a name so the kitchen knows who
 * ordered. Deliberately a page, not a dialog: nothing is being interrupted.
 */
export function GuestWelcome({ restaurant, tableNumber, onReady }: GuestWelcomeProps) {
  const { t } = useTranslation(['customer', 'common'])
  const form = useGuestWelcome({
    restaurantId: restaurant.id,
    slug: restaurant.slug,
    tableNumber,
    onReady,
  })

  return (
    <Screen>
      <VenueHero
        restaurant={restaurant}
        tableLabel={t('welcome.table', { table: tableNumber })}
      />

      <Panel>
        <Card>
          <Prompt>{t('welcome.greetHint')}</Prompt>
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
            <Button type="submit" size="lg" fullWidth loading={form.submitting}>
              {t('welcome.start')}
            </Button>
          </Form>
        </Card>
      </Panel>
    </Screen>
  )
}
