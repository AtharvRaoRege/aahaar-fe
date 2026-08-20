import { ArrowDown, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'
import { Sticker } from '@/components/global/sticker'
import { useMounted } from '@/hooks/landing/use-reveal/helper'

import {
  Chapter,
  Enter,
  Headline,
  Lede,
  Prompt,
  PromptRow,
  ScrollHint,
  Section,
} from './styled'

export interface StoryHookProps {
  id: string
  isAuthenticated: boolean
  onEnter: () => void
  onKitchen: () => void
  onLogin: () => void
}

/** Step one. One screen, one problem, one way forward. */
export function StoryHook({ id, isAuthenticated, onEnter, onKitchen, onLogin }: StoryHookProps) {
  const { t } = useTranslation('common')
  const shown = useMounted()

  return (
    <Section id={id} aria-labelledby={`${id}-title`}>
      <Enter $in={shown} $delay={0}>
        <Sticker tone="tomato" rotate={-3}>
          {t('landing.stickerQr')}
        </Sticker>
      </Enter>
      <Enter $in={shown} $delay={80}>
        <Chapter>{t('landing.story.hookChapter')}</Chapter>
      </Enter>
      <Enter $in={shown} $delay={140}>
        <Headline id={`${id}-title`}>
          <span>{t('landing.story.hookLine1')}</span>
          <span>{t('landing.story.hookLine2')}</span>
          <span>{t('landing.story.hookLine3')}</span>
        </Headline>
      </Enter>
      <Enter $in={shown} $delay={260}>
        <Lede>{t('landing.story.hookLede')}</Lede>
      </Enter>
      <Enter $in={shown} $delay={340}>
        <PromptRow>
          {/* A signed-in owner came here to work, so the kitchen leads. A visitor
              gets the story first. */}
          {isAuthenticated ? (
            <>
              <Prompt type="button" onClick={onKitchen}>
                {t('landing.enterKitchen')}
                <ArrowRight aria-hidden />
              </Prompt>
              <Button variant="outline" size="lg" onClick={onEnter}>
                {t('landing.story.hookPrompt')}
              </Button>
            </>
          ) : (
            <>
              <Prompt type="button" onClick={onEnter}>
                {t('landing.story.hookPrompt')}
                <ArrowDown aria-hidden />
              </Prompt>
              <Button variant="outline" size="lg" onClick={onLogin}>
                {t('landing.login')}
              </Button>
            </>
          )}
        </PromptRow>
      </Enter>
      <Enter $in={shown} $delay={420}>
        <ScrollHint>{t('landing.story.hookScrollHint')}</ScrollHint>
      </Enter>
    </Section>
  )
}
