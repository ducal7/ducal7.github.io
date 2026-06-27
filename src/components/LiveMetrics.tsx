import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from './Reveal'
import { useSessionTelemetry } from '../hooks/useSessionTelemetry'
import { useVisitorCount } from '../hooks/useVisitorCount'
import { useEventStream } from '../hooks/useEventStream'
import { GOATCOUNTER_ENABLED } from '../config'
import { PROJECTS } from '../data'

const KIND_COLOR: Record<string, string> = {
  pointer: '#22d3ee',
  scroll: '#a855f7',
  click: '#34d399',
  key: '#f59e0b',
  view: '#6366f1',
  system: '#828aa3',
}

function ActivitySpark({ history }: { history: number[] }) {
  const W = 120
  const H = 28
  if (history.length < 2) return <svg className="live-spark" viewBox={`0 0 ${W} ${H}`} />
  const max = Math.max(2, ...history)
  const pts = history
    .map((v, i) => {
      const x = (i / (history.length - 1)) * W
      const y = H - (v / max) * (H - 2) - 1
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
  return (
    <svg className="live-spark" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      <polyline points={pts} />
      <polyline className="live-spark-fill" points={`0,${H} ${pts} ${W},${H}`} />
    </svg>
  )
}

function EventStreamCard() {
  const { events, total, rate, history } = useEventStream()
  return (
    <div className="live-stream">
      <div className="live-stream-head">
        <div className="live-card-title" style={{ margin: 0 }}>
          Live event stream
        </div>
        <div className="live-stream-stats">
          <ActivitySpark history={history} />
          <span>
            <b>{total.toLocaleString('en-IN')}</b> events
          </span>
          <span className="accent">
            <b>{rate}</b>/s
          </span>
        </div>
      </div>
      <div className="live-stream-log">
        <AnimatePresence initial={false}>
          {events.map((e) => (
            <motion.div
              key={e.id}
              className="live-stream-row"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="live-stream-dot" style={{ background: KIND_COLOR[e.kind] }} />
              <span className="live-stream-time">{e.time}</span>
              <span className="live-stream-label">{e.label}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <p className="live-note">
        Real interaction events captured from your session — the same event model I instrument
        products with. Move, scroll, or click and watch it stream.
      </p>
    </div>
  )
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="live-stat">
      <div className={`live-stat-value${accent ? ' accent' : ''}`}>{value}</div>
      <div className="live-stat-label">{label}</div>
    </div>
  )
}

/** Streams the real per-project metrics from data.ts, one at a time. */
function ProjectFeed() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const id = window.setInterval(() => setI((n) => (n + 1) % PROJECTS.length), 2600)
    return () => window.clearInterval(id)
  }, [])
  const p = PROJECTS[i]
  return (
    <div className="live-feed">
      <div className="live-feed-head">
        <span className="live-feed-dot" style={{ background: p.color }} />
        live project metric
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={p.id}
          className="live-feed-body"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="live-feed-value" style={{ color: p.color }}>
            {p.metricValue}
          </div>
          <div className="live-feed-meta">
            <div className="live-feed-label">{p.metricLabel}</div>
            <div className="live-feed-name">{p.name}</div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="live-feed-track">
        {PROJECTS.map((pr, idx) => (
          <span
            key={pr.id}
            className={`live-feed-tick${idx === i ? ' on' : ''}`}
            style={{ background: idx === i ? pr.color : undefined }}
          />
        ))}
      </div>
    </div>
  )
}

export function LiveMetrics() {
  const t = useSessionTelemetry()
  const visitors = useVisitorCount()

  return (
    <section className="section" id="live">
      <Reveal as="header" className="section-head">
        <div className="eyebrow">
          <span className="live-pip" /> Live · instrumentation
        </div>
        <h2 className="section-title">This page is measuring itself.</h2>
        <p className="section-lead">
          Analytics isn't a slide — it's instrumentation. Everything below is measured live from
          your own session and the project data, the same way I instrument products in production.
          No fabricated numbers.
        </p>
      </Reveal>

      <div className="live-grid">
        <Reveal className="live-card live-card--feed">
          <ProjectFeed />
        </Reveal>

        <Reveal className="live-card" delay={0.05}>
          <div className="live-card-title">Visitors & context</div>
          <div className="live-stats live-stats--2">
            <Stat label={visitors.label} value={visitors.value} accent />
            <Stat label="Timezone" value={t.timezone} />
            <Stat label="Language" value={t.language} />
            <Stat label="DOM ready" value={t.loadMs} />
          </div>
          <p className="live-note">
            {visitors.source === 'global'
              ? 'Real global page views via GoatCounter (privacy-first, no cookies).'
              : GOATCOUNTER_ENABLED
                ? 'Showing your visits to this browser. The global page-view total appears once GoatCounter’s visitor-count display is enabled and the site is live.'
                : 'Counting your visits locally — wire a free GoatCounter code in config.ts for a global, cross-visitor total.'}
          </p>
        </Reveal>

        <Reveal className="live-card live-card--wide" delay={0.1}>
          <div className="live-card-title">Your live session</div>
          <div className="live-stats live-stats--4">
            <Stat label="Local time" value={t.clock} accent />
            <Stat label="Time on page" value={t.onPage} />
            <Stat label="Scroll depth" value={`${t.scrollDepth}%`} />
            <Stat label="Max scrolled" value={`${t.maxScroll}%`} />
            <Stat label="Viewport" value={t.viewport} />
            <Stat label="Device" value={t.device} />
            <Stat label="Connection" value={t.connection} />
            <Stat label="Frames / s" value={t.fps} accent />
          </div>
        </Reveal>

        <Reveal className="live-card live-card--wide" delay={0.12}>
          <EventStreamCard />
        </Reveal>
      </div>
    </section>
  )
}
