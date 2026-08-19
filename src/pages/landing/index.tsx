import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { BrandMark } from '@/components/global/brand-mark'
import { Button } from '@/components/global/button'
import { Sticker } from '@/components/global/sticker'

import { FLOW, MARQUEE_LOOP, useLandingPage } from './helper'
import {
  Brand,
  CtaBand,
  CtaBody,
  CtaKicker,
  CtaRow,
  CtaTitle,
  Flow,
  FlowBody,
  FlowItem,
  FlowList,
  FlowName,
  FlowNum,
  Footer,
  FooterBrand,
  Headline,
  Hero,
  HeroArt,
  HeroInner,
  Lede,
  Marquee,
  MarqueeItem,
  MarqueeTrack,
  Page,
  SectionKicker,
  SectionTitle,
  Split,
  SplitBody,
  SplitPane,
  SplitTitle,
  StickerRow,
  TopBar,
} from './styled'

export function LandingPage() {
  const { t } = useTranslation('common')
  const page = useLandingPage()

  return (
    <Page>
      <TopBar>
        <Brand>
          <BrandMark size={40} />
          {t('appName')}
        </Brand>
        <Button
          variant="outline"
          size="sm"
          onClick={page.isAuthenticated ? page.goKitchen : page.goLogin}
        >
          {page.isAuthenticated ? t('landing.enterKitchen') : t('landing.login')}
        </Button>
      </TopBar>

      <Hero>
        <HeroInner>
          <StickerRow>
            <Sticker tone="tomato" rotate={-3}>
              {t('landing.stickerQr')}
            </Sticker>
            <Sticker tone="violet" rotate={2}>
              {t('landing.stickerNoApp')}
            </Sticker>
          </StickerRow>
          <Headline>
            {t('landing.headline1')}
            <br />
            {t('landing.headline2')}
            <br />
            <span>{t('landing.headline3')}</span>
          </Headline>
          <Lede>{t('landing.lede')}</Lede>
          <CtaRow>
            {page.isAuthenticated ? (
              <>
                <Button
                  size="lg"
                  rightIcon={<ArrowRight aria-hidden />}
                  onClick={page.goKitchen}
                >
                  {t('landing.enterKitchen')}
                </Button>
                <Button variant="secondary" size="lg" onClick={page.goDemo}>
                  {t('landing.tryDemo')}
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="lg"
                  rightIcon={<ArrowRight aria-hidden />}
                  onClick={page.goDemo}
                >
                  {t('landing.tryDemo')}
                </Button>
                <Button variant="secondary" size="lg" onClick={page.goRegister}>
                  {t('landing.openKitchen')}
                </Button>
              </>
            )}
          </CtaRow>
        </HeroInner>
        <HeroArt aria-hidden>🍛</HeroArt>
      </Hero>

      <Marquee aria-hidden>
        <MarqueeTrack>
          {MARQUEE_LOOP.map((key, index) => (
            <MarqueeItem key={`${key}-${index}`}>★ {t(key)}</MarqueeItem>
          ))}
        </MarqueeTrack>
      </Marquee>

      <Flow>
        <SectionKicker>{t('landing.flowKicker')}</SectionKicker>
        <SectionTitle>{t('landing.flowTitle')}</SectionTitle>
        <FlowList>
          {FLOW.map((step, index) => (
            <FlowItem key={step.mark} $shift={index % 2 === 1}>
              <FlowNum aria-hidden>{step.mark}</FlowNum>
              <div>
                <FlowName>{t(step.titleKey)}</FlowName>
                <FlowBody>{t(step.bodyKey)}</FlowBody>
              </div>
            </FlowItem>
          ))}
        </FlowList>
      </Flow>

      <Split>
        <SplitPane $tone="cream">
          <SectionKicker>{t('landing.splitKicker')}</SectionKicker>
          <SplitTitle>{t('landing.dinersTitle')}</SplitTitle>
          <SplitBody>{t('landing.dinersBody')}</SplitBody>
        </SplitPane>
        <SplitPane $tone="mango">
          <SectionKicker>{t('landing.splitKicker')}</SectionKicker>
          <SplitTitle>{t('landing.kitchenTitle')}</SplitTitle>
          <SplitBody>{t('landing.kitchenBody')}</SplitBody>
        </SplitPane>
      </Split>

      <CtaBand>
        <CtaKicker>{t('landing.ctaKicker')}</CtaKicker>
        <CtaTitle>{t('landing.ctaTitle')}</CtaTitle>
        <CtaBody>{t('landing.ctaBody')}</CtaBody>
        <CtaRow>
          <Button size="lg" rightIcon={<ArrowRight aria-hidden />} onClick={page.goDemo}>
            {t('landing.tryDemo')}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={page.isAuthenticated ? page.goKitchen : page.goLogin}
          >
            {page.isAuthenticated ? t('landing.enterKitchen') : t('landing.staffDashboard')}
          </Button>
        </CtaRow>
      </CtaBand>

      <Footer>
        <FooterBrand>
          <BrandMark size={28} />
          {t('appName')}
        </FooterBrand>
        <span>{t('landing.footerNote')}</span>
      </Footer>
    </Page>
  )
}
