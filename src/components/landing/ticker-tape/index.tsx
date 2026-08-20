import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import { TickerMarkArt } from '@/components/landing/art'
import { LineIcon } from '@/components/landing/icons'
import { Doodle, Eyebrow, GhostType } from '@/components/landing/kit/styled'
import { TICKER_PARTS } from '@/constants/landing'
import { usePinnedTrack } from '@/hooks/landing/use-pinned-track/helper'

import {
  Hint,
  Intro,
  IntroLede,
  IntroTitle,
  Mark,
  Pin,
  Section,
  Track,
  Viewport,
  Word,
} from './styled'

/**
 * One sentence that travels sideways while the page is held still.
 *
 * The section is several screens tall and its frame is sticky, so scrolling down
 * moves the sentence instead of the page — the reader cannot skip past until the
 * line has finished.
 */
export function TickerTape() {
  const { t } = useTranslation('common')
  const { sectionRef, viewportRef, trackRef, offset, progress } = usePinnedTrack()
  const introFade = Math.min(1, progress * 3)

  return (
    <Section ref={sectionRef}>
      <Pin>
        <GhostType $tone="paper" $top="-2%" $left="-6%" aria-hidden>
          {t('landing.ticker.ghost')}
        </GhostType>
        <Doodle $size={26} $tone="turmeric" $float="a" $top="6%" $right="8%" aria-hidden>
          <LineIcon name="star" />
        </Doodle>

        <Intro $fade={introFade}>
          <Eyebrow $tone="turmeric">{t('landing.ticker.eyebrow')}</Eyebrow>
          <IntroTitle>
            {t('landing.ticker.titleTop')}
            <br />
            {t('landing.ticker.titleBottom')}
          </IntroTitle>
          <IntroLede>{t('landing.ticker.lede')}</IntroLede>
        </Intro>

        <Viewport ref={viewportRef}>
          <Track ref={trackRef} $x={offset}>
            {TICKER_PARTS.map((part) => (
              <Fragment key={part.key}>
                <Word $accent={part.accent}>{t(`landing.ticker.${part.key}`)}</Word>
                <Mark aria-hidden>
                  <TickerMarkArt kind={part.mark} />
                </Mark>
              </Fragment>
            ))}
          </Track>
        </Viewport>

        <Hint>
          <span>{t('landing.ticker.hint')}</span>
        </Hint>
      </Pin>
    </Section>
  )
}
