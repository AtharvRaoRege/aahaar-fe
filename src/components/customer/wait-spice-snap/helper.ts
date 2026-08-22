import { useCallback, useEffect, useRef, useState } from 'react'

const ROUND_MS = 60_000
const WAVE_MS = 15_000
const BEST_KEY = 'aahaar.wait-spice.best'
const POP_MS = 700

export type SpicePhase = 'idle' | 'playing' | 'result'
export type SpiceRank = 'prep' | 'line' | 'sous' | 'chef' | 'legend'
export type HitGrade = 'perfect' | 'good' | 'miss'

type Pop = {
  id: number
  label: string
  tone: 'good' | 'bad' | 'bonus'
}

function readBest(): number {
  if (typeof sessionStorage === 'undefined') return 0
  const raw = sessionStorage.getItem(BEST_KEY)
  const n = raw ? Number(raw) : 0
  return Number.isFinite(n) ? n : 0
}

function writeBest(score: number) {
  if (typeof sessionStorage === 'undefined') return
  sessionStorage.setItem(BEST_KEY, String(score))
}

/** 0–100 needle position oscillating with rising frequency. */
export function needleAt(elapsedMs: number, hz: number): number {
  const t = (elapsedMs / 1000) * hz * Math.PI * 2
  return 50 + Math.sin(t) * 48
}

export function zoneWidthForWave(wave: number): number {
  return Math.max(10, 30 - (wave - 1) * 5)
}

export function hzForWave(wave: number): number {
  return 0.55 + (wave - 1) * 0.22
}

export function gradeHit(needle: number, zoneWidth: number): HitGrade {
  const dist = Math.abs(needle - 50)
  const half = zoneWidth / 2
  if (dist <= half * 0.35) return 'perfect'
  if (dist <= half) return 'good'
  return 'miss'
}

export function spiceRank(score: number): SpiceRank {
  if (score >= 90) return 'legend'
  if (score >= 65) return 'chef'
  if (score >= 40) return 'sous'
  if (score >= 18) return 'line'
  return 'prep'
}

export function useSpiceSnap() {
  const [phase, setPhase] = useState<SpicePhase>('idle')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(readBest)
  const [streak, setStreak] = useState(0)
  const [hits, setHits] = useState(0)
  const [wave, setWave] = useState(1)
  const [remainingMs, setRemainingMs] = useState(ROUND_MS)
  const [needle, setNeedle] = useState(50)
  const [zoneWidth, setZoneWidth] = useState(zoneWidthForWave(1))
  const [comboFlash, setComboFlash] = useState(false)
  const [waveFlash, setWaveFlash] = useState(false)
  const [pops, setPops] = useState<Pop[]>([])
  const [cooldown, setCooldown] = useState(false)

  const phaseRef = useRef<SpicePhase>('idle')
  const startRef = useRef(0)
  const scoreRef = useRef(0)
  const streakRef = useRef(0)
  const waveRef = useRef(1)
  const needleRef = useRef(50)
  const zoneRef = useRef(zoneWidthForWave(1))
  const cooldownRef = useRef(false)
  const popId = useRef(0)

  const pushPop = useCallback((label: string, tone: Pop['tone']) => {
    const id = ++popId.current
    setPops((prev) => [...prev.slice(-4), { id, label, tone }])
    window.setTimeout(() => {
      setPops((prev) => prev.filter((p) => p.id !== id))
    }, POP_MS)
  }, [])

  useEffect(() => {
    if (phase !== 'playing') return

    startRef.current = Date.now()
    const tick = window.setInterval(() => {
      if (phaseRef.current !== 'playing') return
      const now = Date.now()
      const elapsed = now - startRef.current
      const left = ROUND_MS - elapsed
      if (left <= 0) {
        window.clearInterval(tick)
        setRemainingMs(0)
        setBest((prev) => {
          const next = Math.max(prev, scoreRef.current)
          writeBest(next)
          return next
        })
        phaseRef.current = 'result'
        setPhase('result')
        return
      }
      setRemainingMs(left)
      const nextWave = Math.min(4, 1 + Math.floor(elapsed / WAVE_MS))
      if (nextWave !== waveRef.current) {
        waveRef.current = nextWave
        setWave(nextWave)
        const width = zoneWidthForWave(nextWave)
        zoneRef.current = width
        setZoneWidth(width)
        setWaveFlash(true)
        window.setTimeout(() => setWaveFlash(false), 900)
      }
      const nextNeedle = needleAt(elapsed, hzForWave(waveRef.current))
      needleRef.current = nextNeedle
      setNeedle(nextNeedle)
    }, 32)

    return () => window.clearInterval(tick)
  }, [phase])

  const start = useCallback(() => {
    scoreRef.current = 0
    streakRef.current = 0
    waveRef.current = 1
    zoneRef.current = zoneWidthForWave(1)
    cooldownRef.current = false
    needleRef.current = 50
    setScore(0)
    setStreak(0)
    setHits(0)
    setWave(1)
    setZoneWidth(zoneWidthForWave(1))
    setRemainingMs(ROUND_MS)
    setPops([])
    setCooldown(false)
    setComboFlash(false)
    setWaveFlash(false)
    setNeedle(50)
    phaseRef.current = 'playing'
    setPhase('playing')
  }, [])

  const reset = useCallback(() => {
    scoreRef.current = 0
    streakRef.current = 0
    waveRef.current = 1
    zoneRef.current = zoneWidthForWave(1)
    cooldownRef.current = false
    needleRef.current = 50
    phaseRef.current = 'idle'
    setPhase('idle')
    setScore(0)
    setStreak(0)
    setHits(0)
    setWave(1)
    setZoneWidth(zoneWidthForWave(1))
    setRemainingMs(ROUND_MS)
    setNeedle(50)
    setPops([])
    setCooldown(false)
    setComboFlash(false)
    setWaveFlash(false)
  }, [])

  const snap = useCallback(() => {
    if (phaseRef.current !== 'playing' || cooldownRef.current) return
    cooldownRef.current = true
    setCooldown(true)
    window.setTimeout(() => {
      cooldownRef.current = false
      setCooldown(false)
    }, 280)

    const grade = gradeHit(needleRef.current, zoneRef.current)
    const mult = Math.min(4, 1 + Math.floor(streakRef.current / 3))

    if (grade === 'miss') {
      streakRef.current = 0
      setStreak(0)
      scoreRef.current = Math.max(0, scoreRef.current - 1)
      setScore(scoreRef.current)
      pushPop('Miss', 'bad')
      return
    }

    const gained = grade === 'perfect' ? 4 * mult : 2 * mult
    streakRef.current += 1
    scoreRef.current += gained
    setStreak(streakRef.current)
    setScore(scoreRef.current)
    setHits((h) => h + 1)
    pushPop(
      grade === 'perfect' ? `Perfect +${gained}` : `+${gained}`,
      grade === 'perfect' ? 'bonus' : 'good',
    )
    if (streakRef.current >= 3) {
      setComboFlash(true)
      window.setTimeout(() => setComboFlash(false), 280)
    }
  }, [pushPop])

  const playing = phase === 'playing'
  const progress = playing ? remainingMs / ROUND_MS : 0
  const remainingSec = Math.ceil(remainingMs / 1000)

  return {
    phase,
    playing,
    resultOpen: phase === 'result',
    score,
    best,
    streak,
    hits,
    wave,
    needle,
    zoneWidth,
    remainingSec,
    progress,
    comboFlash,
    waveFlash,
    pops,
    cooldown,
    rank: spiceRank(score),
    start,
    reset,
    snap,
  }
}
