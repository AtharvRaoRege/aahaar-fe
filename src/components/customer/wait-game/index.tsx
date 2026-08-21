import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'

import { dishTopPercent, useWaitGame } from './helper'
import {
  Actions,
  Arena,
  DishButton,
  Header,
  Hint,
  IdleEmoji,
  IdleState,
  Kicker,
  Overlay,
  PopLabel,
  ResultActions,
  ResultBanner,
  ResultCard,
  ResultModal,
  ResultScore,
  Sheet,
  StatCard,
  StatLabel,
  Stats,
  StatValue,
  Subtitle,
  TimerFill,
  TimerTrack,
  Title,
} from './styled'

export interface WaitGameProps {
  open: boolean
  onOpenChange?: (open: boolean) => void
  /** Called when the guest exits — usually navigate to cart. */
  onExit: () => void
}

export function WaitGame({ open, onOpenChange, onExit }: WaitGameProps) {
  const { t } = useTranslation('customer')
  const game = useWaitGame()

  if (!open) return null

  const exit = () => {
    game.reset()
    onOpenChange?.(false)
    onExit()
  }

  return createPortal(
    <Overlay role="presentation">
      <Sheet
        role="dialog"
        aria-modal="true"
        aria-labelledby="wait-game-title"
        onClick={(event) => event.stopPropagation()}
      >
        <Header>
          <Kicker>{t('game.title')}</Kicker>
          <Title id="wait-game-title">{t('game.headline')}</Title>
          <Subtitle>{t('game.subtitle')}</Subtitle>
        </Header>

        <Stats>
          <StatCard $flash={game.comboFlash}>
            <StatLabel>{t('game.statScore')}</StatLabel>
            <StatValue>{game.score}</StatValue>
          </StatCard>
          <StatCard $accent>
            <StatLabel>{t('game.statTime')}</StatLabel>
            <StatValue>{game.playing ? game.remainingSec : '—'}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>{t('game.statBest')}</StatLabel>
            <StatValue>{game.best}</StatValue>
          </StatCard>
        </Stats>

        {game.playing && (
          <TimerTrack aria-hidden>
            <TimerFill $progress={game.progress} />
          </TimerTrack>
        )}

        <Arena>
          {game.phase === 'idle' && (
            <IdleState>
              <IdleEmoji aria-hidden>🍽️</IdleEmoji>
              <Hint>{t('game.tapHint')}</Hint>
            </IdleState>
          )}

          {game.dishes.map((dish) => {
            const top = dishTopPercent(dish, game.now)
            return (
              <DishButton
                key={dish.id}
                type="button"
                $left={dish.left}
                $top={top}
                $rare={dish.points > 1}
                onPointerDown={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  const arena = event.currentTarget.parentElement
                  if (!arena) {
                    game.tap(dish.id, dish.left, top)
                    return
                  }
                  const rect = arena.getBoundingClientRect()
                  const x = ((event.clientX - rect.left) / rect.width) * 100
                  const y = ((event.clientY - rect.top) / rect.height) * 100
                  game.tap(dish.id, x, y)
                }}
                aria-label={dish.emoji}
              >
                {dish.emoji}
              </DishButton>
            )
          })}

          {game.pops.map((pop) => (
            <PopLabel key={pop.id} $x={pop.x} $y={pop.y}>
              {pop.label}
            </PopLabel>
          ))}

          {game.resultOpen && (
            <ResultModal>
              <ResultCard>
                <Kicker>{t('game.roundOver')}</Kicker>
                <ResultScore>{game.score}</ResultScore>
                <Hint>{t('game.result', { score: game.score, best: game.best })}</Hint>
                <ResultActions>
                  <Button type="button" variant="outline" onClick={exit}>
                    {t('game.exit')}
                  </Button>
                  <Button type="button" onClick={game.start}>
                    {t('game.again')}
                  </Button>
                </ResultActions>
              </ResultCard>
            </ResultModal>
          )}
        </Arena>

        {game.playing && game.streak >= 4 && (
          <ResultBanner>{t('game.combo', { streak: game.streak })}</ResultBanner>
        )}

        {game.phase !== 'result' && (
          <Actions>
            <Button type="button" variant="outline" onClick={exit}>
              {game.playing ? t('game.skip') : t('game.exit')}
            </Button>
            <Button type="button" onClick={game.start} disabled={game.playing}>
              {t('game.play')}
            </Button>
          </Actions>
        )}
      </Sheet>
    </Overlay>,
    document.body,
  )
}
