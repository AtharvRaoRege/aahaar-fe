import { useCallback, useEffect, useRef, useState } from 'react'

const DISHES = ['🥟', '🍕', '🍜', '🥗', '🍔', '🍣', '🌮', '🍩', '🍗', '🥐', '🥘', '🧁'] as const
const GOLDEN_EMOJI = '⭐'
const BOMB_EMOJI = '💣'
const SLOW_EMOJI = '🧊'

/** Longer wait-friendly round — guests often wait several minutes. */
export const ROUND_MS = 60_000
const FALL_MS = 3800
const WAVE_MS = 15_000
const BEST_KEY = 'aahaar.wait-game.best'

export type WaitGamePhase = 'idle' | 'playing' | 'result'
export type DishKind = 'normal' | 'golden' | 'bomb' | 'slow'

export interface FloatingDish {
  id: number
  emoji: string
  kind: DishKind
  left: number
  bornAt: number
  points: number
  speed: number
  swayAmp: number
  swayCycles: number
}

export interface PopScore {
  id: number
  x: number
  y: number
  label: string
  tone: 'good' | 'bad' | 'bonus'
}

function readBest(): number {
  try {
    const raw = sessionStorage.getItem(BEST_KEY)
    const value = raw ? Number(raw) : 0
    return Number.isFinite(value) && value > 0 ? value : 0
  } catch {
    return 0
  }
}

function writeBest(score: number) {
  try {
    sessionStorage.setItem(BEST_KEY, String(score))
  } catch {
    // ignore
  }
}

function difficultyAt(elapsedMs: number) {
  const t = Math.min(1, Math.max(0, elapsedMs / ROUND_MS))
  // Ease-in so the first ~15s stay friendly, then it ramps hard.
  const curve = t * t
  return {
    t,
    spawnMs: 920 - curve * 580,
    baseSpeed: 0.72 + curve * 1.15,
    maxOnScreen: Math.round(4 + curve * 7),
    bombChance: curve > 0.18 ? 0.08 + curve * 0.14 : 0,
    goldenChance: 0.08 + curve * 0.1,
    slowChance: curve > 0.12 ? 0.06 + curve * 0.06 : 0,
    swayAmp: 2 + curve * 10,
    swayCycles: 1.2 + curve * 1.8,
  }
}

function pickKind(diff: ReturnType<typeof difficultyAt>): DishKind {
  const roll = Math.random()
  if (roll < diff.bombChance) return 'bomb'
  if (roll < diff.bombChance + diff.goldenChance) return 'golden'
  if (roll < diff.bombChance + diff.goldenChance + diff.slowChance) return 'slow'
  return 'normal'
}

function makeDish(
  id: number,
  elapsedMs: number,
): FloatingDish {
  const diff = difficultyAt(elapsedMs)
  const kind = pickKind(diff)
  const jitter = 0.75 + Math.random() * 0.55
  if (kind === 'bomb') {
    return {
      id,
      emoji: BOMB_EMOJI,
      kind,
      left: 12 + Math.random() * 76,
      bornAt: Date.now(),
      points: -2,
      speed: (diff.baseSpeed + 0.35) * jitter,
      swayAmp: diff.swayAmp * 1.2,
      swayCycles: diff.swayCycles * 1.3,
    }
  }
  if (kind === 'golden') {
    return {
      id,
      emoji: GOLDEN_EMOJI,
      kind,
      left: 12 + Math.random() * 76,
      bornAt: Date.now(),
      points: 5,
      speed: (diff.baseSpeed + 0.55) * jitter,
      swayAmp: diff.swayAmp * 0.7,
      swayCycles: diff.swayCycles,
    }
  }
  if (kind === 'slow') {
    return {
      id,
      emoji: SLOW_EMOJI,
      kind,
      left: 12 + Math.random() * 76,
      bornAt: Date.now(),
      points: 2,
      speed: Math.max(0.45, diff.baseSpeed * 0.55) * jitter,
      swayAmp: diff.swayAmp * 0.4,
      swayCycles: 0.8,
    }
  }
  return {
    id,
    emoji: DISHES[id % DISHES.length],
    kind: 'normal',
    left: 12 + Math.random() * 76,
    bornAt: Date.now(),
    points: 1,
    speed: diff.baseSpeed * jitter,
    swayAmp: diff.swayAmp,
    swayCycles: diff.swayCycles,
  }
}

