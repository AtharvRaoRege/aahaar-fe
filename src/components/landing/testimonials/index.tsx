import { useTranslation } from 'react-i18next'

import { FoodChipArt } from '@/components/landing/art'
import { LineIcon } from '@/components/landing/icons'
import { SectionHead } from '@/components/landing/kit'
import { Doodle, FoodChip, GhostType, ScrollHint } from '@/components/landing/kit/styled'
import { QUOTE_CARDS } from '@/constants/landing'
import { useStaggerGroup } from '@/hooks/landing/use-stagger-group/helper'
import type { LandingSkin } from '@/constants/landing'

import { Avatar, Name, Quote, Role, Row, Section, Stars, Text, Who } from './styled'

interface QuoteCardProps {
  skin: LandingSkin
  stars: string
  text: string
  name: string
  role: string
  initial: string
  delay: number
  shown: boolean
}

function QuoteCard({ skin, stars, text, name, role, initial, delay, shown }: QuoteCardProps) {
  return (
    <Quote $in={shown} $delay={delay}>
      <Stars aria-hidden>{stars}</Stars>
      <Text>{text}</Text>
      <Who>
        <Avatar $skin={skin} aria-hidden>
          {initial}
        </Avatar>
        <span>
          <Name>{name}</Name>
          <Role>{role}</Role>
        </span>
      </Who>
    </Quote>
  )
}

export function Testimonials() {
  const { t } = useTranslation('common')
  const { ref: rowRef, shown } = useStaggerGroup<HTMLDivElement>({ amount: 0.15 })

  return (
    <Section>
      <GhostType $top="-4%" $left="-8%" aria-hidden>
        {t('landing.quotes.ghost')}
      </GhostType>
      <Doodle $size={26} $tone="chili" $float="b" $top="2%" $right="8%" aria-hidden>
        <LineIcon name="chili" />
      </Doodle>
      <FoodChip $top="4%" $left="8%" aria-hidden>
        <FoodChipArt kind="naan" />
      </FoodChip>

      <SectionHead
        eyebrow={t('landing.quotes.eyebrow')}
        title={
          <>
            {t('landing.quotes.titleTop')}
            <br />
            {t('landing.quotes.titleBottom')}
          </>
        }
      />
      <Row ref={rowRef}>
        {QUOTE_CARDS.map((card, index) => (
          <QuoteCard
            key={card.key}
            skin={card.skin}
            stars={t('landing.quotes.stars')}
            text={t(`landing.quotes.${card.key}.text`)}
            name={t(`landing.quotes.${card.key}.name`)}
            role={t(`landing.quotes.${card.key}.role`)}
            initial={t(`landing.quotes.${card.key}.initial`)}
            delay={Math.min(index, 3) * 120}
            shown={shown}
          />
        ))}
      </Row>
      <ScrollHint>
        <span>{t('landing.gallery.swipe')}</span>
      </ScrollHint>
    </Section>
  )
}
