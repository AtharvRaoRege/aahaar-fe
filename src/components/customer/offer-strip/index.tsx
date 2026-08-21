import { Tag } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { BottomSheet } from '@/components/global/bottom-sheet'
import { formatMoney } from '@/utils/format'
import { renderOfferKindIcon } from '@/utils/offers/kind-icon'

import { endsLabel, offerHeadline, useOfferStrip } from './helper'
import {
  Banner,
  BannerCode,
  BannerHeadline,
  BannerIcon,
  BannerKicker,
  BannerMeta,
  BannerTitle,
  BannerTop,
  CodeBox,
  CodeHint,
  Label,
  LabelRow,
  Rail,
  RuleList,
  SheetBody,
  SheetHead,
  SheetIcon,
  SheetText,
  SheetTitle,
  TermsLabel,
  Wrap,
} from './styled'

export interface OfferStripProps {
  slug: string
  onOfferView: (offerId: string) => void
  currency?: string
}

export function OfferStrip({ slug, onOfferView, currency = 'INR' }: OfferStripProps) {
  const { t } = useTranslation(['customer', 'common'])
  const strip = useOfferStrip(slug, onOfferView)

  if (strip.offers.length === 0) return null

  return (
    <Wrap>
      <LabelRow>
        <Tag aria-hidden size={16} />
        <Label>{t('offers.title')}</Label>
      </LabelRow>
      <Rail>
        {strip.offers.map((offer) => {
          const headline = offerHeadline(offer)
          const ends = endsLabel(offer)
          return (
            <Banner key={offer.id} type="button" onClick={() => strip.open(offer)}>
              <BannerTop>
                <BannerIcon>{renderOfferKindIcon(offer.kind, 20)}</BannerIcon>
                <BannerKicker>{t('offers.liveNow')}</BannerKicker>
              </BannerTop>
              <BannerHeadline>
                {headline.value !== undefined
                  ? t(headline.key, { value: headline.value })
                  : t(headline.key)}
              </BannerHeadline>
              <BannerTitle>{offer.title}</BannerTitle>
              {ends && <BannerMeta>{t(ends.key, { date: ends.date })}</BannerMeta>}
              {offer.couponCode && (
                <BannerCode>{t('offers.code', { code: offer.couponCode })}</BannerCode>
              )}
            </Banner>
          )
        })}
      </Rail>

      <BottomSheet open={strip.active !== null} onClose={strip.close}>
        {strip.active && (
          <SheetBody>
            <SheetHead>
              <SheetIcon>{renderOfferKindIcon(strip.active.kind, 22)}</SheetIcon>
              <SheetTitle>{strip.active.title}</SheetTitle>
            </SheetHead>
            {strip.active.description && <SheetText>{strip.active.description}</SheetText>}
            {strip.active.couponCode && (
              <CodeBox>
                {strip.active.couponCode}
                <CodeHint>{t('offers.codeHint')}</CodeHint>
              </CodeBox>
            )}
            <TermsLabel>{t('offers.terms')}</TermsLabel>
            <RuleList>
              <li>
                {t('offers.minItems', {
                  count: Math.max(1, strip.active.minItemCount ?? 1),
                })}
              </li>
              {(strip.active.minOrderAmount ?? 0) > 0 && (
                <li>
                  {t('offers.minOrder', {
                    amount: formatMoney(strip.active.minOrderAmount, currency),
                  })}
                </li>
              )}
              {strip.active.terms && <li>{strip.active.terms}</li>}
            </RuleList>
          </SheetBody>
        )}
      </BottomSheet>
    </Wrap>
  )
}
