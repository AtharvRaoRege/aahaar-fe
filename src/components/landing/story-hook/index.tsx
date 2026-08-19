import { ArrowDown, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'
import { Sticker } from '@/components/global/sticker'

import {
  Chapter,
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

/** Chapter one. One screen, one question, one way forward. */
export function StoryHook({ id, isAuthenticated, onEnter, onKitchen, onLogin }: StoryHookProps) {
  const { t } = useTranslation('common')

  return (
    <Section id={id} aria-labelledby={`${id}-title`}>
      <Sticker tone="tomato" rotate={-3}>
        {t('landing.stickerQr')}
      </Sticker>
      <Chapter>{t('landing.story.hookChapter')}</Chapter>
      <Headline id={`${id}-title`}>
        <span>{t('landing.story.hookLine1')}</span>
        <span>{t('landing.story.hookLine2')}</span>
        <span>{t('landing.story.hookLine3')}</span>
      </Headline>
      <Lede>{t('landing.story.hookLede')}</Lede>
      <PromptRow>
        {/* A signed-in owner came here to work, so the kitchen leads and the story
            becomes the secondary path. A visitor gets the story first. */}
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
      <ScrollHint>{t('landing.story.hookScrollHint')}</ScrollHint>
    </Section>
  )
}
