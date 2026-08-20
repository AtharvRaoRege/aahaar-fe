import { useTranslation } from 'react-i18next'

import { FoodChipArt } from '@/components/landing/art'
import { LineIcon } from '@/components/landing/icons'
import { SectionHead } from '@/components/landing/kit'
import { Doodle, FoodChip, GhostType } from '@/components/landing/kit/styled'
import { useReveal } from '@/hooks/landing/use-reveal/helper'

import { usePlanFeatures } from './helper'
import {
  Features,
  Limit,
  Plan,
  PlanName,
  Plans,
  Price,
  Ribbon,
  Section,
} from './styled'

interface PlanCardProps {
  plan: 'basic' | 'pro'
  delay: number
}

function PlanCard({ plan, delay }: PlanCardProps) {
  const { t } = useTranslation('common')
  const { ref, shown } = useReveal<HTMLElement>({ amount: 0.3 })
  const features = usePlanFeatures(plan)
  const pro = plan === 'pro'

  return (
    <Plan ref={ref} $pro={pro} $in={shown} $delay={delay}>
      <Ribbon>{t(`landing.pricing.${plan}.ribbon`)}</Ribbon>
      <PlanName>{t(`landing.pricing.${plan}.name`)}</PlanName>
      <Price>
        {t(`landing.pricing.${plan}.price`)} <small>{t('landing.pricing.perMonth')}</small>
      </Price>
      <Limit $pro={pro}>{t(`landing.pricing.${plan}.limit`)}</Limit>
      <Features $pro={pro}>
        {features.map((feature) => (
          <li key={feature}>
            <LineIcon name="check" />
            {feature}
          </li>
        ))}
      </Features>
    </Plan>
  )
}

export function PricingPlans({ id }: { id: string }) {
  const { t } = useTranslation('common')

  return (
    <Section id={id}>
      <GhostType $bottom="-8%" $left="-6%" aria-hidden>
        {t('landing.pricing.ghost')}
      </GhostType>
      <Doodle $size={26} $tone="turmeric" $float="a" $top="4%" $left="8%" aria-hidden>
        <LineIcon name="star" />
      </Doodle>
      <Doodle $size={22} $tone="chili" $float="b" $top="6%" $right="9%" aria-hidden>
        <LineIcon name="chili" />
      </Doodle>
      <FoodChip $top="2%" $left="44%" aria-hidden>
        <FoodChipArt kind="chai" />
      </FoodChip>

      <SectionHead
        eyebrow={t('landing.pricing.eyebrow')}
        title={
          <>
            {t('landing.pricing.titleTop')}
            <br />
            {t('landing.pricing.titleBottom')}
          </>
        }
      />
      <Plans>
        <PlanCard plan="basic" delay={0} />
        <PlanCard plan="pro" delay={90} />
      </Plans>
    </Section>
  )
}
