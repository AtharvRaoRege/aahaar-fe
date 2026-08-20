import { useTranslation } from 'react-i18next'

import { StoryEngine } from '@/components/landing/story-engine'
import { StoryFinale } from '@/components/landing/story-finale'
import { StoryFriction } from '@/components/landing/story-friction'
import { StoryHook } from '@/components/landing/story-hook'
import { BrandMark } from '@/components/global/brand-mark'
import { Button } from '@/components/global/button'
import { useScrollProgress } from '@/hooks/landing/use-reveal/helper'

import { useStoryPage } from './helper'
import {
  BarActions,
  Brand,
  LabelLong,
  LabelShort,
  Page,
  Progress,
  SkipLink,
  StoryScroll,
  TopBar,
} from './styled'

/** One page, four steps, read top to bottom. */
export function LandingPage() {
  const { t } = useTranslation('common')
  const page = useStoryPage()
  const progress = useScrollProgress()

  return (
    <Page>
      <StoryScroll />
      <TopBar>
        <Brand>
          <BrandMark size={26} />
          <span>{t('appName')}</span>
        </Brand>
        <BarActions>
          <SkipLink href={`#${page.chapters.finale}`}>{t('landing.story.skip')}</SkipLink>
          <Button
            variant="outline"
            size="sm"
            onClick={page.isAuthenticated ? page.goKitchen : page.goLogin}
          >
            {page.isAuthenticated ? (
              <>
                <LabelLong>{t('landing.enterKitchen')}</LabelLong>
                <LabelShort>{t('landing.story.kitchenShort')}</LabelShort>
              </>
            ) : (
              t('landing.login')
            )}
          </Button>
        </BarActions>
        <Progress
          $value={progress}
          role="progressbar"
          aria-label={t('landing.story.progressLabel')}
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </TopBar>

      <StoryHook
        id={page.chapters.hook}
        isAuthenticated={page.isAuthenticated}
        onEnter={page.enterStory}
        onKitchen={page.goKitchen}
        onLogin={page.goLogin}
      />
      <StoryFriction id={page.chapters.friction} />
      <StoryEngine id={page.chapters.engine} />
      <StoryFinale
        id={page.chapters.finale}
        isAuthenticated={page.isAuthenticated}
        table={page.table}
        onTable={page.setTable}
        onOpenTable={page.openTable}
        onKitchen={page.goKitchen}
        onRegister={page.goRegister}
      />
    </Page>
  )
}