export function useWaitGame() {
  const [phase, setPhase] = useState<WaitGamePhase>('idle')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(readBest)
  const [streak, setStreak] = useState(0)
  const [remainingMs, setRemainingMs] = useState(ROUND_MS)
  const [dishes, setDishes] = useState<FloatingDish[]>([])
  const [pops, setPops] = useState<PopScore[]>([])
  const [comboFlash, setComboFlash] = useState(false)
  const [waveFlash, setWaveFlash] = useState(false)
  const [now, setNow] = useState(() => Date.now())
  const [wave, setWave] = useState(1)
  const [caught, setCaught] = useState(0)
  const [bombsHit, setBombsHit] = useState(0)

  const nextId = useRef(0)
  const scoreRef = useRef(0)
  const streakRef = useRef(0)
  const caughtRef = useRef(0)
  const bombsRef = useRef(0)
  const dishesRef = useRef<FloatingDish[]>([])
  const phaseRef = useRef<WaitGamePhase>('idle')
  const waveRef = useRef(1)
  const startedRef = useRef(0)

  useEffect(() => {
    dishesRef.current = dishes
  }, [dishes])

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  useEffect(() => {
    if (phase !== 'playing') return

    const started = Date.now()
    startedRef.current = started
    const tick = window.setInterval(() => {
      const stamp = Date.now()
      setNow(stamp)
      const elapsed = stamp - started
      const left = Math.max(0, ROUND_MS - elapsed)
      setRemainingMs(left)

      const nextWave = Math.min(4, Math.floor(elapsed / WAVE_MS) + 1)
      if (nextWave !== waveRef.current) {
        waveRef.current = nextWave
        setWave(nextWave)
        setWaveFlash(true)
        window.setTimeout(() => setWaveFlash(false), 900)
      }

      const kept = dishesRef.current.filter((dish) => {
        const lifetime = FALL_MS / dish.speed
        return stamp - dish.bornAt < lifetime
      })
      if (kept.length !== dishesRef.current.length) {
        const missed = dishesRef.current.length - kept.length
        if (missed > 0) {
          streakRef.current = 0
          setStreak(0)
        }
        dishesRef.current = kept
        setDishes(kept)
      }

      if (left <= 0) {
        window.clearInterval(tick)
        dishesRef.current = []
        setDishes([])
        setBest((current) => {
          const next = Math.max(current, scoreRef.current)
          writeBest(next)
          return next
        })
        phaseRef.current = 'result'
        setPhase('result')
      }
    }, 40)

    let spawnTimer = 0
    const scheduleSpawn = () => {
      const elapsed = Date.now() - startedRef.current
      const diff = difficultyAt(elapsed)
      spawnTimer = window.setTimeout(() => {
        if (phaseRef.current !== 'playing') return
        if (dishesRef.current.length >= diff.maxOnScreen) {
          scheduleSpawn()
          return
        }
        const id = nextId.current
        nextId.current += 1
        const next = makeDish(id, elapsed)
        const merged = [...dishesRef.current, next].slice(-diff.maxOnScreen)
        dishesRef.current = merged
        setDishes(merged)
        scheduleSpawn()
      }, Math.max(220, diff.spawnMs))
    }
    scheduleSpawn()

    return () => {
      window.clearInterval(tick)
      window.clearTimeout(spawnTimer)
    }
  }, [phase])

  useEffect(() => {
    if (pops.length === 0) return
    const clear = window.setTimeout(() => setPops((current) => current.slice(1)), 560)
    return () => window.clearTimeout(clear)
  }, [pops])

  const start = useCallback(() => {
    scoreRef.current = 0
    streakRef.current = 0
    caughtRef.current = 0
    bombsRef.current = 0
    dishesRef.current = []
    waveRef.current = 1
    setScore(0)
    setStreak(0)
    setCaught(0)
    setBombsHit(0)
    setWave(1)
    setDishes([])
    setPops([])
    setComboFlash(false)
    setWaveFlash(false)
    setRemainingMs(ROUND_MS)
    phaseRef.current = 'playing'
    setPhase('playing')
  }, [])

  const reset = useCallback(() => {
    dishesRef.current = []
    streakRef.current = 0
    phaseRef.current = 'idle'
    setPhase('idle')
    setDishes([])
    setPops([])
    setStreak(0)
    setComboFlash(false)
    setWaveFlash(false)
    setRemainingMs(ROUND_MS)
    setWave(1)
  }, [])

  const tap = useCallback((id: number, x: number, y: number) => {
    if (phaseRef.current !== 'playing') return
    const target = dishesRef.current.find((dish) => dish.id === id)
    if (!target) return

    const next = dishesRef.current.filter((dish) => dish.id !== id)
    dishesRef.current = next
    setDishes(next)

    if (target.kind === 'bomb') {
      streakRef.current = 0
      setStreak(0)
      bombsRef.current += 1
      setBombsHit(bombsRef.current)
      scoreRef.current = Math.max(0, scoreRef.current + target.points)
      setScore(scoreRef.current)
      setPops((current) => [
        ...current.slice(-5),
        {
          id: nextId.current++,
          x,
          y,
          label: tBombLabel(target.points),
          tone: 'bad',
        },
      ])
      return
    }

    streakRef.current += 1
    const streakNow = streakRef.current
    setStreak(streakNow)
    caughtRef.current += 1
    setCaught(caughtRef.current)
    const multiplier = streakNow >= 10 ? 4 : streakNow >= 7 ? 3 : streakNow >= 4 ? 2 : 1
    const gained = target.points * multiplier
    scoreRef.current += gained
    setScore(scoreRef.current)
    setPops((current) => [
      ...current.slice(-5),
      {
        id: nextId.current++,
        x,
        y,
        label:
          multiplier > 1
            ? `+${gained}×${multiplier}`
            : target.kind === 'golden'
              ? `+${gained} ★`
              : `+${gained}`,
        tone: target.kind === 'golden' ? 'bonus' : 'good',
      },
    ])
    if (multiplier > 1 || target.kind === 'golden') {
      setComboFlash(true)
      window.setTimeout(() => setComboFlash(false), 300)
    }
  }, [])

  const rank = rankForScore(score)

  return {
    phase,
    playing: phase === 'playing',
    resultOpen: phase === 'result',
    score,
    best,
    streak,
    comboFlash,
    waveFlash,
    wave,
    caught,
    bombsHit,
    remainingSec: Math.ceil(remainingMs / 1000),
    progress: remainingMs / ROUND_MS,
    dishes,
    pops,
    now,
    rank,
    start,
    reset,
    tap,
  }
}

