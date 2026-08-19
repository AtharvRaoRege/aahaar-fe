import { ScanLine } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { BottomSheet } from '@/components/global/bottom-sheet'
import { Button } from '@/components/global/button'
import { TextField } from '@/components/global/field'

import { ACCEPTED_TYPES, CONFIDENCE_TONE, useMenuScan } from './helper'
import {
  Body,
  Check,
  Count,
  Drop,
  DropHint,
  DropTitle,
  Fields,
  Footer,
  Intro,
  List,
  Notice,
  Pill,
  Row,
  RowTop,
  Spinner,
  Toolbar,
  Working,
  WorkingHint,
  WorkingText,
} from './styled'

export interface MenuScanSheetProps {
  open: boolean
  restaurantId: string
  onClose: () => void
  onApplied: (created: number) => void
}

export function MenuScanSheet({
  open,
  restaurantId,
  onClose,
  onApplied,
}: MenuScanSheetProps) {
  const { t } = useTranslation(['dashboard', 'common'])
  const scan = useMenuScan(restaurantId, (created) => {
    onApplied(created)
    onClose()
  })

  const close = () => {
    scan.reset()
    onClose()
  }

  return (
    <BottomSheet open={open} onClose={close} title={t('scan.title')}>
      <Body>
        {scan.error && (
          <Notice $tone="bad">
            {scan.error === 'MAX_SIZE' ? t('scan.tooBig') : scan.error}
          </Notice>
        )}

        {scan.scanning && (
          <Working>
            <Spinner aria-hidden />
            <WorkingText>{t('scan.reading')}</WorkingText>
            <WorkingHint>{t('scan.readingHint')}</WorkingHint>
          </Working>
        )}

        {!scan.scanning && scan.rows === null && (
          <>
            <Intro>{t('scan.intro')}</Intro>
            <Drop>
              <ScanLine aria-hidden />
              <DropTitle>{t('scan.pick')}</DropTitle>
              <DropHint>{t('scan.pickHint')}</DropHint>
              <input
                type="file"
                accept={ACCEPTED_TYPES}
                onChange={(event) => scan.pickFile(event.target.files?.[0] ?? null)}
              />
            </Drop>
          </>
        )}

        {!scan.scanning && scan.rows !== null && (
          <>
            {scan.quality === 'POOR' && <Notice $tone="warn">{t('scan.poorQuality')}</Notice>}
            {scan.notes && <Notice $tone="warn">{scan.notes}</Notice>}
            {scan.truncated && <Notice $tone="warn">{t('scan.truncated')}</Notice>}

            {scan.rows.length === 0 ? (
              <Notice $tone="warn">{t('scan.nothingFound')}</Notice>
            ) : (
              <>
                <Notice $tone="info">{t('scan.reviewFirst')}</Notice>
                {scan.lowCount > 0 && (
                  <Notice $tone="warn">
                    {t('scan.lowCount', { count: scan.lowCount })}
                  </Notice>
                )}
                <Toolbar>
                  <Button size="sm" variant="outline" onClick={scan.approveConfident}>
                    {t('scan.approveConfident')}
                  </Button>
                  <Count>{t('scan.selected', { count: scan.readyCount })}</Count>
                </Toolbar>

                <List>
                  {scan.rows.map((row) => (
                    <Row key={row.key} $on={row.include}>
                      <RowTop>
                        <Check
                          type="checkbox"
                          checked={row.include}
                          aria-label={row.name}
                          onChange={(event) => scan.setInclude(row.key, event.target.checked)}
                        />
                        <DropTitle>{row.name || t('scan.unnamed')}</DropTitle>
                        <Pill $tone={CONFIDENCE_TONE[row.confidence]}>
                          {t(`scan.confidence.${row.confidence}`)}
                        </Pill>
                      </RowTop>
                      <Fields>
                        <TextField
                          value={row.name}
                          placeholder={t('scan.name')}
                          onChange={(event) => scan.setName(row.key, event.target.value)}
                        />
                        <TextField
                          value={row.category}
                          placeholder={t('scan.category')}
                          onChange={(event) => scan.setCategory(row.key, event.target.value)}
                        />
                        <TextField
                          value={row.price === null ? '' : String(row.price)}
                          placeholder={t('scan.price')}
                          type="number"
                          min={0}
                          inputMode="decimal"
                          onChange={(event) => scan.setPrice(row.key, event.target.value)}
                        />
                      </Fields>
                    </Row>
                  ))}
                </List>
              </>
            )}

            <Footer>
              <Button variant="outline" onClick={scan.reset}>
                {t('scan.startOver')}
              </Button>
              <Button
                loading={scan.applying}
                disabled={scan.readyCount === 0}
                onClick={scan.submit}
              >
                {t('scan.add', { count: scan.readyCount })}
              </Button>
            </Footer>
          </>
        )}
      </Body>
    </BottomSheet>
  )
}
