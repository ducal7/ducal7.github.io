import { SKILL_CATEGORIES } from '../data'
import { Reveal } from './Reveal'

export function Skills() {
  return (
    <section className="section" id="skills">
      <Reveal as="header" className="section-head">
        <div className="eyebrow">Toolkit</div>
        <h2 className="section-title">The stack I ship with.</h2>
      </Reveal>
      <div className="skills-grid">
        {SKILL_CATEGORIES.map((c, i) => (
          <Reveal className="skill-card" key={c.title} delay={(i % 3) * 0.05}>
            <div className="skill-cat">{c.title}</div>
            <div className="skill-tags">
              {c.items.map((it) => (
                <span className="skill-tag" key={it}>
                  {it}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
