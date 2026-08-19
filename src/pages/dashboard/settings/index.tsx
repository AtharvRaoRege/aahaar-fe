import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { InstallApp } from '@/components/dashboard/install-app'
import { PublishBar } from '@/components/dashboard/publish-bar'
import { VenueSwitcher } from '@/components/dashboard/venue-switcher'
import { Button } from '@/components/global/button'
import { FormField, TextArea, TextField } from '@/components/global/field'
import { Select } from '@/components/global/select'
import { useDashboardContext } from '@/hooks/dashboard/context'
import type { Restaurant } from '@/types/restaurant'

import { useSettingsPage } from './helper'
import {
  Banner,
  Card,
  CardHint,
  CardTitle,
  Column,
  Form,
  Hint,
  LinkRow,
  Modal,
  ModalActions,
  ModalForm,
  ModalTitle,
  Overlay,
  Page,
  Pair,
  SaveBar,
  Sections,
  Slug,
  SwitchRow,
  Title,
  Wide,
} from './styled'

const VENUE_KIND_KEYS = ['RESTAURANT', 'HOTEL', 'CAFE'] as const

export function SettingsPage() {
  const { restaurant } = useDashboardContext()
  if (!restaurant) return null
  return <SettingsBody restaurant={restaurant} />
}

function SettingsBody({ restaurant }: { restaurant: Restaurant }) {
  const { t } = useTranslation(['dashboard', 'common'])
  const page = useSettingsPage(restaurant)
  const venueOptions = page.venues.some((venue) => venue.id === restaurant.id)
    ? page.venues
    : [restaurant, ...page.venues]
  const kindOptions = VENUE_KIND_KEYS.map((value) => ({
    value,
    label: t(`setup.${value.toLowerCase()}`),
  }))

  return (
    <Page>
      <Title>{t('settings.title')}</Title>
      <Hint>{t('settings.hint')}</Hint>

      <Wide>
        <PublishBar restaurantId={restaurant.id} />
      </Wide>

      <Sections>
        <Form onSubmit={page.onSubmit}>
          {page.saved && <Banner $tone="ok">{t('settings.saved')}</Banner>}
          {page.failed && (
            <Banner $tone="err">{page.failMessage || t('settings.saveFailed')}</Banner>
          )}

          <Card>
            <CardTitle>{t('settings.detailsTitle')}</CardTitle>
            <CardHint>{t('settings.detailsHint')}</CardHint>
            <TextField
              label={t('settings.name')}
              error={page.form.formState.errors.name ? t('login.required') : undefined}
              {...page.form.register('name', { required: true })}
            />
            <Pair>
              <FormField label={t('settings.kind')}>
                <Select
                  value={page.venueKind}
                  options={kindOptions}
                  onChange={page.setVenueKind}
                />
              </FormField>
              <TextField label={t('settings.phone')} {...page.form.register('phone')} />
            </Pair>
            <TextArea label={t('settings.address')} {...page.form.register('address')} />
          </Card>

          <Card>
            <CardTitle>{t('settings.findUsTitle')}</CardTitle>
            <CardHint>{t('settings.findUsHint')}</CardHint>
            <TextField
              label={t('settings.mapsUrl')}
              placeholder="https://maps.app.goo.gl/…"
              {...page.form.register('mapsUrl')}
            />
            <TextField
              label={t('settings.googleReviewUrl')}
              placeholder="https://g.page/r/…/review"
              {...page.form.register('googleReviewUrl')}
            />
          </Card>

          <Card>
            <CardTitle>{t('settings.paymentsTitle')}</CardTitle>
            <CardHint>{t('settings.paymentsHint')}</CardHint>
            <Pair>
              <TextField
                label={t('settings.upiVpa')}
                placeholder="name@bank"
                {...page.form.register('upiVpa')}
              />
              <TextField
                label={t('settings.upiPayeeName')}
                {...page.form.register('upiPayeeName')}
              />
            </Pair>
          </Card>

          <Card>
            <CardTitle>{t('settings.serviceTitle')}</CardTitle>
            <CardHint>{t('settings.serviceHint')}</CardHint>
            <SwitchRow>
              <input type="checkbox" {...page.form.register('waiterCallEnabled')} />
              {t('settings.waiterCall')}
            </SwitchRow>
          </Card>

          <SaveBar>
            <Button type="submit" size="lg" loading={page.saving}>
              {t('common:actions.save')}
            </Button>
          </SaveBar>
        </Form>

        <Column>
          <Card>
            <CardTitle>{t('settings.linkTitle')}</CardTitle>
            <CardHint>{t('settings.linkHint')}</CardHint>
            <Slug>{page.publicUrl}</Slug>
            <LinkRow>
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => void page.copyLink()}
              >
                {page.copied ? t('settings.copied') : t('settings.copyLink')}
              </Button>
            </LinkRow>
            {page.copyFailed && <CardHint>{t('settings.copyFailed')}</CardHint>}
          </Card>

          <Card>
            <CardTitle>{t('settings.switchVenue')}</CardTitle>
            <CardHint>{t('settings.venuesHint')}</CardHint>
            <VenueSwitcher
              restaurants={venueOptions}
              current={restaurant}
              impersonating={page.impersonating}
              onSelect={page.switchVenue}
            />
            <LinkRow>
              <Button
                variant="outline"
                size="sm"
                type="button"
                leftIcon={<Plus aria-hidden />}
                onClick={page.openAdd}
              >
                {t('settings.addVenue')}
              </Button>
            </LinkRow>
          </Card>

          <InstallApp restaurantId={restaurant.id} />

          <Card>
            <CardTitle>{t('settings.planTitle')}</CardTitle>
            <CardHint>{t('settings.planHint')}</CardHint>
            <LinkRow>
              <Link to="/dashboard/plan">
                <Button variant="outline" size="sm" type="button">
                  {t('settings.openPlan')}
                </Button>
              </Link>
            </LinkRow>
          </Card>
        </Column>
      </Sections>

      {page.addOpen &&
        createPortal(
          <Overlay onClick={page.closeAdd} role="presentation">
            <Modal
              role="dialog"
              aria-modal="true"
              aria-labelledby="add-venue-title"
              onClick={(event) => event.stopPropagation()}
            >
              <ModalTitle id="add-venue-title">{t('settings.addTitle')}</ModalTitle>
              <ModalForm onSubmit={page.onAddVenue}>
                {page.addError && <CardHint>{page.addError || t('setup.error')}</CardHint>}
                <FormField label={t('setup.kind')}>
                  <Select
                    value={page.addVenueKind}
                    options={kindOptions}
                    onChange={page.setAddVenueKind}
                  />
                </FormField>
                <TextField
                  label={t('setup.name')}
                  placeholder={t('setup.nameHint')}
                  autoFocus
                  error={page.addForm.formState.errors.name ? t('login.required') : undefined}
                  {...page.addForm.register('name', { required: true, minLength: 2 })}
                />
                <ModalActions>
                  <Button type="button" variant="outline" onClick={page.closeAdd}>
                    {t('common:actions.cancel')}
                  </Button>
                  <Button type="submit" loading={page.adding}>
                    {t('setup.submit')}
                  </Button>
                </ModalActions>
              </ModalForm>
            </Modal>
          </Overlay>,
          document.body,
        )}
    </Page>
  )
}
