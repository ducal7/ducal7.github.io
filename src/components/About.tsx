import { EDUCATION, POSITIONS, PROFILE } from '../data'
import { Reveal } from './Reveal'

export function About() {
  return (
    <section className="section" id="about">
      <Reveal as="header" className="section-head">
        <div className="eyebrow">About</div>
        <h2 className="section-title">From raw events to revenue.</h2>
      </Reveal>
      <div className="about-grid">
        <Reveal>
          <p className="about-summary">{PROFILE.summary}</p>
        </Reveal>
        <Reveal className="about-card" delay={0.08}>
          <div className="about-h">Education</div>
          <div className="about-degree">{EDUCATION.degree}</div>
          <div className="about-school">{EDUCATION.school}</div>
          <div className="about-period">{EDUCATION.period}</div>
          <p className="about-course">{EDUCATION.coursework}</p>
          <div className="about-h" style={{ marginTop: '1.4rem' }}>
            Leadership
          </div>
          <ul className="about-list">
            {POSITIONS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
