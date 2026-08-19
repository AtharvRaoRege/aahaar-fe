import { MapPin, Phone, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { PublicRestaurant } from '@/types/restaurant'

import { useVenueHero } from './helper'
import {
  Action,
  Actions,
  Cover,
  CoverImage,
  CoverPattern,
  Dot,
  Facts,
  Hero,
  Medallion,
  Name,
  OpenState,
  Plate,
  Rating,
  RatingCount,
  TablePill,
  Tagline,
} from './styled'

export interface VenueHeroProps {
  restaurant: PublicRestaurant
  tableLabel: string | null
}

export function VenueHero({ restaurant, tableLabel }: VenueHeroProps) {
  const { t } = useTranslation(['customer', 'common'])
  const hero = useVenueHero(restaurant)

  return (
    <Hero>
      <Cover aria-hidden>
        {restaurant.coverImageUrl ? (
          <CoverImage src={restaurant.coverImageUrl} alt="" />
        ) : (
          <CoverPattern />
        )}
      </Cover>

      <Plate>
        <Medallion>
          {restaurant.logoUrl ? (
            <img src={restaurant.logoUrl} alt="" width={72} height={72} />
          ) : (
            <span aria-hidden>{hero.initials}</span>
          )}
        </Medallion>

        <Name>{restaurant.name}</Name>

        <Facts>
          {hero.rating && (
            <>
              <Rating>
                <Star aria-hidden />
                {hero.rating}
              </Rating>
              <RatingCount>
                {t('hero.ratingCount', { count: hero.ratingCount })}
              </RatingCount>
            </>
          )}
          {hero.isOpen !== null && (
            <>
              {hero.rating && <Dot aria-hidden>·</Dot>}
              <OpenState $open={hero.isOpen}>
                {hero.isOpen
                  ? hero.closesAt
                    ? t('hero.openUntil', { time: hero.closesAt })
                    : t('hero.open')
                  : hero.opensAt
                    ? t('hero.opensAt', { time: hero.opensAt })
                    : t('hero.closed')}
              </OpenState>
            </>
          )}
          {tableLabel && <TablePill>{tableLabel}</TablePill>}
        </Facts>

        {restaurant.description && <Tagline>{restaurant.description}</Tagline>}

        {(hero.telHref || hero.mapsHref) && (
          <Actions>
            {hero.telHref && (
              <Action href={hero.telHref}>
                <Phone aria-hidden />
                {t('hero.call')}
              </Action>
            )}
            {hero.mapsHref && (
              <Action href={hero.mapsHref} target="_blank" rel="noreferrer">
                <MapPin aria-hidden />
                {t('hero.directions')}
              </Action>
            )}
          </Actions>
        )}
      </Plate>
    </Hero>
  )
}