function tBombLabel(points: number) {
  return points < 0 ? `${points}` : '💥'
}

function rankForScore(score: number): string {
  if (score >= 120) return 'legend'
  if (score >= 80) return 'chef'
  if (score >= 45) return 'sous'
  if (score >= 20) return 'line'
  return 'prep'
}

export function waitGameSeenKey(orderId: string): string {
  return `aahaar.wait-game.${orderId}`
}

export function shouldAutoOpenWaitGame(orderId: string): boolean {
  if (typeof sessionStorage === 'undefined') return false
  const key = waitGameSeenKey(orderId)
  if (sessionStorage.getItem(key) === '1') return false
  sessionStorage.setItem(key, '1')
  return true
}

export function dishTopPercent(dish: FloatingDish, now = Date.now()): number {
  const lifetime = FALL_MS / dish.speed
  const t = Math.min(1, Math.max(0, (now - dish.bornAt) / lifetime))
  // Slight ease so late-game speed feels snappier near the bottom.
  const eased = t * t * (3 - 2 * t)
  return -8 + eased * 108
}

export function dishLeftPercent(dish: FloatingDish, now = Date.now()): number {
  const lifetime = FALL_MS / dish.speed
  const t = Math.min(1, Math.max(0, (now - dish.bornAt) / lifetime))
  const sway = Math.sin(t * Math.PI * dish.swayCycles) * dish.swayAmp
  return Math.min(88, Math.max(8, dish.left + sway))
}
