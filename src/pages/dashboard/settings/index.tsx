import { createPortal } from 'react-dom'
import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { VenueSwitcher } from '@/components/dashboard/venue-switcher'
import { Button } from '@/components/global/button'
import { FormField, TextArea, TextField } from '@/components/global/field'
import { IconButton } from '@/components/global/icon-button'
import { useDashboardContext } from '@/hooks/dashboard/context'
import type { Restaurant } from '@/types/restaurant'

import { Select } from '../menu/styled'
import { useSettingsPage } from './helper'
import {
  Banner,
  DesktopAdd,
  Form,
  Hint,
  Modal,
  ModalActions,
  ModalForm,
  ModalTitle,
  Overlay,
  Page,
  SectionLabel,
  Slug,
  SwitchRow,
  Title,
} from './styled'

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

  return (
    <Page>
      <Title>{t('settings.title')}</Title>
      <Hint>{t('settings.hint')}</Hint>

      <SectionLabel>{t('settings.switchVenue')}</SectionLabel>
      <SwitchRow>
        <VenueSwitcher
          restaurants={venueOptions}
          current={restaurant}
          impersonating={page.impersonating}
          onSelect={page.switchVenue}
        />
        <IconButton
          type="button"
          label={t('settings.addVenue')}
          icon={<Plus aria-hidden />}
          onClick={page.openAdd}
        />
      </SwitchRow>
      <DesktopAdd>
        <Button variant="outline" size="sm" type="button" onClick={page.openAdd}>
          {t('settings.addVenue')}
        </Button>
      </DesktopAdd>

      <SectionLabel>{t('settings.restaurant')}</SectionLabel>
      <Slug>
        {t('settings.slug')}: {page.publicUrl}
      </Slug>
      <Button variant="outline" size="sm" type="button" onClick={() => void page.copyLink()}>
        {page.copied ? t('settings.copied') : t('settings.copyLink')}
      </Button>
      {page.copyFailed && <Hint>{t('settings.copyFailed')}</Hint>}
      <Form onSubmit={page.onSubmit}>
        {page.saved && <Banner $tone="ok">{t('settings.saved')}</Banner>}
        {page.failed && <Banner $tone="err">{page.failMessage || t('settings.saveFailed')}</Banner>}
        <FormField label={t('settings.kind')}>
          <Select {...page.form.register('venueKind', { required: true })}>
            <option value="RESTAURANT">{t('setup.restaurant')}</option>
            <option value="HOTEL">{t('setup.hotel')}</option>
            <option value="CAFE">{t('setup.cafe')}</option>
          </Select>
        </FormField>
        <TextField
          label={t('settings.name')}
          error={page.form.formState.errors.name ? t('login.required') : undefined}
          {...page.form.register('name', { required: true })}
        />
        <TextField label={t('settings.phone')} {...page.form.register('phone')} />
        <TextArea label={t('settings.address')} {...page.form.register('address')} />
        <Button type="submit" size="lg" loading={page.saving}>
          {t('common:actions.save')}
        </Button>
      </Form>

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
                {page.addError && <Hint>{page.addError || t('setup.error')}</Hint>}
                <FormField label={t('setup.kind')}>
                  <Select {...page.addForm.register('venueKind', { required: true })}>
                    <option value="RESTAURANT">{t('setup.restaurant')}</option>
                    <option value="HOTEL">{t('setup.hotel')}</option>
                    <option value="CAFE">{t('setup.cafe')}</option>
                  </Select>
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
