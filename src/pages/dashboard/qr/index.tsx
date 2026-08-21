import { useTranslation } from 'react-i18next'

import { VenueScreen } from '@/components/dashboard/venue-screen'
import { ActionMenu } from '@/components/global/action-menu'
import { Button } from '@/components/global/button'
import { EmptyState } from '@/components/global/empty-state'
import { TextField } from '@/components/global/field'
import { Skeleton } from '@/components/global/skeleton'
import type { QrCode } from '@/types/qr'
import type { Restaurant } from '@/types/restaurant'

import { qrActions, runQrAction, useQrPage } from './helper'
import {
  Card,
  CardTop,
  Featured,
  Form,
  Grid,
  Hint,
  Label,
  Meta,
  Page,
  QrImage,
  Title,
} from './styled'

export function QrPage() {
  return <VenueScreen cards={3}>{(restaurant) => <QrBody restaurant={restaurant} />}</VenueScreen>
}

function QrBody({ restaurant }: { restaurant: Restaurant }) {
  const { t } = useTranslation(['dashboard', 'common'])
  const page = useQrPage(restaurant.id)

  const menuFor = (qr: QrCode) => (
    <ActionMenu
      items={qrActions(qr, page.copiedId, t)}
      onPick={(id) =>
        runQrAction(id, qr, {
          onCopy: page.copyLink,
          onDownload: page.downloadQr,
        })
      }
    />
  )

  return (
    <Page>
      <Title>{t('qr.title')}</Title>
      <Hint>{t('qr.hint')}</Hint>
      <Form
        onSubmit={(event) => {
          event.preventDefault()
          page.create()
        }}
      >
        <TextField
          label={t('qr.label')}
          placeholder={t('qr.labelPlaceholder')}
          value={page.label}
          onChange={(event) => page.setLabel(event.target.value)}
        />
        <TextField
          label={t('qr.table')}
          placeholder={t('qr.tablePlaceholder')}
          value={page.tableNumber}
          onChange={(event) => page.setTableNumber(event.target.value)}
        />
        <Button type="submit" loading={page.creating}>
          {t('qr.create')}
        </Button>
      </Form>
      {page.hint && <Hint>{t(page.hint)}</Hint>}
      {page.createError && <Hint>{page.createError}</Hint>}

      {page.reviewLoading && <Skeleton height="220px" />}
      {page.reviewQr && (
        <Featured>
          <Card>
            <CardTop>
              <Label>{t('qr.reviewTitle')}</Label>
              {menuFor(page.reviewQr)}
            </CardTop>
            <QrImage src={page.reviewQr.imageDataUrl} alt={t('qr.reviewLabel')} />
            <Meta>{t('qr.reviewHint')}</Meta>
            <Meta>{page.reviewQr.targetUrl}</Meta>
          </Card>
        </Featured>
      )}

      {page.query.isSuccess && page.tableCodes.length === 0 && (
        <EmptyState emoji="📱" title={t('qr.empty')} hint={t('qr.emptyHint')} />
      )}

      <Grid>
        {page.tableCodes.map((qr) => (
          <Card key={qr.id}>
            <CardTop>
              <Label>{qr.label}</Label>
              {menuFor(qr)}
            </CardTop>
            <QrImage src={qr.imageDataUrl} alt={qr.label} />
            {qr.tableNumber && (
              <Meta>
                {t('common:labels.table')} {qr.tableNumber}
              </Meta>
            )}
            <Meta>{qr.targetUrl}</Meta>
          </Card>
        ))}
      </Grid>
    </Page>
  )
}
