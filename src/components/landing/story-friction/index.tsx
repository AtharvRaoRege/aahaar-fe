import { useTranslation } from 'react-i18next'

import { Reveal } from '@/components/landing/reveal'

import { FRICTIONS } from './helper'
import {
  Body,
  Chapter,
  Head,
  Inner,
  Item,
  Lede,
  List,
  Name,
  Num,
  Section,
  Title,
} from './styled'

/** Chapter two. Stacked on a phone, a sticky brief beside a grid on a laptop. */
export function StoryFriction({ id }: { id: string }) {
  const { t } = useTranslation('common')

  return (
    <Section id={id} aria-labelledby={`${id}-title`}>
      <Inner>
        <Reveal>
          <Head>
            <Chapter>{t('landing.story.frictionChapter')}</Chapter>
            <Title id={`${id}-title`}>{t('landing.story.frictionTitle')}</Title>
            <Lede>{t('landing.story.frictionLede')}</Lede>
          </Head>
        </Reveal>
        <List>
          {FRICTIONS.map((entry, index) => (
            <Reveal key={entry.num} delay={index * 90} amount={0.25}>
              <Item>
                <Num aria-hidden>{entry.num}</Num>
                <Name>{t(entry.titleKey)}</Name>
                <Body>{t(entry.bodyKey)}</Body>
              </Item>
            </Reveal>
          ))}
        </List>
      </Inner>
    </Section>
  )
}
