import { CAPABILITIES } from '../data'
import { Reveal } from './Reveal'

export function Capabilities() {
  return (
    <section className="section" id="capabilities">
      <Reveal as="header" className="section-head">
        <div className="eyebrow">What I do</div>
        <h2 className="section-title">From the warehouse to the decision.</h2>
        <p className="section-lead">
          I work across the whole path — instrumenting events, building the pipelines and models,
          and turning the result into decisions, product changes, and growth. Here's the depth in
          each.
        </p>
      </Reveal>
      <div className="cap-grid">
        {CAPABILITIES.map((c, i) => (
          <Reveal className="cap-card" key={c.title} delay={(i % 3) * 0.06}>
            <div className="cap-index">{String(i + 1).padStart(2, '0')}</div>
            <h3 className="cap-title">{c.title}</h3>
            <p className="cap-summary">{c.summary}</p>
            <ul className="cap-detail">
              {c.detail.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
