import { motion } from 'framer-motion'
import { HeroVisual } from './HeroVisual'
import { MagneticButton } from './MagneticButton'
import { PROFILE } from '../data'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export function Hero() {
  return (
    <header className="hero" id="top">
      <HeroVisual />
      <motion.div
        className="hero-inner"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="eyebrow" variants={item}>
          {PROFILE.location} · Available for data roles
        </motion.div>
        <motion.h1 className="hero-title" variants={item}>
          I turn raw events into <span className="accent">decisions, products, and growth.</span>
        </motion.h1>
        <motion.p className="hero-role" variants={item}>
          {PROFILE.name} — <b>Data Analyst · Data Engineer</b>
        </motion.p>
        <motion.p className="hero-sub" variants={item}>
          {PROFILE.summary}
        </motion.p>
        <motion.div className="hero-actions" variants={item}>
          <MagneticButton as="a" href="#work" className="btn btn-primary">
            View work ↓
          </MagneticButton>
          <MagneticButton
            as="a"
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            GitHub ↗
          </MagneticButton>
        </motion.div>
        <motion.div className="hero-meta" variants={item}>
          <div className="hero-meta-item">
            <b>2+ yrs</b>Owning production analytics
          </div>
          <div className="hero-meta-item">
            <b>3-person</b>Data team led
          </div>
          <div className="hero-meta-item">
            <b>1M+</b>Users analyzed
          </div>
        </motion.div>
      </motion.div>
      <div className="scroll-cue">
        <span>scroll</span>
        <i />
      </div>
    </header>
  )
}
