import { useTranslation } from 'react-i18next'

import { PageSkeleton } from '@/components/global/page-skeleton'
import { Button } from '@/components/global/button'
import { EmptyState } from '@/components/global/empty-state'
import { TextField } from '@/components/global/field'
import { Skeleton } from '@/components/global/skeleton'
import { useDashboardContext } from '@/hooks/dashboard/context'
import type { Restaurant } from '@/types/restaurant'

import { useQrPage } from './helper'
import { Card, Featured, Form, Grid, Hint, Label, Meta, Page, QrImage, Title } from './styled'

export function QrPage() {
  const { restaurant } = useDashboardContext()
  if (!restaurant) return <PageSkeleton cards={3} />
  return <QrBody restaurant={restaurant} />
}

function QrBody({ restaurant }: { restaurant: Restaurant }) {
  const { t } = useTranslation(['dashboard', 'common'])
  const page = useQrPage(restaurant.id)

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
            <QrImage src={page.reviewQr.imageDataUrl} alt={t('qr.reviewLabel')} />
            <Label>{t('qr.reviewTitle')}</Label>
            <Meta>{t('qr.reviewHint')}</Meta>
            <Meta>{page.reviewQr.targetUrl}</Meta>
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => void page.copyLink(page.reviewQr!)}
            >
              {page.copiedId === page.reviewQr.id ? t('qr.copied') : t('qr.copy')}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => page.downloadQr(page.reviewQr!)}
            >
              {t('qr.download')}
            </Button>
          </Card>
        </Featured>
      )}

      {page.query.isSuccess && page.tableCodes.length === 0 && (
        <EmptyState emoji="📱" title={t('qr.empty')} hint={t('qr.emptyHint')} />
      )}

      <Grid>
        {page.tableCodes.map((qr) => (
          <Card key={qr.id}>
            <QrImage src={qr.imageDataUrl} alt={qr.label} />
            <Label>{qr.label}</Label>
            {qr.tableNumber && (
              <Meta>
                {t('common:labels.table')} {qr.tableNumber}
              </Meta>
            )}
            <Meta>{qr.targetUrl}</Meta>
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => void page.copyLink(qr)}
            >
              {page.copiedId === qr.id ? t('qr.copied') : t('qr.copy')}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => page.downloadQr(qr)}
            >
              {t('qr.download')}
            </Button>
          </Card>
        ))}
      </Grid>
    </Page>
  )
}
