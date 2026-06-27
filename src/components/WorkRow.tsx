import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '../data'
import { Sparkline } from './Sparkline'

export function WorkRow({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false)
  const style = { ['--row-accent' as string]: project.color } as React.CSSProperties

  return (
    <motion.div
      className="work-row"
      style={style}
      onClick={() => setOpen((o) => !o)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="work-index">{String(index + 1).padStart(2, '0')}</div>
      <div className="work-main">
        <div>
          <div className="work-district">{project.district}</div>
          <h3 className="work-name">{project.name}</h3>
          <p className="work-tagline">{project.tagline}</p>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                className="work-blurb"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="work-blurb-inner">
                  <p>{project.blurb}</p>
                  <div className="work-stack">
                    {project.stack.map((s) => (
                      <span className="chip" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <a
                    className="work-repo"
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View repository →
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!open && (
            <div className="work-repo" aria-hidden="true">
              {project.stack.join(' · ')} → tap to expand
            </div>
          )}
        </div>

        <div className="work-aside">
          <div className="work-metric-value">{project.metricValue}</div>
          <div className="work-metric-label">{project.metricLabel}</div>
          <Sparkline seed={project.id} />
        </div>
      </div>
    </motion.div>
  )
}
