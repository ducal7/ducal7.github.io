import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { IMPACT } from '../data'
import { useCountUp } from '../hooks/useCountUp'

function ImpactCell({ value, label, active }: { value: string; label: string; active: boolean }) {
  const shown = useCountUp(value, active)
  return (
    <div className="impact-cell">
      <div className="impact-value">{shown}</div>
      <div className="impact-label">{label}</div>
    </div>
  )
}

export function Impact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })

  return (
    <section className="section section--tight" aria-label="Impact">
      <motion.div
        ref={ref}
        className="impact-grid"
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {IMPACT.map((m) => (
          <ImpactCell key={m.label} value={m.value} label={m.label} active={inView} />
        ))}
      </motion.div>
    </section>
  )
}
