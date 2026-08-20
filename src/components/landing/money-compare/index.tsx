import { useTranslation } from 'react-i18next'

import { CoinStackArt } from '@/components/landing/art'
import { LineIcon } from '@/components/landing/icons'
import { Doodle, Eyebrow, GhostType } from '@/components/landing/kit/styled'
import { useReveal } from '@/hooks/landing/use-reveal/helper'

import { BarWrap, Coins, Compare, Fill, Label, Section, Stack, Title, Value } from './styled'

export function MoneyCompare() {
  const { t } = useTranslation('common')
  const { ref, shown } = useReveal<HTMLDivElement>({ amount: 0.4 })

  return (
    <Section>
      <GhostType $top="-6%" $left="-6%" aria-hidden>
        {t('landing.money.ghost')}
      </GhostType>
      <Doodle $size={30} $float="a" $top="8%" $left="8%" aria-hidden>
        <LineIcon name="rupee" />
      </Doodle>
      <Doodle $size={22} $float="b" $top="20%" $right="10%" aria-hidden>
        <LineIcon name="rupee" />
      </Doodle>
      <Doodle $size={18} $float="c" $bottom="12%" $left="14%" aria-hidden>
        <LineIcon name="coin" />
      </Doodle>

      <Coins aria-hidden>
        <CoinStackArt />
      </Coins>
      <Eyebrow $tone="ink">{t('landing.money.eyebrow')}</Eyebrow>
      <Title>
        {t('landing.money.titleTop')}
        <br />
        {t('landing.money.titleBottom')}
      </Title>
      <Compare ref={ref}>
        <Stack>
          <Value>{t('landing.money.keepValue')}</Value>
          <BarWrap>
            <Fill $in={shown} $to={78} $skin="ink" />
          </BarWrap>
          <Label>{t('landing.money.keepLabel')}</Label>
        </Stack>
        <Stack>
          <Value>{t('landing.money.cutValue')}</Value>
          <BarWrap>
            <Fill $in={shown} $to={24} $skin="chili" />
          </BarWrap>
          <Label>{t('landing.money.cutLabel')}</Label>
        </Stack>
      </Compare>
    </Section>
  )
}
