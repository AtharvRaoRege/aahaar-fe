import type { ReactNode } from 'react'

import { Eyebrow, Head, HeadTitle, MarqueeBand, MarqueeTrack } from './styled'
import type { DoodleTone } from './styled'

interface MarqueeProps {
  words: string[]
  light?: boolean
  reverse?: boolean
}

/**
 * An endless ticker band. The word list is rendered twice because the slide
 * animation ends at -50%, so the second copy is already in place when it loops.
 */
export function Marquee({ words, light, reverse }: MarqueeProps) {
  const line = (
    <span>
      {words.map((word) => (
        <span key={word}>
          {word} <i>✦</i>
        </span>
      ))}
    </span>
  )

  return (
    <MarqueeBand $light={light} aria-hidden>
      <MarqueeTrack $reverse={reverse}>
        {line}
        {line}
      </MarqueeTrack>
    </MarqueeBand>
  )
}

interface SectionHeadProps {
  eyebrow: string
  title: ReactNode
  tone?: DoodleTone
  eyebrowTone?: DoodleTone
}

export function SectionHead({ eyebrow, title, tone, eyebrowTone }: SectionHeadProps) {
  return (
    <Head>
      <Eyebrow $tone={eyebrowTone}>{eyebrow}</Eyebrow>
      <HeadTitle $tone={tone}>{title}</HeadTitle>
    </Head>
  )
}
