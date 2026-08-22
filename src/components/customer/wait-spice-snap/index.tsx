import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/global/button'

import { useSpiceSnap } from './helper'
import {
  Actions,
  Arena,
  Gauge,
  Header,
  Hint,
  IdleEmoji,
  IdleState,
  Kicker,
  Needle,
  Overlay,
  PopLabel,
  ResultActions,
  ResultBanner,
  ResultCard,
  ResultModal,
  ResultScore,
  Sheet,
  SnapButton,
  StatCard,
  StatLabel,
  Stats,
  StatValue,
  Subtitle,
  TimerFill,
  TimerTrack,
  Title,
  WaveBanner,
  Zone,
  ZoneCore,
} from './styled'

export interface WaitSpiceSnapProps {
  open: boolean
  onOpenChange?: (open: boolean) => void
  onExit: () => void
}

export function WaitSpiceSnap({ open, onOpenChange, onExit }: WaitSpiceSnapProps) {
  const { t } = useTranslation('customer')
  const game = useSpiceSnap()

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
        aria-labelledby="spice-snap-title"
        onClick={(event) => event.stopPropagation()}
      >
        <Header>
          <Kicker>{t('game.spice.kicker')}</Kicker>
          <Title id="spice-snap-title">{t('game.spice.name')}</Title>
          <Subtitle>{t('game.spice.subtitle')}</Subtitle>
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
          <StatCard $flash={game.waveFlash}>
            <StatLabel>{t('game.statWave')}</StatLabel>
            <StatValue>{game.playing || game.resultOpen ? game.wave : '—'}</StatValue>
          </StatCard>
        </Stats>

        {game.playing && (
          <TimerTrack aria-hidden>
            <TimerFill $progress={game.progress} $urgent={game.remainingSec <= 10} />
          </TimerTrack>
        )}

        <Arena $chaos={game.playing && game.wave >= 3}>
          {game.phase === 'idle' && (
            <IdleState>
              <IdleEmoji aria-hidden>🌶️</IdleEmoji>
              <Hint>{t('game.spice.tapHint')}</Hint>
            </IdleState>
          )}

          {game.playing && (
            <>
              <Gauge aria-hidden>
                <Zone $width={game.zoneWidth} />
                <ZoneCore $width={game.zoneWidth} />
                <Needle $left={game.needle}>🌶️</Needle>
              </Gauge>
              <SnapButton
                type="button"
                $busy={game.cooldown}
                onPointerDown={(event) => {
                  event.preventDefault()
                  game.snap()
                }}
              >
                {t('game.spice.snap')}
              </SnapButton>
            </>
          )}

          {game.pops.map((pop) => (
            <PopLabel key={pop.id} $tone={pop.tone}>
              {pop.label}
            </PopLabel>
          ))}

          {game.playing && game.waveFlash && (
            <WaveBanner>{t('game.spice.waveUp', { wave: game.wave })}</WaveBanner>
          )}

          {game.playing && game.streak >= 3 && (
            <ResultBanner>{t('game.combo', { streak: game.streak })}</ResultBanner>
          )}

          {game.resultOpen && (
            <ResultModal>
              <ResultCard>
                <Kicker>{t('game.roundOver')}</Kicker>
                <ResultScore>{game.score}</ResultScore>
                <Hint>{t(`game.spice.rank.${game.rank}`)}</Hint>
                <Hint>
                  {t('game.spice.result', {
                    score: game.score,
                    best: game.best,
                    hits: game.hits,
                  })}
                </Hint>
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
