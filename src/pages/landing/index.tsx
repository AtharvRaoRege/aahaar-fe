import { useTranslation } from 'react-i18next'

import { StoryEngine } from '@/components/landing/story-engine'
import { StoryFinale } from '@/components/landing/story-finale'
import { StoryFriction } from '@/components/landing/story-friction'
import { StoryHook } from '@/components/landing/story-hook'
import { BrandMark } from '@/components/global/brand-mark'
import { Button } from '@/components/global/button'

import { useStoryPage } from './helper'
import { BarActions, Brand, Page, SkipLink, StoryScroll, TopBar } from './styled'

/** One page, four chapters, read top to bottom. */
export function LandingPage() {
  const { t } = useTranslation('common')
  const page = useStoryPage()

  return (
    <Page>
      <StoryScroll />
      <TopBar>
        <Brand>
          <BrandMark size={32} />
          {t('appName')}
        </Brand>
        <BarActions>
          <SkipLink href={`#${page.chapters.finale}`}>
            {t('landing.story.skip')}
          </SkipLink>
          <Button
            variant="outline"
            size="sm"
            onClick={page.isAuthenticated ? page.goKitchen : page.goLogin}
          >
            {page.isAuthenticated ? t('landing.enterKitchen') : t('landing.login')}
          </Button>
        </BarActions>
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
