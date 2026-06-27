import { EXPERIENCE } from '../data'
import { Reveal } from './Reveal'

export function Experience() {
  return (
    <section className="section" id="experience">
      <Reveal as="header" className="section-head">
        <div className="eyebrow">Experience</div>
        <h2 className="section-title">Owning production analytics, end to end.</h2>
      </Reveal>
      <div className="timeline">
        {EXPERIENCE.map((e, i) => (
          <Reveal as="div" className="exp" key={e.company} delay={i * 0.05}>
            <span className="exp-dot" style={{ background: e.color }} />
            <div>
              <div className="exp-head">
                <span className="exp-role">{e.role}</span>
                <span className="exp-period">{e.period}</span>
              </div>
              <div className="exp-company">
                <b>{e.company}</b> · {e.context}
              </div>
              {e.points.length > 0 && (
                <ul className="exp-points">
                  {e.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
