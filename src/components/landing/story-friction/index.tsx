import { useTranslation } from 'react-i18next'

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
        <Head>
          <Chapter>{t('landing.story.frictionChapter')}</Chapter>
          <Title id={`${id}-title`}>{t('landing.story.frictionTitle')}</Title>
          <Lede>{t('landing.story.frictionLede')}</Lede>
        </Head>
        <List>
          {FRICTIONS.map((entry) => (
            <Item key={entry.num}>
              <Num aria-hidden>{entry.num}</Num>
              <Name>{t(entry.titleKey)}</Name>
              <Body>{t(entry.bodyKey)}</Body>
            </Item>
          ))}
        </List>
      </Inner>
    </Section>
  )
}
