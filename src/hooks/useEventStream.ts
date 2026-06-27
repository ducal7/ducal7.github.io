import { useEffect, useRef, useState } from 'react'

export type StreamEvent = {
  id: number
  time: string
  label: string
  kind: 'pointer' | 'scroll' | 'click' | 'key' | 'view' | 'system'
}

export type EventStream = {
  events: StreamEvent[]
  total: number
  rate: number
  history: number[]
}

const KIND_MAX = 7

/**
 * A real, live event stream — captures the visitor's own interaction events
 * (pointer, scroll milestones, clicks, keys, section views) the way a product
 * analytics SDK would, and exposes the recent log plus a rolling events/sec.
 * Everything here is genuinely measured; nothing is synthesized.
 */
export function useEventStream(): EventStream {
  const [snapshot, setSnapshot] = useState<EventStream>({
    events: [],
    total: 0,
    rate: 0,
    history: [],
  })
  const history = useRef<number[]>([])
  const log = useRef<StreamEvent[]>([])
  const stamps = useRef<number[]>([])
  const total = useRef(0)
  const seq = useRef(0)
  const lastPointer = useRef(0)
  const scrollHits = useRef<Set<number>>(new Set())
  const dirty = useRef(false)
  const lastRate = useRef(0)

  useEffect(() => {
    const fmt = (d: Date) =>
      `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(
        d.getSeconds(),
      ).padStart(2, '0')}`

    const push = (label: string, kind: StreamEvent['kind'], t: number) => {
      seq.current += 1
      total.current += 1
      stamps.current.push(t)
      log.current = [{ id: seq.current, time: fmt(new Date()), label, kind }, ...log.current].slice(
        0,
        KIND_MAX,
      )
      dirty.current = true
    }

    const onPointer = (e: PointerEvent) => {
      const t = performance.now()
      if (t - lastPointer.current < 450) return
      lastPointer.current = t
      push(`pointer · ${Math.round(e.clientX)},${Math.round(e.clientY)}`, 'pointer', t)
    }
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const pct = max > 0 ? Math.round((doc.scrollTop / max) * 100) : 0
      const bucket = Math.min(100, Math.floor(pct / 10) * 10)
      if (bucket > 0 && !scrollHits.current.has(bucket)) {
        scrollHits.current.add(bucket)
        push(`scroll · depth ${bucket}%`, 'scroll', performance.now())
      }
    }
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null
      const tag = el ? el.tagName.toLowerCase() : 'doc'
      push(`click · <${tag}>`, 'click', performance.now())
    }
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? 'key' : e.key.toLowerCase()
      push(`keydown · ${k}`, 'key', performance.now())
    }
    const onResize = () =>
      push(`viewport · ${window.innerWidth}×${window.innerHeight}`, 'system', performance.now())
    const onVis = () =>
      push(`tab · ${document.hidden ? 'hidden' : 'visible'}`, 'system', performance.now())

    push('session · started', 'system', performance.now())

    // section views
    const ids = ['work', 'capabilities', 'live', 'experience', 'skills', 'about', 'contact']
    const seen = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting && !seen.has(en.target.id)) {
            seen.add(en.target.id)
            push(`view · #${en.target.id}`, 'view', performance.now())
          }
        }
      },
      { threshold: 0.4 },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })

    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('click', onClick, { passive: true })
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVis)

    const flush = window.setInterval(() => {
      const now = performance.now()
      stamps.current = stamps.current.filter((s) => now - s < 1000)
      const rate = stamps.current.length
      history.current = [...history.current, rate].slice(-60)
      const flat = history.current.every((v) => v === 0)
      if (dirty.current || rate !== lastRate.current || !flat) {
        dirty.current = false
        lastRate.current = rate
        setSnapshot({
          events: log.current,
          total: total.current,
          rate,
          history: history.current,
        })
      }
    }, 250)

    return () => {
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('click', onClick)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVis)
      io.disconnect()
      window.clearInterval(flush)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return snapshot
}
