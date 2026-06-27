import { useEffect, useRef, useState } from 'react'

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Splits a metric string like "₹1.5 Cr" or "+12%" into a leading non-numeric
 * prefix, the numeric core to animate, and a trailing suffix. Animates the core
 * from 0 → target once `active` becomes true. Non-numeric values pass through.
 */
export function useCountUp(raw: string, active: boolean, duration = 1400) {
  const match = raw.match(/^(\D*)(-?[\d,]*\.?\d+)(.*)$/s)
  const prefix = match ? match[1] : ''
  const target = match ? parseFloat(match[2].replace(/,/g, '')) : NaN
  const suffix = match ? match[3] : ''
  const decimals = match && match[2].includes('.') ? match[2].split('.')[1].length : 0

  const [value, setValue] = useState(() => (Number.isNaN(target) ? target : 0))
  const frame = useRef<number>()

  useEffect(() => {
    if (!active || Number.isNaN(target)) return
    if (prefersReduced()) {
      setValue(target)
      return
    }
    let start: number | null = null
    const tick = (t: number) => {
      if (start === null) start = t
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(target * eased)
      if (p < 1) frame.current = requestAnimationFrame(tick)
      else setValue(target)
    }
    frame.current = requestAnimationFrame(tick)
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [active, target, duration])

  if (Number.isNaN(target)) return raw

  const shown =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString('en-IN')
  return `${prefix}${shown}${suffix}`
}
