import { Reveal } from './Reveal'
import { PROFILE } from '../data'

export function Contact() {
  return (
    <>
      <section className="section contact" id="contact">
        <Reveal>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            Get in touch
          </div>
          <h2 className="contact-title">
            Let's build something <span className="accent">measurable.</span>
          </h2>
          <p className="contact-lead">
            Open to Data Analyst, Product Analyst, and Data Engineer roles. The fastest way to
            reach me is email.
          </p>
          <div className="contact-links">
            <a className="contact-link" href={`mailto:${PROFILE.email}`}>
              {PROFILE.email}
            </a>
            <a className="contact-link" href={`tel:${PROFILE.phone.replace(/\s/g, '')}`}>
              {PROFILE.phone}
            </a>
            <a className="contact-link" href={PROFILE.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a className="contact-link" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </div>
        </Reveal>
      </section>
      <footer className="footer">
        <span>© 2026 {PROFILE.name}</span>
        <span className="live">
          <i className="dot" /> Built with React · Deployed on GitHub Pages
        </span>
      </footer>
    </>
  )
}
