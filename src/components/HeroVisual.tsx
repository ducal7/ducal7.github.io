import { useEffect, useRef } from 'react'
import { PROJECTS } from '../data'

/**
 * Lightweight Canvas 2D "data skyline": columns whose heights encode the real
 * project intensities, gently breathing, with a single flowing accent line and
 * drifting data motes. ~60fps, no WebGL. Renders one static frame under
 * reduced-motion. Pauses when the tab/section is offscreen.
 */
export function HeroVisual() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    let running = true

    // Build a denser skyline by sampling the project intensities and weaving
    // in interpolated values, so it reads as a city rather than five bars.
    const base = PROJECTS.map((p) => p.intensity)
    const cols: number[] = []
    const COUNT = 64
    for (let i = 0; i < COUNT; i++) {
      const t = (i / (COUNT - 1)) * (base.length - 1)
      const a = base[Math.floor(t)]
      const b = base[Math.min(Math.ceil(t), base.length - 1)]
      const frac = t - Math.floor(t)
      const noise = 0.16 * Math.sin(i * 1.7) + 0.1 * Math.sin(i * 0.6)
      cols.push(Math.max(0.16, a + (b - a) * frac + noise * 0.5))
    }

    const motes = Array.from({ length: 26 }, (_, i) => ({
      x: Math.random(),
      y: Math.random() * 0.6 + 0.05,
      s: 0.6 + Math.random() * 1.2,
      sp: 0.02 + Math.random() * 0.05,
      ph: i,
    }))

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (time: number) => {
      const tt = reduced ? 0 : time / 1000
      ctx.clearRect(0, 0, w, h)

      const baseY = h * 0.86
      const colW = w / COUNT
      const maxBar = h * 0.74

      // horizon glow line
      const horizon = ctx.createLinearGradient(0, baseY - 1, 0, baseY + 1)
      horizon.addColorStop(0, 'rgba(34, 211, 238, 0)')
      horizon.addColorStop(0.5, 'rgba(34, 211, 238, 0.3)')
      horizon.addColorStop(1, 'rgba(34, 211, 238, 0)')
      ctx.fillStyle = horizon
      ctx.fillRect(0, baseY - 1, w, 2)

      // skyline columns (+ faint reflection below the horizon)
      for (let i = 0; i < COUNT; i++) {
        const breathe = reduced ? 1 : 1 + 0.05 * Math.sin(tt * 0.8 + i * 0.5)
        const bh = cols[i] * maxBar * breathe
        const x = i * colW
        const grad = ctx.createLinearGradient(0, baseY - bh, 0, baseY)
        grad.addColorStop(0, 'rgba(34, 211, 238, 0.22)')
        grad.addColorStop(1, 'rgba(99, 102, 241, 0.015)')
        ctx.fillStyle = grad
        ctx.fillRect(x + colW * 0.16, baseY - bh, colW * 0.68, bh)
        // bright cap
        ctx.fillStyle = 'rgba(125, 232, 249, 0.42)'
        ctx.fillRect(x + colW * 0.16, baseY - bh, colW * 0.68, 1.5)
        // reflection
        const refl = ctx.createLinearGradient(0, baseY, 0, baseY + bh * 0.45)
        refl.addColorStop(0, 'rgba(34, 211, 238, 0.1)')
        refl.addColorStop(1, 'rgba(34, 211, 238, 0)')
        ctx.fillStyle = refl
        ctx.fillRect(x + colW * 0.16, baseY, colW * 0.68, bh * 0.45)
      }

      // flowing accent line across the skyline tops
      ctx.beginPath()
      for (let i = 0; i < COUNT; i++) {
        const wave = reduced ? 0 : 0.06 * Math.sin(tt * 1.1 + i * 0.4)
        const bh = (cols[i] + wave) * maxBar
        const x = i * colW + colW * 0.5
        const y = baseY - bh - 8
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.32)'
      ctx.lineWidth = 1.2
      ctx.shadowColor = 'rgba(34, 211, 238, 0.4)'
      ctx.shadowBlur = 10
      ctx.stroke()
      ctx.shadowBlur = 0

      // drifting motes
      for (const m of motes) {
        const mx = reduced ? m.x * w : ((m.x + tt * m.sp) % 1) * w
        const my = baseY - m.y * maxBar - 20 + (reduced ? 0 : 6 * Math.sin(tt + m.ph))
        const tw = reduced ? 0.5 : 0.4 + 0.4 * Math.sin(tt * 2 + m.ph)
        ctx.fillStyle = `rgba(180, 224, 255, ${tw})`
        ctx.beginPath()
        ctx.arc(mx, my, m.s, 0, Math.PI * 2)
        ctx.fill()
      }

      if (running && !reduced) raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting
        if (running && !reduced) raf = requestAnimationFrame(draw)
        else cancelAnimationFrame(raf)
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    if (reduced) draw(0)
    else raf = requestAnimationFrame(draw)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      io.disconnect()
    }
  }, [])

  return <canvas ref={ref} className="hero-visual" aria-hidden="true" />
}
