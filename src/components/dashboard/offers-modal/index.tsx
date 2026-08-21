import { BadgePercent, Plus, X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

import { ActionMenu } from '@/components/global/action-menu'
import { Button } from '@/components/global/button'
import { ConfirmDialog } from '@/components/global/confirm-dialog'
import { EmptyState } from '@/components/global/empty-state'
import { FormField, TextArea, TextField } from '@/components/global/field'
import { IconButton } from '@/components/global/icon-button'
import { Select } from '@/components/global/select'
import { Skeleton } from '@/components/global/skeleton'
import type { Offer } from '@/types/offer'
import { renderOfferKindIcon } from '@/utils/offers/kind-icon'

import { offerActions, runOfferAction, useOffersPage } from './helper'
import {
  Body,
  CardHead,
  Code,
  FormModal,
  FormOverlay,
  FormRow,
  Head,
  HeadRow,
  HeadTools,
  Hint,
  KindRow,
  List,
  Meta,
  ModalActions,
  ModalForm,
  ModalTitle,
  Notice,
  OfferCard,
  OfferIcon,
  OfferTitle,
  Overlay,
  Shell,
  StatePill,
  SwitchRow,
  Title,
  TitleWithIcon,
  Toolbar,
} from './styled'

export interface OffersModalProps {
  restaurantId: string
  open: boolean
  onClose: () => void
}

export function OffersModal({ restaurantId, open, onClose }: OffersModalProps) {
  if (!open) return null
  return <OffersModalBody restaurantId={restaurantId} onClose={onClose} />
}

function OffersModalBody({
  restaurantId,
  onClose,
}: {
  restaurantId: string
  onClose: () => void
}) {
  const { t } = useTranslation(['dashboard', 'common'])
  const page = useOffersPage(restaurantId)

  return createPortal(
    <>
      <Overlay onClick={onClose} role="presentation">
        <Shell
          role="dialog"
          aria-modal="true"
          aria-labelledby="offers-modal-title"
          onClick={(event) => event.stopPropagation()}
        >
          <Head>
            <HeadRow>
              <TitleWithIcon>
                <OfferIcon aria-hidden>
                  <BadgePercent size={22} strokeWidth={2.25} />
                </OfferIcon>
                <Title id="offers-modal-title">{t('offers.title')}</Title>
              </TitleWithIcon>
              <IconButton
                label={t('common:actions.close')}
                icon={<X aria-hidden />}
                size="sm"
                onClick={onClose}
              />
            </HeadRow>
            <Hint>{t('offers.hint')}</Hint>
            <Toolbar>
              <Button leftIcon={<Plus aria-hidden />} onClick={page.openCreate}>
                {t('offers.create')}
              </Button>
            </Toolbar>
          </Head>

          <Body>
            {page.error && <Notice $tone="bad">{page.error}</Notice>}

            {page.isLoading && <Skeleton height="200px" />}

            {!page.isLoading && page.offers.length === 0 && (
              <EmptyState emoji="🏷️" title={t('offers.empty')} hint={t('offers.emptyHint')} />
            )}

            {page.offers.length > 0 && (
              <List>
                {page.offers.map((offer) => (
                  <OfferCard key={offer.id}>
                    <CardHead>
                      <KindRow>
                        <OfferIcon>{renderOfferKindIcon(offer.kind, 18)}</OfferIcon>
                        <OfferTitle>{offer.title}</OfferTitle>
                      </KindRow>
                      <HeadTools>
                        <StatePill $state={offer.state}>{t(`offers.states.${offer.state}`)}</StatePill>
                        <ActionMenu
                          items={offerActions(offer, t)}
                          loading={page.busy}
                          onPick={(id) =>
                            runOfferAction(id, offer, {
                              onEdit: page.openEdit,
                              onToggle: page.toggle,
                              onDelete: page.askDelete,
                            })
                          }
                        />
                      </HeadTools>
                    </CardHead>
                    <Meta>{t(`offers.kinds.${offer.kind}`)}</Meta>
                    {offer.description && <Meta>{offer.description}</Meta>}
                    {offer.couponCode && <Code>{offer.couponCode}</Code>}
                  </OfferCard>
                ))}
              </List>
            )}
          </Body>
        </Shell>
      </Overlay>

      {page.formOpen && (
        <FormOverlay onClick={page.closeForm} role="presentation">
          <FormModal
            role="dialog"
            aria-modal="true"
            aria-labelledby="offer-form-title"
            onClick={(event) => event.stopPropagation()}
          >
            <ModalTitle id="offer-form-title">
              {page.isEditing ? t('offers.edit') : t('offers.create')}
            </ModalTitle>
            <ModalForm
              onSubmit={(event) => {
                event.preventDefault()
                page.submit()
              }}
            >
              <FormField label={t('offers.kind')}>
                <Select
                  value={page.form.kind}
                  options={page.availableKinds.map((kind) => ({
                    value: kind,
                    label: t(`offers.kinds.${kind}`),
                  }))}
                  onChange={(value) => page.setField('kind', value as Offer['kind'])}
                />
              </FormField>
              {!page.isPro && <Meta>{t('offers.proKindHint')}</Meta>}
              <TextField
                label={t('offers.offerTitle')}
                value={page.form.title}
                onChange={(event) => page.setField('title', event.target.value)}
              />
              <TextArea
                label={t('offers.description')}
                value={page.form.description}
                onChange={(event) => page.setField('description', event.target.value)}
              />
              <FormRow>
                <TextField
                  label={
                    page.form.kind === 'FLAT' ? t('offers.valueFlat') : t('offers.valuePercent')
                  }
                  type="number"
                  inputMode="decimal"
                  min={0}
                  value={page.form.value}
                  onChange={(event) => page.setField('value', event.target.value)}
                />
                <TextField
                  label={t('offers.couponCode')}
                  value={page.form.couponCode}
                  onChange={(event) => page.setField('couponCode', event.target.value)}
                />
              </FormRow>
              <FormRow>
                <TextField
                  label={t('offers.minItemCount')}
                  type="number"
                  inputMode="numeric"
                  min={1}
                  value={page.form.minItemCount}
                  onChange={(event) => page.setField('minItemCount', event.target.value)}
                />
                <TextField
                  label={t('offers.minOrderAmount')}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  value={page.form.minOrderAmount}
                  onChange={(event) => page.setField('minOrderAmount', event.target.value)}
                />
              </FormRow>
              <FormRow>
                <TextField
                  label={t('offers.startsAt')}
                  type="datetime-local"
                  value={page.form.startsAt}
                  onChange={(event) => page.setField('startsAt', event.target.value)}
                />
                <TextField
                  label={t('offers.endsAt')}
                  type="datetime-local"
                  value={page.form.endsAt}
                  onChange={(event) => page.setField('endsAt', event.target.value)}
                />
              </FormRow>
              <TextArea
                label={t('offers.terms')}
                value={page.form.terms}
                onChange={(event) => page.setField('terms', event.target.value)}
              />
              <SwitchRow>
                <input
                  type="checkbox"
                  checked={page.form.isActive}
                  onChange={(event) => page.setField('isActive', event.target.checked)}
                />
                {t('offers.active')}
              </SwitchRow>
              <ModalActions>
                <Button type="button" variant="outline" onClick={page.closeForm}>
                  {t('common:actions.cancel')}
                </Button>
                <Button type="submit" loading={page.busy} disabled={!page.form.title.trim()}>
                  {t('common:actions.save')}
                </Button>
              </ModalActions>
            </ModalForm>
          </FormModal>
        </FormOverlay>
      )}

      <ConfirmDialog
        open={page.pendingDelete !== null}
        title={t('offers.deleteTitle')}
        message={t('offers.deleteBody')}
        confirmLabel={t('common:actions.delete')}
        loading={page.busy}
        onClose={page.cancelDelete}
        onConfirm={page.confirmDelete}
      />
    </>,
    document.body,
  )
}
