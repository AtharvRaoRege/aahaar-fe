import { useTranslation } from 'react-i18next'

import { BrandMark } from '@/components/global/brand-mark'
import { QrSlipArt, TableSceneArt } from '@/components/landing/art'
import { LineIcon } from '@/components/landing/icons'
import { Blob, Doodle, GhostType } from '@/components/landing/kit/styled'

import { useAppTourSrc } from './helper'
import {
  AppScreen,
  Hero,
  HeroCta,
  HeroEyebrow,
  HeroLogo,
  HeroTag,
  Phone,
  QrSlip,
  ScanRig,
  TableScene,
  Title,
} from './styled'

interface HeroScanProps {
  id: string
  isAuthenticated: boolean
  onPrimary: () => void
}

export function HeroScan({ id, isAuthenticated, onPrimary }: HeroScanProps) {
  const { t } = useTranslation('common')
  const tourSrc = useAppTourSrc()

  return (
    <Hero id={id}>
      <Blob $size={220} $tone="turmeric" $fade={0.35} $top="-40px" $left="-60px" aria-hidden />
      <Blob $size={180} $tone="chili" $fade={0.22} $bottom="0" $right="-50px" aria-hidden />
      <GhostType $top="6%" $left="-6%" aria-hidden>
        {t('landing.hero.ghostOne')}
      </GhostType>
      <GhostType $bottom="-2%" $left="-10%" aria-hidden>
        {t('landing.hero.ghostTwo')}
      </GhostType>

      <Doodle $size={44} $tone="chili" $float="a" $top="12%" $left="6%" aria-hidden>
        <LineIcon name="chili" />
      </Doodle>
      <Doodle $size={50} $tone="mint" $float="b" $top="20%" $right="5%" aria-hidden>
        <LineIcon name="leaf" />
      </Doodle>
      <Doodle $size={30} $tone="turmeric" $float="c" $bottom="16%" $left="8%" aria-hidden>
        <LineIcon name="clockSmall" />
      </Doodle>
      <Doodle $size={34} $float="b" $bottom="10%" $right="7%" aria-hidden>
        <LineIcon name="star" />
      </Doodle>

      <HeroLogo>
        <BrandMark size={144} />
      </HeroLogo>
      <HeroEyebrow>{t('landing.hero.eyebrow')}</HeroEyebrow>
      <Title>
        {t('landing.hero.titleTop')}
        <span>{t('landing.hero.titleAccent')}</span>
      </Title>
      <HeroCta type="button" onClick={onPrimary}>
        {isAuthenticated ? t('landing.enterKitchen') : t('landing.login')}
      </HeroCta>

      <ScanRig>
        <TableScene aria-hidden>
          <TableSceneArt />
        </TableScene>
        <Phone>
          <AppScreen
            src={tourSrc}
            alt={t('landing.hero.phoneAlt')}
            width={390}
            height={844}
            decoding="async"
            fetchPriority="high"
          />
        </Phone>
        <QrSlip aria-hidden>
          <QrSlipArt />
        </QrSlip>
      </ScanRig>

      <HeroTag>{t('landing.hero.tag')}</HeroTag>
    </Hero>
  )
}
