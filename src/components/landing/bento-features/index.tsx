import { useTranslation } from 'react-i18next'

import { LineIcon } from '@/components/landing/icons'
import { SectionHead } from '@/components/landing/kit'
import { Doodle, GhostType } from '@/components/landing/kit/styled'
import { BENTO_CELLS } from '@/constants/landing'
import { useStaggerGroup } from '@/hooks/landing/use-stagger-group/helper'
import type { RailCard } from '@/constants/landing'

import { Cell, CellBody, CellIcon, CellTitle, Grid, Section } from './styled'

interface BentoCellProps {
  cell: RailCard
  title: string
  body: string
  delay: number
  shown: boolean
}

function BentoCell({ cell, title, body, delay, shown }: BentoCellProps) {
  const skin = cell.skin ?? 'paper'

  return (
    <Cell $skin={skin} $in={shown} $delay={delay}>
      <CellIcon $skin={skin}>
        <LineIcon name={cell.icon} />
      </CellIcon>
      <CellTitle>{title}</CellTitle>
      <CellBody>{body}</CellBody>
    </Cell>
  )
}

export function BentoFeatures() {
  const { t } = useTranslation('common')
  const { ref: gridRef, shown } = useStaggerGroup<HTMLDivElement>({ amount: 0.15 })

  return (
    <Section>
      <GhostType $bottom="-4%" $left="-8%" aria-hidden>
        {t('landing.bento.ghost')}
      </GhostType>
      <Doodle $size={26} $tone="chili" $float="a" $top="2%" $left="8%" aria-hidden>
        <LineIcon name="chili" />
      </Doodle>
      <Doodle $size={24} $tone="mint" $float="b" $top="4%" $right="10%" aria-hidden>
        <LineIcon name="grid3" />
      </Doodle>

      <SectionHead
        eyebrow={t('landing.bento.eyebrow')}
        title={
          <>
            {t('landing.bento.titleTop')}
            <br />
            {t('landing.bento.titleBottom')}
          </>
        }
      />
      <Grid ref={gridRef}>
        {BENTO_CELLS.map((cell, index) => (
          <BentoCell
            key={cell.key}
            cell={cell}
            title={t(`landing.bento.${cell.key}.title`)}
            body={t(`landing.bento.${cell.key}.body`)}
            delay={Math.min(index, 5) * 100}
            shown={shown}
          />
        ))}
      </Grid>
    </Section>
  )
}
