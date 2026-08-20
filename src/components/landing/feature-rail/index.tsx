import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { LineIcon } from '@/components/landing/icons'
import { SectionHead } from '@/components/landing/kit'
import { GhostType, ScrollHint } from '@/components/landing/kit/styled'
import { useStaggerGroup } from '@/hooks/landing/use-stagger-group/helper'
import type { RailCard } from '@/constants/landing'

import { railDelay } from './helper'
import { Card, CardBody, CardIcon, CardTitle, Scroller, Section } from './styled'

interface RailItemProps {
  card: RailCard
  index: number
  title: string
  body: string
  shown: boolean
}

function RailItem({ card, index, title, body, shown }: RailItemProps) {
  const skin = card.skin ?? 'paper'

  return (
    <Card $skin={skin} $in={shown} $delay={railDelay(index)}>
      <CardIcon $skin={skin}>
        <LineIcon name={card.icon} />
      </CardIcon>
      <CardTitle>{title}</CardTitle>
      <CardBody>{body}</CardBody>
    </Card>
  )
}

export interface FeatureRailProps {
  /** i18n namespace under `landing`, e.g. `guest` or `owner`. */
  scope: string
  cards: RailCard[]
  title: ReactNode
  dark?: boolean
  ghostLeft?: boolean
  children?: ReactNode
}

export function FeatureRail({
  scope,
  cards,
  title,
  dark,
  ghostLeft,
  children,
}: FeatureRailProps) {
  const { t } = useTranslation('common')
  const { ref: scrollerRef, shown } = useStaggerGroup<HTMLDivElement>({ amount: 0.15 })

  return (
    <Section $dark={dark}>
      <GhostType
        $tone={dark ? 'paper' : 'ink'}
        $top="-4%"
        $left={ghostLeft ? '-8%' : undefined}
        $right={ghostLeft ? undefined : '-8%'}
        aria-hidden
      >
        {t(`landing.${scope}.ghost`)}
      </GhostType>
      {children}
      <SectionHead
        eyebrow={t(`landing.${scope}.eyebrow`)}
        title={title}
        tone={dark ? 'paper' : 'ink'}
        eyebrowTone={dark ? 'turmeric' : 'chili'}
      />
      <Scroller ref={scrollerRef}>
        {cards.map((card, index) => (
          <RailItem
            key={card.key}
            card={card}
            index={index}
            title={t(`landing.${scope}.${card.key}.title`)}
            body={t(`landing.${scope}.${card.key}.body`)}
            shown={shown}
          />
        ))}
      </Scroller>
      <ScrollHint $tone={dark ? 'paper' : 'ink'}>
        <span>{t('landing.gallery.swipe')}</span>
      </ScrollHint>
    </Section>
  )
}
