import { useTranslation } from 'react-i18next'

import { LineIcon } from '@/components/landing/icons'
import { SectionHead } from '@/components/landing/kit'
import { Doodle, GhostType } from '@/components/landing/kit/styled'
import { HOW_STEPS } from '@/constants/landing'
import { useStaggerGroup } from '@/hooks/landing/use-stagger-group/helper'
import type { LandingSkin } from '@/constants/landing'

import { Section, Step, StepBody, StepNum, StepTitle, Steps } from './styled'

const NUM_SKINS: LandingSkin[] = ['chili', 'turmeric', 'mint', 'ink', 'chili']

interface StepRowProps {
  index: number
  title: string
  body: string
  shown: boolean
}

function StepRow({ index, title, body, shown }: StepRowProps) {
  return (
    <Step $in={shown} $delay={index * 100}>
      <StepNum $skin={NUM_SKINS[index]}>{index + 1}</StepNum>
      <div>
        <StepTitle>{title}</StepTitle>
        <StepBody>{body}</StepBody>
      </div>
    </Step>
  )
}

export function HowItWorks() {
  const { t } = useTranslation('common')
  const { ref: stepsRef, shown } = useStaggerGroup<HTMLOListElement>({ amount: 0.2 })

  return (
    <Section>
      <GhostType $top="-2%" $left="-8%" aria-hidden>
        {t('landing.howto.ghost')}
      </GhostType>
      <Doodle $size={26} $tone="chili" $float="c" $top="4%" $right="8%" aria-hidden>
        <LineIcon name="clock9" />
      </Doodle>
      <Doodle $size={30} $tone="mint" $float="a" $bottom="8%" $left="6%" aria-hidden>
        <LineIcon name="plant" />
      </Doodle>

      <SectionHead
        eyebrow={t('landing.howto.eyebrow')}
        title={
          <>
            {t('landing.howto.titleTop')}
            <br />
            {t('landing.howto.titleBottom')}
          </>
        }
      />
      <Steps ref={stepsRef}>
        {HOW_STEPS.map((step, index) => (
          <StepRow
            key={step}
            index={index}
            title={t(`landing.howto.${step}.title`)}
            body={t(`landing.howto.${step}.body`)}
            shown={shown}
          />
        ))}
      </Steps>
    </Section>
  )
}
