import { useTranslation } from 'react-i18next'

import { LineIcon } from '@/components/landing/icons'
import { SectionHead } from '@/components/landing/kit'
import { Doodle, GhostType } from '@/components/landing/kit/styled'
import { JOURNEY_STOPS } from '@/constants/landing'
import { useStaggerGroup } from '@/hooks/landing/use-stagger-group/helper'
import type { LandingSkin } from '@/constants/landing'

import { Section, Stop, StopBody, StopDot, StopTitle, Timeline } from './styled'

interface StopRowProps {
  skin: LandingSkin
  title: string
  body: string
  delay: number
  shown: boolean
}

function StopRow({ skin, title, body, delay, shown }: StopRowProps) {
  return (
    <Stop $in={shown} $delay={delay}>
      <StopDot $skin={skin} />
      <StopTitle>{title}</StopTitle>
      <StopBody>{body}</StopBody>
    </Stop>
  )
}

export function GuestJourney() {
  const { t } = useTranslation('common')
  const { ref: timelineRef, shown } = useStaggerGroup<HTMLOListElement>({ amount: 0.2 })

  return (
    <Section>
      <GhostType $top="-2%" $right="-8%" aria-hidden>
        {t('landing.journey.ghost')}
      </GhostType>
      <Doodle $size={28} $tone="turmeric" $float="a" $top="4%" $left="8%" aria-hidden>
        <LineIcon name="star" />
      </Doodle>

      <SectionHead
        eyebrow={t('landing.journey.eyebrow')}
        title={
          <>
            {t('landing.journey.titleTop')}
            <br />
            {t('landing.journey.titleBottom')}
          </>
        }
      />
      <Timeline ref={timelineRef}>
        {JOURNEY_STOPS.map((stop, index) => (
          <StopRow
            key={stop.key}
            skin={stop.skin}
            title={t(`landing.journey.${stop.key}.title`)}
            body={t(`landing.journey.${stop.key}.body`)}
            delay={index * 120}
            shown={shown}
          />
        ))}
      </Timeline>
    </Section>
  )
}
