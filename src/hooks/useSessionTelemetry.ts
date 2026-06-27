import { useEffect, useRef, useState } from 'react'

export type Telemetry = {
  clock: string
  onPage: string
  scrollDepth: number
  maxScroll: number
  viewport: string
  device: string
  connection: string
  timezone: string
  pixelRatio: string
  language: string
  loadMs: string
  fps: string
}

const fmtDuration = (s: number) => {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return m > 0 ? `${m}m ${String(sec).padStart(2, '0')}s` : `${sec}s`
}

/**
 * Real, client-side session telemetry — a live "instrumentation in action"
 * readout. Every value here is genuinely measured from the visitor's own
 * session; nothing is fabricated.
 */
export function useSessionTelemetry(): Telemetry {
  const [tick, setTick] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const [startedAt] = useState(() => Date.now())
  const fps = useRef(0)

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 1000)
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const pct = max > 0 ? Math.round((doc.scrollTop / max) * 100) : 0
      setMaxScroll((m) => Math.max(m, Math.min(100, pct)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    // real frames-per-second meter
    let frames = 0
    let last = performance.now()
    let raf = 0
    const loop = (t: number) => {
      frames += 1
      if (t - last >= 1000) {
        fps.current = Math.round((frames * 1000) / (t - last))
        frames = 0
        last = t
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      window.clearInterval(id)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const now = new Date()
  void tick // re-render each second

  const doc = typeof document !== 'undefined' ? document.documentElement : null
  const max = doc ? doc.scrollHeight - doc.clientHeight : 0
  const scrollDepth = doc && max > 0 ? Math.round((doc.scrollTop / max) * 100) : 0

  const conn =
    typeof navigator !== 'undefined' &&
    (navigator as unknown as { connection?: { effectiveType?: string } }).connection
  const effective = conn && conn.effectiveType ? conn.effectiveType.toUpperCase() : '—'

  const coarse =
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  const device = coarse ? 'Touch / mobile' : 'Desktop / pointer'

  let tz = '—'
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '—'
  } catch {
    /* noop */
  }

  return {
    clock: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    onPage: fmtDuration(Math.floor((Date.now() - startedAt) / 1000)),
    scrollDepth,
    maxScroll,
    viewport:
      typeof window !== 'undefined' ? `${window.innerWidth}×${window.innerHeight}` : '—',
    device,
    connection: effective,
    timezone: tz,
    pixelRatio:
      typeof window !== 'undefined' ? `${(window.devicePixelRatio || 1).toFixed(1)}×` : '—',
    language: typeof navigator !== 'undefined' ? navigator.language : '—',
    loadMs: (() => {
      try {
        const nav = performance.getEntriesByType('navigation')[0] as
          | PerformanceNavigationTiming
          | undefined
        const ms = nav ? Math.max(0, Math.round(nav.domContentLoadedEventEnd)) : 0
        return ms ? `${ms} ms` : '—'
      } catch {
        return '—'
      }
    })(),
    fps: fps.current ? `${fps.current}` : '—',
  }
}
