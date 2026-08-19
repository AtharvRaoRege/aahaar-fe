import { useTranslation } from 'react-i18next'

import { BottomSheet } from '@/components/global/bottom-sheet'

import { endsLabel, offerBadge, useOfferStrip } from './helper'
import {
  Chip,
  ChipMeta,
  ChipTitle,
  CodeBox,
  CodeHint,
  Label,
  Rail,
  SheetBody,
  SheetText,
  SheetTitle,
  TermsLabel,
  Wrap,
} from './styled'

export interface OfferStripProps {
  slug: string
  onOfferView: (offerId: string) => void
}

export function OfferStrip({ slug, onOfferView }: OfferStripProps) {
  const { t } = useTranslation(['customer', 'common'])
  const strip = useOfferStrip(slug, onOfferView)

  if (strip.offers.length === 0) return null

  return (
    <Wrap>
      <Label>{t('offers.title')}</Label>
      <Rail>
        {strip.offers.map((offer) => {
          const badge = offerBadge(offer)
          const ends = endsLabel(offer)
          return (
            <Chip key={offer.id} type="button" onClick={() => strip.open(offer)}>
              <ChipTitle>{offer.title}</ChipTitle>
              {badge && <ChipMeta>{t(badge.key, { value: badge.value })}</ChipMeta>}
              {ends && <ChipMeta>{t(ends.key, { date: ends.date })}</ChipMeta>}
            </Chip>
          )
        })}
      </Rail>

      <BottomSheet open={strip.active !== null} onClose={strip.close}>
        {strip.active && (
          <SheetBody>
            <SheetTitle>{strip.active.title}</SheetTitle>
            {strip.active.description && <SheetText>{strip.active.description}</SheetText>}
            {strip.active.couponCode && (
              <CodeBox>
                {strip.active.couponCode}
                <CodeHint>{t('offers.codeHint')}</CodeHint>
              </CodeBox>
            )}
            {strip.active.terms && (
              <>
                <TermsLabel>{t('offers.terms')}</TermsLabel>
                <SheetText>{strip.active.terms}</SheetText>
              </>
            )}
          </SheetBody>
        )}
      </BottomSheet>
    </Wrap>
  )
}
