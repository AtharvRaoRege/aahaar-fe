import { useTranslation } from 'react-i18next'

import { LineIcon } from '@/components/landing/icons'
import { Blob, Doodle, Eyebrow, GhostType } from '@/components/landing/kit/styled'
import { useReveal } from '@/hooks/landing/use-reveal/helper'

import { Cta, Footer, Section, Sub, Title } from './styled'

interface FinalCtaProps {
  id: string
  isAuthenticated: boolean
  onPrimary: () => void
}

export function FinalCta({ id, isAuthenticated, onPrimary }: FinalCtaProps) {
  const { t } = useTranslation('common')
  const { ref, shown } = useReveal<HTMLHeadingElement>({ amount: 0.4 })

  return (
    <>
      <Section id={id}>
        <GhostType $top="-2%" $left="-8%" aria-hidden>
          {t('landing.cta.ghost')}
        </GhostType>
        <Blob $size={200} $tone="mint" $fade={0.2} $top="20%" $right="-70px" aria-hidden />
        <Doodle $size={30} $tone="chili" $float="a" $top="10%" $left="10%" aria-hidden>
          <LineIcon name="chili" />
        </Doodle>
        <Doodle $size={26} $tone="mint" $float="b" $top="14%" $right="10%" aria-hidden>
          <LineIcon name="grid3" />
        </Doodle>
        <Doodle $size={20} $tone="turmeric" $float="c" $bottom="14%" $left="14%" aria-hidden>
          <LineIcon name="star" />
        </Doodle>
        <Doodle $size={24} $float="a" $bottom="10%" $right="12%" aria-hidden>
          <LineIcon name="bellPlain" />
        </Doodle>

        <Eyebrow>{t('landing.cta.eyebrow')}</Eyebrow>
        <Title ref={ref} $in={shown}>
          {t('landing.cta.titleTop')}
          <br />
          {t('landing.cta.titleBottom')}
        </Title>
        <Sub>{t('landing.cta.sub')}</Sub>
        <Cta type="button" onClick={onPrimary}>
          {isAuthenticated ? t('landing.cta.kitchen') : t('landing.cta.button')}
        </Cta>
      </Section>
      <Footer>{t('landing.footer')}</Footer>
    </>
  )
}
