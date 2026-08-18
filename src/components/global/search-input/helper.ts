import { useEffect, useLayoutEffect, useRef, useState } from 'react'

interface SpeechAlternativeLike {
  transcript: string
}

interface SpeechResultLike {
  isFinal?: boolean
  length: number
  item?: (index: number) => SpeechAlternativeLike
  0?: SpeechAlternativeLike
}

interface SpeechResultListLike {
  length: number
  item?: (index: number) => SpeechResultLike
  [index: number]: SpeechResultLike
}

export interface SpeechRecognitionLike {
  lang: string
  interimResults: boolean
  continuous: boolean
  maxAlternatives: number
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((event: { results: SpeechResultListLike }) => void) | null
  onerror: ((event: { error?: string }) => void) | null
  onend: (() => void) | null
}

/**
 * Errors that mean the browser will never transcribe for us: Brave ships the
 * API without a transcription backend and fails every run with `network`.
 */
const DEAD_END_ERRORS = new Set(['network', 'service-not-allowed', 'language-not-supported'])
const PERMISSION_ERRORS = new Set(['not-allowed', 'audio-capture'])
/** Runs that end without a transcript before we stop trusting the engine. */
const MAX_EMPTY_RUNS = 3

function getSpeechRecognition(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === 'undefined') return null
  const speechWindow = window as Window & {
    SpeechRecognition?: new () => SpeechRecognitionLike
    webkitSpeechRecognition?: new () => SpeechRecognitionLike
  }
  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition ?? null
}

export function isVoiceSearchSupported(): boolean {
  return Boolean(getSpeechRecognition())
}

export type VoiceFeedback = 'listening' | 'denied' | 'unavailable' | null

function joinTranscript(...parts: string[]) {
  return parts.join(' ').replace(/\s+/g, ' ').trim()
}

function resultAt(list: SpeechResultListLike, index: number) {
  return list[index] ?? list.item?.(index)
}

function transcriptFrom(results: SpeechResultListLike) {
  const finals: string[] = []
  const interims: string[] = []
  for (let index = 0; index < results.length; index += 1) {
    const result = resultAt(results, index)
    if (!result) continue
    const spoken = (result[0] ?? result.item?.(0))?.transcript?.trim()
    if (!spoken) continue
    if (result.isFinal === false) interims.push(spoken)
    else finals.push(spoken)
  }
  return { finals: joinTranscript(...finals), interim: joinTranscript(...interims) }
}

export function useVoiceSearch(onResult: (transcript: string) => void, enabled = true) {
  const [listening, setListening] = useState(false)
  const [available, setAvailable] = useState(() => isVoiceSearchSupported())
  const [feedback, setFeedback] = useState<VoiceFeedback>(null)
  const onResultRef = useRef(onResult)
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)
  const listeningRef = useRef(false)
  const committedRef = useRef('')
  const heardRef = useRef(false)
  const emptyRunsRef = useRef(0)
  const lastErrorRef = useRef<string | null>(null)
  const restartTimerRef = useRef<ReturnType<typeof window.setTimeout> | null>(null)
  const apiRef = useRef({ start: () => {}, stop: () => {} })

  useEffect(() => {
    onResultRef.current = onResult
  }, [onResult])

  useLayoutEffect(() => {
    const clearRestart = () => {
      if (restartTimerRef.current == null) return
      window.clearTimeout(restartTimerRef.current)
      restartTimerRef.current = null
    }

    const releaseEngine = () => {
      clearRestart()
      const recognition = recognitionRef.current
      recognitionRef.current = null
      if (!recognition) return
      recognition.onresult = null
      recognition.onerror = null
      recognition.onend = null
      try {
        recognition.abort()
      } catch {
        /* engine already torn down */
      }
    }

    const stop = (next: VoiceFeedback = null) => {
      listeningRef.current = false
      releaseEngine()
      setListening(false)
      setFeedback(next)
    }

    const giveUp = (next: Exclude<VoiceFeedback, 'listening' | null>) => {
      if (next === 'unavailable') setAvailable(false)
      stop(next)
    }

    const restartSoon = () => {
      clearRestart()
      restartTimerRef.current = window.setTimeout(() => {
        if (listeningRef.current) run()
      }, 150)
    }

    const run = () => {
      if (!listeningRef.current) return
      const Ctor = getSpeechRecognition()
      if (!Ctor) {
        giveUp('unavailable')
        return
      }
      releaseEngine()
      const recognition = new Ctor()
      recognition.interimResults = true
      recognition.continuous = true
      recognition.maxAlternatives = 1
      recognition.lang = navigator.language || 'en-IN'

      recognition.onresult = (speechEvent) => {
        const { finals, interim } = transcriptFrom(speechEvent.results)
        if (!finals && !interim) return
        heardRef.current = true
        emptyRunsRef.current = 0
        if (finals) committedRef.current = joinTranscript(committedRef.current, finals)
        onResultRef.current(joinTranscript(committedRef.current, interim))
      }

      recognition.onerror = (speechEvent) => {
        lastErrorRef.current = speechEvent.error ?? null
        if (!listeningRef.current) return
        if (PERMISSION_ERRORS.has(speechEvent.error ?? '')) giveUp('denied')
        else if (DEAD_END_ERRORS.has(speechEvent.error ?? '')) giveUp('unavailable')
      }

      recognition.onend = () => {
        if (!listeningRef.current) return
        const silence = lastErrorRef.current === 'no-speech'
        lastErrorRef.current = null
        if (!heardRef.current && !silence) {
          emptyRunsRef.current += 1
          if (emptyRunsRef.current >= MAX_EMPTY_RUNS) {
            giveUp('unavailable')
            return
          }
        }
        restartSoon()
      }

      recognitionRef.current = recognition
      try {
        recognition.start()
      } catch {
        restartSoon()
      }
    }

    apiRef.current = {
      start: () => {
        if (listeningRef.current) return
        committedRef.current = ''
        heardRef.current = false
        emptyRunsRef.current = 0
        lastErrorRef.current = null
        listeningRef.current = true
        setListening(true)
        setFeedback('listening')
        run()
      },
      stop: () => stop(),
    }

    return () => {
      listeningRef.current = false
      releaseEngine()
    }
  }, [])

  useEffect(() => {
    if (!feedback || feedback === 'listening') return
    const timer = window.setTimeout(() => setFeedback(null), 5000)
    return () => window.clearTimeout(timer)
  }, [feedback])

  const toggle = () => {
    if (!enabled) return
    if (!isVoiceSearchSupported()) {
      setAvailable(false)
      setFeedback('unavailable')
      return
    }
    if (listeningRef.current) apiRef.current.stop()
    else apiRef.current.start()
  }

  return { listening, available, feedback, toggle }
}
