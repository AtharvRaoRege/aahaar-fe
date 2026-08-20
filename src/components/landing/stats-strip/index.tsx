import { useTranslation } from 'react-i18next'

import { LineIcon } from '@/components/landing/icons'
import { Doodle, Eyebrow, GhostType } from '@/components/landing/kit/styled'
import { STAT_TILES } from '@/constants/landing'

import { useCountTile } from './helper'
import { Grid, Label, Num, Section, Tile, Title } from './styled'

interface StatProps {
  target: number
  suffix: string
  label: string
  delay: number
}

function Stat({ target, suffix, label, delay }: StatProps) {
  const { ref, shown, value } = useCountTile(target)

  return (
    <Tile ref={ref} $in={shown} $delay={delay}>
      <Num>
        {value}
        {suffix}
      </Num>
      <Label>{label}</Label>
    </Tile>
  )
}

export function StatsStrip() {
  const { t } = useTranslation('common')

  return (
    <Section>
      <GhostType $tone="paper" $top="-4%" $right="-8%" aria-hidden>
        {t('landing.stats.ghost')}
      </GhostType>
      <Doodle $size={28} $tone="paper" $float="a" $top="6%" $left="8%" aria-hidden>
        <LineIcon name="star" />
      </Doodle>
      <Doodle $size={24} $tone="paper" $float="b" $top="10%" $right="10%" aria-hidden>
        <LineIcon name="clock9" />
      </Doodle>

      <Eyebrow $tone="turmeric">{t('landing.stats.eyebrow')}</Eyebrow>
      <Title>
        {t('landing.stats.titleTop')}
        <br />
        {t('landing.stats.titleBottom')}
      </Title>
      <Grid>
        {STAT_TILES.map((tile, index) => (
          <Stat
            key={tile.key}
            target={tile.target}
            suffix={tile.suffix}
            label={t(`landing.stats.${tile.key}`)}
            delay={index * 90}
          />
        ))}
      </Grid>
    </Section>
  )
}
