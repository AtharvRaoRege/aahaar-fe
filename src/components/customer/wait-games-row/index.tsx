import { useTranslation } from 'react-i18next'

import type { WaitGameId } from './helper'
import { WAIT_GAME_OPTIONS } from './helper'
import { GameBlurb, GameCard, GameEmoji, GameName, Label, Row, Wrap } from './styled'

const META: Record<WaitGameId, { emoji: string; nameKey: string; blurbKey: string }> = {
  catch: {
    emoji: '🍽️',
    nameKey: 'game.catchName',
    blurbKey: 'game.catchBlurb',
  },
  spice: {
    emoji: '🌶️',
    nameKey: 'game.spice.name',
    blurbKey: 'game.spice.blurb',
  },
}

export interface WaitGamesRowProps {
  onPick: (id: WaitGameId) => void
}

export function WaitGamesRow({ onPick }: WaitGamesRowProps) {
  const { t } = useTranslation('customer')

  return (
    <Wrap>
      <Label>{t('game.playWhileWait')}</Label>
      <Row>
        {WAIT_GAME_OPTIONS.map((id) => {
          const meta = META[id]
          return (
            <GameCard key={id} type="button" onClick={() => onPick(id)}>
              <GameEmoji aria-hidden>{meta.emoji}</GameEmoji>
              <GameName>{t(meta.nameKey)}</GameName>
              <GameBlurb>{t(meta.blurbKey)}</GameBlurb>
            </GameCard>
          )
        })}
      </Row>
    </Wrap>
  )
}
