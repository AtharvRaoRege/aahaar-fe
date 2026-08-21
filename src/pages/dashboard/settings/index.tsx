import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { InstallApp } from '@/components/dashboard/install-app'
import { BrandThemeSettings } from '@/components/dashboard/brand-theme'
import { LogoutButton } from '@/components/dashboard/logout-confirm'
import { PublishBar } from '@/components/dashboard/publish-bar'
import { VenueScreen } from '@/components/dashboard/venue-screen'
import { VenueSwitcher } from '@/components/dashboard/venue-switcher'
import { ActionMenu } from '@/components/global/action-menu'
import { Button } from '@/components/global/button'
import { FormField, TextArea, TextField } from '@/components/global/field'
import { Select } from '@/components/global/select'
import type { Restaurant } from '@/types/restaurant'

import { linkActions, useSettingsPage } from './helper'
import {
  Banner,
  Card,
  CardHint,
  CardTitle,
  Form,
  HiddenFile,
  Hint,
  LinkRow,
  LogoFrame,
  LogoInitials,
  LogoRow,
  Modal,
  ModalActions,
  ModalForm,
  ModalTitle,
  Overlay,
  Page,
  Pair,
  SaveBar,
  Stack,
  Slug,
  SwitchRow,
  Title,
} from './styled'

const VENUE_KIND_KEYS = ['RESTAURANT', 'HOTEL', 'CAFE'] as const

export function SettingsPage() {
  return (
    <VenueScreen cards={2}>{(restaurant) => <SettingsBody restaurant={restaurant} />}</VenueScreen>
  )
}

function SettingsBody({ restaurant }: { restaurant: Restaurant }) {
  const { t } = useTranslation(['dashboard', 'common'])
  const navigate = useNavigate()
  const page = useSettingsPage(restaurant)
  const logoRef = useRef<HTMLInputElement>(null)
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

      <PublishBar restaurantId={restaurant.id} slug={restaurant.slug} />

      <Stack>
        <BrandThemeSettings key={restaurant.id} restaurant={restaurant} />

        <Form onSubmit={page.onSubmit}>
          {page.saved && <Banner $tone="ok">{t('settings.saved')}</Banner>}
          {page.failed && (
            <Banner $tone="err">{page.failMessage || t('settings.saveFailed')}</Banner>
          )}

          <Card>
            <CardTitle>{t('settings.detailsTitle')}</CardTitle>
            <CardHint>{t('settings.detailsHint')}</CardHint>

            <LogoRow>
              <LogoFrame>
                {page.logoUrl ? (
                  <img src={page.logoUrl} alt="" width={72} height={72} />
                ) : (
                  <LogoInitials aria-hidden>{restaurant.name.slice(0, 1)}</LogoInitials>
                )}
              </LogoFrame>
              <Button
                type="button"
                variant="outline"
                size="sm"
                loading={page.logoUploading}
                onClick={() => logoRef.current?.click()}
              >
                {page.logoUrl ? t('settings.logoReplace') : t('settings.logoUpload')}
              </Button>
              <HiddenFile
                ref={logoRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(event) => {
                  page.uploadLogo(event.target.files?.[0])
                  event.target.value = ''
                }}
              />
            </LogoRow>
            {page.logoError && <Banner $tone="err">{page.logoError}</Banner>}

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
            <SwitchRow>
              <input type="checkbox" {...page.form.register('waiterCallEnabled')} />
              {t('settings.waiterCall')}
            </SwitchRow>
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

          <SaveBar>
            <Button type="submit" size="lg" loading={page.saving}>
              {t('common:actions.save')}
            </Button>
          </SaveBar>
        </Form>

        <Card>
          <CardTitle>{t('settings.linkTitle')}</CardTitle>
          <CardHint>{t('settings.linkHint')}</CardHint>
          <Slug>{page.publicUrl}</Slug>
          <LinkRow>
            <ActionMenu
              items={linkActions(page.copied, t)}
              onPick={(id) => {
                if (id === 'copy') void page.copyLink()
                if (id === 'plan') navigate('/dashboard/plan')
              }}
            />
          </LinkRow>
          {page.copyFailed && <CardHint>{t('settings.copyFailed')}</CardHint>}
        </Card>

        <Card>
          <CardTitle>{t('settings.venuesTitle')}</CardTitle>
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
          <CardTitle>{t('settings.accountTitle')}</CardTitle>
          <CardHint>{t('settings.accountHint')}</CardHint>
          <LogoutButton size="sm" />
        </Card>
      </Stack>

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
