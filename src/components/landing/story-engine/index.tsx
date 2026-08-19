import { useTranslation } from 'react-i18next'

import { ENGINE_PARTS, ENGINE_TRACE } from './helper'
import {
  Chapter,
  Column,
  Head,
  Inner,
  Lede,
  Part,
  PartBody,
  PartName,
  Rail,
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
 * Chapter three. The trace panel is the visual; the three pieces are a swipe rail
 * on a phone and a column beside the trace on a laptop.
 */
export function StoryEngine({ id }: { id: string }) {
  const { t } = useTranslation('common')

  return (
    <Section id={id} aria-labelledby={`${id}-title`}>
      <Inner>
        <Column>
          <Head>
            <Chapter>{t('landing.story.engineChapter')}</Chapter>
            <Title id={`${id}-title`}>{t('landing.story.engineTitle')}</Title>
            <Lede>{t('landing.story.engineLede')}</Lede>
          </Head>
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
        </Column>

        <Column>
          <SwipeHint>{t('landing.story.engineSwipeHint')}</SwipeHint>
          <Rail>
            {ENGINE_PARTS.map((part) => (
              <Part key={part.id}>
                <PartName>{t(part.titleKey)}</PartName>
                <PartBody>{t(part.bodyKey)}</PartBody>
              </Part>
            ))}
          </Rail>
        </Column>
      </Inner>
    </Section>
  )
}
