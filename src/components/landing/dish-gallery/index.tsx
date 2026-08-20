import { useTranslation } from 'react-i18next'

import { DishArt, FoodChipArt } from '@/components/landing/art'
import { LineIcon } from '@/components/landing/icons'
import { SectionHead } from '@/components/landing/kit'
import { Doodle, FoodChip, GhostType, ScrollHint } from '@/components/landing/kit/styled'
import { DISH_TILES } from '@/constants/landing'
import { useStaggerGroup } from '@/hooks/landing/use-stagger-group/helper'
import type { DishArtKind } from '@/components/landing/art'

import {
  Dish,
  DishArtBox,
  DishBody,
  DishName,
  DishPrice,
  DishTag,
  Row,
  Section,
} from './styled'

interface DishCardProps {
  art: DishArtKind
  skin: string
  name: string
  price: string
  tag: string
  delay: number
  shown: boolean
}

function DishCard({ art, skin, name, price, tag, delay, shown }: DishCardProps) {
  return (
    <Dish $in={shown} $delay={delay}>
      <DishArtBox $skin={skin}>
        <span>
          <DishArt kind={art} />
        </span>
      </DishArtBox>
      <DishBody>
        <DishName>{name}</DishName>
        <DishPrice>{price}</DishPrice>
        <DishTag>{tag}</DishTag>
      </DishBody>
    </Dish>
  )
}

export function DishGallery() {
  const { t } = useTranslation('common')
  const { ref: rowRef, shown } = useStaggerGroup<HTMLDivElement>({ amount: 0.15 })

  return (
    <Section>
      <GhostType $top="-4%" $right="-8%" aria-hidden>
        {t('landing.gallery.ghost')}
      </GhostType>
      <Doodle $size={26} $tone="turmeric" $float="b" $top="2%" $left="8%" aria-hidden>
        <LineIcon name="chili" />
      </Doodle>
      <FoodChip $top="4%" $right="10%" aria-hidden>
        <FoodChipArt kind="dosa" />
      </FoodChip>

      <SectionHead eyebrow={t('landing.gallery.eyebrow')} title={t('landing.gallery.title')} />
      <Row ref={rowRef}>
        {DISH_TILES.map((tile, index) => (
          <DishCard
            key={tile.key}
            art={tile.art}
            skin={tile.skin}
            name={t(`landing.gallery.${tile.key}.name`)}
            price={t(`landing.gallery.${tile.key}.price`)}
            tag={t(`landing.gallery.${tile.key}.tag`)}
            delay={Math.min(index, 5) * 100}
            shown={shown}
          />
        ))}
      </Row>
      <ScrollHint>
        <span>{t('landing.gallery.swipe')}</span>
      </ScrollHint>
    </Section>
  )
}
