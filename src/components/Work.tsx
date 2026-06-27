import { PROJECTS } from '../data'
import { Reveal } from './Reveal'
import { WorkRow } from './WorkRow'

export function Work() {
  return (
    <section className="section" id="work">
      <Reveal as="header" className="section-head">
        <div className="eyebrow">Selected work</div>
        <h2 className="section-title">Five projects, built honestly.</h2>
        <p className="section-lead">
          Production-grade analytics, ML, and data-engineering — each on synthetic data, each with
          CI green and the headline metric stated without spin. Tap a row for detail.
        </p>
      </Reveal>
      <div className="work-list">
        {PROJECTS.map((p, i) => (
          <WorkRow key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
