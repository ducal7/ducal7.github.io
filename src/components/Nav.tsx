import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { PROFILE } from '../data'

const SECTIONS = [
  { id: 'work', label: 'Work' },
  { id: 'live', label: 'Live' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    )
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <motion.div className="nav-progress" style={{ scaleX: progress, right: 0 }} />
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a className="nav-brand" href="#top">
          ducal<span>7</span>
        </a>
        <div className="nav-links">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              className={`nav-link--hide${active === s.id ? ' active' : ''}`}
              href={`#${s.id}`}
            >
              {s.label}
            </a>
          ))}
          <a className="nav-cta" href={PROFILE.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </div>
      </nav>
    </>
  )
}
