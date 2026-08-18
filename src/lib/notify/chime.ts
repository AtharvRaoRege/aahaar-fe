let context: AudioContext | null = null
let chime: HTMLAudioElement | null = null
let unlocked = false

function getContext(): AudioContext | null {
  const Ctor =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctor) return null
  if (!context) context = new Ctor()
  return context
}

function getChime(): HTMLAudioElement {
  if (!chime) {
    chime = new Audio('/sounds/order-chime.wav')
    chime.preload = 'auto'
  }
  return chime
}

export function unlockAlertSound() {
  if (unlocked) return
  const ctx = getContext()
  if (ctx) void ctx.resume()
  const audio = getChime()
  audio.muted = true
  void audio
    .play()
    .then(() => {
      audio.pause()
      audio.currentTime = 0
      audio.muted = false
      unlocked = true
    })
    .catch(() => undefined)
}

function tone(
  ctx: AudioContext,
  frequency: number,
  start: number,
  duration: number,
  gainValue: number,
) {
  const oscillator = ctx.createOscillator()
  const gain = ctx.createGain()
  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(frequency, start)
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.018)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  oscillator.connect(gain)
  gain.connect(ctx.destination)
  oscillator.start(start)
  oscillator.stop(start + duration + 0.02)
}

async function playSynth() {
  const ctx = getContext()
  if (!ctx) return
  await ctx.resume()
  const t = ctx.currentTime
  tone(ctx, 880, t, 0.22, 0.24)
  tone(ctx, 1318.5, t + 0.11, 0.34, 0.2)
  tone(ctx, 1760, t, 0.14, 0.07)
}

export async function playOrderChime() {
  try {
    const audio = getChime()
    audio.muted = false
    audio.currentTime = 0
    await audio.play()
    return
  } catch {
    await playSynth()
  }
}

export function bindAlertSoundUnlock() {
  const unlock = () => unlockAlertSound()
  window.addEventListener('pointerdown', unlock)
  window.addEventListener('keydown', unlock)
  window.addEventListener('touchstart', unlock)
  return () => {
    window.removeEventListener('pointerdown', unlock)
    window.removeEventListener('keydown', unlock)
    window.removeEventListener('touchstart', unlock)
  }
}
