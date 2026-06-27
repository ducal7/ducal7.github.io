import { motion } from 'framer-motion'

/**
 * Deterministic SVG sparkline seeded from the project id, so each row gets a
 * distinct-but-stable curve that draws itself in on scroll. Decorative.
 */
function seededPoints(seed: string, n = 16) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  const rand = () => {
    h = (h * 1664525 + 1013904223) >>> 0
    return h / 0xffffffff
  }
  const pts: number[] = []
  let v = 0.5
  for (let i = 0; i < n; i++) {
    v = Math.min(0.96, Math.max(0.08, v + (rand() - 0.45) * 0.32))
    pts.push(v)
  }
  return pts
}

export function Sparkline({ seed }: { seed: string }) {
  const W = 168
  const H = 40
  const pts = seededPoints(seed)
  const d = pts
    .map((p, i) => {
      const x = (i / (pts.length - 1)) * W
      const y = H - p * H
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  return (
    <svg className="sparkline" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      <motion.path
        d={d}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  )
}
