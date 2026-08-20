import { useTranslation } from 'react-i18next'

import { useReveal } from '@/hooks/landing/use-reveal/helper'

import { useCreatorFooter } from './helper'
import {
  Accent,
  Bottom,
  ContactCard,
  ContactGrid,
  ContactKind,
  ContactValue,
  Copy,
  Eyebrow,
  Ghost,
  Identity,
  Inner,
  Kicker,
  Links,
  Name,
  Photo,
  PhotoFrame,
  PhotoStage,
  ReachLabel,
  Rights,
  Role,
  Shell,
  Social,
  Stamp,
  Story,
  Strip,
  StripTrack,
  Title,
} from './styled'

export function CreatorFooter() {
  const { t } = useTranslation('common')
  const { year, links, photo } = useCreatorFooter()
  const { ref: photoRef, shown: photoShown } = useReveal<HTMLDivElement>({ amount: 0.25 })
  const { ref: copyRef, shown: copyShown } = useReveal<HTMLDivElement>({ amount: 0.2 })
  const strip = t('landing.creator.strip')

  return (
    <Shell>
      <Strip aria-hidden>
        <StripTrack>
          <span>{strip}</span>
          <span>{strip}</span>
          <span>{strip}</span>
          <span>{strip}</span>
        </StripTrack>
      </Strip>

      <Ghost aria-hidden>AAHAAR</Ghost>

      <Inner>
        <PhotoStage ref={photoRef} $in={photoShown}>
          <PhotoFrame>
            <Photo src={photo} alt={t('landing.creator.photoAlt')} width={148} height={148} />
          </PhotoFrame>
          <Stamp>{t('landing.creator.stamp')}</Stamp>
        </PhotoStage>

        <Copy ref={copyRef} $in={copyShown}>
          <Eyebrow>{t('landing.creator.eyebrow')}</Eyebrow>
          <Kicker>{t('landing.creator.kicker')}</Kicker>
          <Title>
            {t('landing.creator.titleTop')}
            <Accent>{t('landing.creator.titleAccent')}</Accent>
          </Title>
          <Story>{t('landing.creator.story')}</Story>

          <Identity>
            <Name>{t('landing.creator.name')}</Name>
            <Role>{t('landing.creator.role')}</Role>
          </Identity>

          <ReachLabel>{t('landing.creator.reach')}</ReachLabel>
          <Links>
            <Social href={links.instagram} target="_blank" rel="noopener noreferrer">
              {t('landing.creator.instagram')}
            </Social>
            <Social href={links.linkedin} target="_blank" rel="noopener noreferrer">
              {t('landing.creator.linkedin')}
            </Social>
          </Links>

          <ReachLabel>{t('landing.creator.support')}</ReachLabel>
          <ContactGrid>
            <ContactCard href={links.phoneHref}>
              <ContactKind>{t('landing.creator.call')}</ContactKind>
              <ContactValue>{links.phoneDisplay}</ContactValue>
            </ContactCard>
            <ContactCard href={links.emailHref}>
              <ContactKind>{t('landing.creator.email')}</ContactKind>
              <ContactValue>{links.emailDisplay}</ContactValue>
            </ContactCard>
          </ContactGrid>
        </Copy>
      </Inner>

      <Bottom>
        <Rights>{t('landing.creator.rights', { year })}</Rights>
        <Rights>{t('landing.footer')}</Rights>
      </Bottom>
    </Shell>
  )
}
