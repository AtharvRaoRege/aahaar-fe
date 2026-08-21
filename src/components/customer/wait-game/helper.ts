import { useCallback, useEffect, useRef, useState } from 'react'

const DISHES = ['🥟', '🍕', '🍜', '🥗', '🍔', '🍣', '🌮', '🍩', '🍗', '🥐'] as const
const ROUND_MS = 25_000
const BASE_SPAWN_MS = 780
const FALL_MS = 3200

export type WaitGamePhase = 'idle' | 'playing' | 'result'

export interface FloatingDish {
  id: number
  emoji: string
  left: number
  bornAt: number
  points: number
  speed: number
}

export interface PopScore {
  id: number
  x: number
  y: number
  label: string
}

export function useWaitGame() {
  const [phase, setPhase] = useState<WaitGamePhase>('idle')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [streak, setStreak] = useState(0)
  const [remainingMs, setRemainingMs] = useState(ROUND_MS)
  const [dishes, setDishes] = useState<FloatingDish[]>([])
  const [pops, setPops] = useState<PopScore[]>([])
  const [comboFlash, setComboFlash] = useState(false)
  const [now, setNow] = useState(() => Date.now())

  const nextId = useRef(0)
  const scoreRef = useRef(0)
  const streakRef = useRef(0)
  const dishesRef = useRef<FloatingDish[]>([])
  const phaseRef = useRef<WaitGamePhase>('idle')

  useEffect(() => {
    dishesRef.current = dishes
  }, [dishes])

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  useEffect(() => {
    if (phase !== 'playing') return

    const started = Date.now()
    const tick = window.setInterval(() => {
      const stamp = Date.now()
      setNow(stamp)
      const left = Math.max(0, ROUND_MS - (stamp - started))
      setRemainingMs(left)

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
        setBest((current) => Math.max(current, scoreRef.current))
        phaseRef.current = 'result'
        setPhase('result')
      }
    }, 50)

    let spawnTimer = 0
    const scheduleSpawn = () => {
      const haste = Math.min(0.45, scoreRef.current * 0.012)
      const delay = BASE_SPAWN_MS * (1 - haste)
      spawnTimer = window.setTimeout(() => {
        if (phaseRef.current !== 'playing') return
        const id = nextId.current
        nextId.current += 1
        const rare = Math.random() > 0.82
        const next: FloatingDish = {
          id,
          emoji: DISHES[id % DISHES.length],
          left: 10 + Math.random() * 70,
          bornAt: Date.now(),
          points: rare ? 3 : 1,
          speed: rare ? 1.25 : 0.85 + Math.random() * 0.45,
        }
        const merged = [...dishesRef.current.slice(-7), next]
        dishesRef.current = merged
        setDishes(merged)
        scheduleSpawn()
      }, delay)
    }
    scheduleSpawn()

    return () => {
      window.clearInterval(tick)
      window.clearTimeout(spawnTimer)
    }
  }, [phase])

  useEffect(() => {
    if (pops.length === 0) return
    const clear = window.setTimeout(() => setPops((current) => current.slice(1)), 520)
    return () => window.clearTimeout(clear)
  }, [pops])

  const start = useCallback(() => {
    scoreRef.current = 0
    streakRef.current = 0
    dishesRef.current = []
    setScore(0)
    setStreak(0)
    setDishes([])
    setPops([])
    setComboFlash(false)
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
    setRemainingMs(ROUND_MS)
  }, [])

  const tap = useCallback((id: number, x: number, y: number) => {
    if (phaseRef.current !== 'playing') return
    const target = dishesRef.current.find((dish) => dish.id === id)
    if (!target) return

    const next = dishesRef.current.filter((dish) => dish.id !== id)
    dishesRef.current = next
    setDishes(next)

    streakRef.current += 1
    const streakNow = streakRef.current
    setStreak(streakNow)
    const multiplier = streakNow >= 8 ? 3 : streakNow >= 4 ? 2 : 1
    const gained = target.points * multiplier
    scoreRef.current += gained
    setScore(scoreRef.current)
    setPops((current) => [
      ...current.slice(-4),
      {
        id: nextId.current++,
        x,
        y,
        label: multiplier > 1 ? `+${gained}×${multiplier}` : `+${gained}`,
      },
    ])
    if (multiplier > 1) {
      setComboFlash(true)
      window.setTimeout(() => setComboFlash(false), 280)
    }
  }, [])

  return {
    phase,
    playing: phase === 'playing',
    resultOpen: phase === 'result',
    score,
    best,
    streak,
    comboFlash,
    remainingSec: Math.ceil(remainingMs / 1000),
    progress: remainingMs / ROUND_MS,
    dishes,
    pops,
    now,
    start,
    reset,
    tap,
  }
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
  return -6 + t * 102
}
