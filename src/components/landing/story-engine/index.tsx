import { useTranslation } from 'react-i18next'

import { Reveal } from '@/components/landing/reveal'

import { ENGINE_PARTS, ENGINE_TRACE } from './helper'
import {
  Badge,
  Chapter,
  Column,
  Head,
  Inner,
  Lede,
  Part,
  PartBody,
  PartName,
  Rail,
  RailCell,
  Section,
  SwipeHint,
  Title,
  Trace,
  TraceActor,
  TraceEvent,
  TraceLabel,
  TraceList,
  TraceRow,
} from './styled'

/**
 * Step three. The trace is the proof; the four cards are a swipe rail on a phone
 * and a grid beside it on a laptop.
 */
export function StoryEngine({ id }: { id: string }) {
  const { t } = useTranslation('common')

  return (
    <Section id={id} aria-labelledby={`${id}-title`}>
      <Inner>
        <Column>
          <Reveal>
            <Head>
              <Chapter>{t('landing.story.engineChapter')}</Chapter>
              <Title id={`${id}-title`}>{t('landing.story.engineTitle')}</Title>
              <Lede>{t('landing.story.engineLede')}</Lede>
            </Head>
          </Reveal>
          <Reveal delay={120} amount={0.1}>
            <Trace>
              <TraceLabel>{t('landing.story.engineTraceLabel')}</TraceLabel>
              <TraceList>
                {ENGINE_TRACE.map((step) => (
                  <TraceRow key={step.actorKey + step.eventKey}>
                    <TraceActor>{t(step.actorKey)}</TraceActor>
                    <TraceEvent>{t(step.eventKey)}</TraceEvent>
                  </TraceRow>
                ))}
              </TraceList>
            </Trace>
          </Reveal>
        </Column>

        <Column>
          <SwipeHint>{t('landing.story.engineSwipeHint')}</SwipeHint>
          <Rail>
            {ENGINE_PARTS.map((part, index) => (
              <RailCell key={part.id}>
                <Reveal delay={index * 80} amount={0.2}>
                  <Part>
                    <PartName>{t(part.titleKey)}</PartName>
                    <PartBody>{t(part.bodyKey)}</PartBody>
                    {'badgeKey' in part && <Badge>{t(part.badgeKey)}</Badge>}
                  </Part>
                </Reveal>
              </RailCell>
            ))}
          </Rail>
        </Column>
      </Inner>
    </Section>
  )
}
