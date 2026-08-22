import { Instagram, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { PublicRestaurant } from '@/types/restaurant'

import { followLinks } from './helper'
import {
  Card,
  FollowLink,
  Head,
  Hint,
  Icon,
  Kicker,
  LinkMeta,
  Links,
  LinkText,
  LinkTitle,
  Title,
} from './styled'

export interface VenueFollowProps {
  restaurant: PublicRestaurant
}

export function VenueFollow({ restaurant }: VenueFollowProps) {
  const { t } = useTranslation('customer')
  const links = followLinks(restaurant)

  if (!links.visible) return null

  return (
    <Card>
      <Head>
        <Kicker>{t('follow.kicker')}</Kicker>
        <Title>{t('follow.title')}</Title>
        <Hint>{t('follow.hint')}</Hint>
      </Head>
      <Links>
        {links.instagram && (
          <FollowLink href={links.instagram} target="_blank" rel="noopener noreferrer">
            <Icon aria-hidden>
              <Instagram size={16} />
            </Icon>
            <LinkText>
              <LinkTitle>{t('follow.instagram')}</LinkTitle>
              <LinkMeta>{t('follow.instagramMeta')}</LinkMeta>
            </LinkText>
          </FollowLink>
        )}
        {links.googleReview && (
          <FollowLink href={links.googleReview} target="_blank" rel="noopener noreferrer">
            <Icon aria-hidden>
              <Star size={16} />
            </Icon>
            <LinkText>
              <LinkTitle>{t('follow.google')}</LinkTitle>
              <LinkMeta>{t('follow.googleMeta')}</LinkMeta>
            </LinkText>
          </FollowLink>
        )}
      </Links>
    </Card>
  )
}
