import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { LineIcon } from '@/components/landing/icons'
import { Doodle, IconFrame } from '@/components/landing/kit/styled'
import { STORY_BEATS } from '@/constants/landing'
import { useReveal } from '@/hooks/landing/use-reveal/helper'
import type { LineIconName } from '@/constants/landing-icons'

import { Beat, BeatBody, BeatTitle, Track } from './styled'

interface BeatBlockProps {
  icon: LineIconName
  title: ReactNode
  body: string
  decoration: ReactNode
}

function BeatBlock({ icon, title, body, decoration }: BeatBlockProps) {
  const { ref, shown } = useReveal<HTMLElement>({ amount: 0.3 })

  return (
    <Beat ref={ref} $in={shown}>
      {decoration}
      <IconFrame>
        <LineIcon name={icon} />
      </IconFrame>
      <BeatTitle>{title}</BeatTitle>
      <BeatBody>{body}</BeatBody>
    </Beat>
  )
}

const DECORATIONS: Record<string, ReactNode> = {
  scan: (
    <>
      <Doodle $size={26} $float="a" $top="6%" $left="10%" aria-hidden>
        <LineIcon name="loop" />
      </Doodle>
      <Doodle $size={28} $tone="chili" $float="b" $top="40%" $right="8%" aria-hidden>
        <LineIcon name="dots5" />
      </Doodle>
    </>
  ),
  browse: (
    <>
      <Doodle $size={30} $tone="mint" $float="b" $top="8%" $right="10%" aria-hidden>
        <LineIcon name="plant" />
      </Doodle>
      <Doodle $size={24} $tone="turmeric" $float="a" $bottom="12%" $left="8%" aria-hidden>
        <LineIcon name="star" />
      </Doodle>
    </>
  ),
  round: (
    <Doodle $size={26} $tone="chili" $float="c" $top="4%" $left="6%" aria-hidden>
      <LineIcon name="chili" />
    </Doodle>
  ),
}

export function StoryBeats() {
  const { t } = useTranslation('common')

  return (
    <Track>
      {STORY_BEATS.map((beat) => (
        <BeatBlock
          key={beat.key}
          icon={beat.icon}
          title={
            <>
              {t(`landing.beats.${beat.key}.titleTop`)}
              {t(`landing.beats.${beat.key}.titleBottom`, { defaultValue: '' }) ? (
                <>
                  <br />
                  {t(`landing.beats.${beat.key}.titleBottom`)}
                </>
              ) : null}
            </>
          }
          body={t(`landing.beats.${beat.key}.body`)}
          decoration={DECORATIONS[beat.key]}
        />
      ))}
    </Track>
  )
}
