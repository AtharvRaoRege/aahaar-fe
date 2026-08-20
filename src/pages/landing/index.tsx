import { useTranslation } from 'react-i18next'

import { BentoFeatures } from '@/components/landing/bento-features'
import { DishGallery } from '@/components/landing/dish-gallery'
import { FaqBlock } from '@/components/landing/faq-block'
import { FeatureRail } from '@/components/landing/feature-rail'
import { FinalCta } from '@/components/landing/final-cta'
import { GuestJourney } from '@/components/landing/guest-journey'
import { HeroScan } from '@/components/landing/hero-scan'
import { HowItWorks } from '@/components/landing/how-it-works'
import { KitchenTicket } from '@/components/landing/kitchen-ticket'
import { LandingHeader } from '@/components/landing/landing-header'
import { MoneyCompare } from '@/components/landing/money-compare'
import { PricingPlans } from '@/components/landing/pricing-plans'
import { StatsStrip } from '@/components/landing/stats-strip'
import { StoryBeats } from '@/components/landing/story-beats'
import { Testimonials } from '@/components/landing/testimonials'
import { TickerTape } from '@/components/landing/ticker-tape'
import { FoodChipArt } from '@/components/landing/art'
import { Marquee } from '@/components/landing/kit'
import { FoodChip, Grain, Perf } from '@/components/landing/kit/styled'
import { FLOOR_CARDS, GUEST_CARDS, OWNER_CARDS } from '@/constants/landing'

import { useLandingPage } from './helper'
import { Page } from './styled'

/** Marketing page: one scroll, from the QR on the table to the price of it. */
export function LandingPage() {
  const { t } = useTranslation('common')
  const page = useLandingPage()

  const marqueeTop = t('landing.marqueeTop', { returnObjects: true })
  const marqueeBottom = t('landing.marqueeBottom', { returnObjects: true })

  return (
    <Page>
      <Grain aria-hidden />
      <LandingHeader
        isAuthenticated={page.isAuthenticated}
        pricingId={page.sections.pricing}
        onPrimary={page.goPrimary}
      />

      <HeroScan
        id={page.sections.top}
        isAuthenticated={page.isAuthenticated}
        onPrimary={page.goPrimary}
      />

      <Marquee words={Array.isArray(marqueeTop) ? (marqueeTop as string[]) : []} />
      <Perf />

      <StatsStrip />
      <Perf $dark />

      <HowItWorks />
      <Perf />

      <StoryBeats />
      <DishGallery />

      <FeatureRail
        scope="guest"
        cards={GUEST_CARDS}
        title={t('landing.guest.title')}
        ghostLeft={false}
      >
        <FoodChip $top="2%" $left="6%" aria-hidden>
          <FoodChipArt kind="samosa" />
        </FoodChip>
      </FeatureRail>

      <Perf $dark />
      <KitchenTicket />

      <FeatureRail
        scope="floor"
        cards={FLOOR_CARDS}
        title={t('landing.floor.title')}
        dark
        ghostLeft
      />

      <Perf />
      <BentoFeatures />
      <Perf />

      <FeatureRail scope="owner" cards={OWNER_CARDS} title={t('landing.owner.title')}>
        <FoodChip $top="4%" $right="8%" aria-hidden>
          <FoodChipArt kind="biryani" />
        </FoodChip>
      </FeatureRail>

      <MoneyCompare />
      <GuestJourney />
      <TickerTape />

      <Marquee
        words={Array.isArray(marqueeBottom) ? (marqueeBottom as string[]) : []}
        light
        reverse
      />

      <Testimonials />
      <Perf />
      <PricingPlans id={page.sections.pricing} />
      <Perf $dark />
      <FaqBlock />
      <Perf />
      <FinalCta
        id={page.sections.start}
        isAuthenticated={page.isAuthenticated}
        onPrimary={page.goPrimary}
      />
    </Page>
  )
}
