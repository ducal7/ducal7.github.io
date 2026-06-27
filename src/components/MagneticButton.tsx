import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type Props = {
  children: ReactNode
  className?: string
  as?: 'a' | 'button'
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
}

/**
 * Button that subtly leans toward the cursor — a premium micro-interaction.
 * Disabled (no transform) when the user prefers reduced motion or on touch.
 */
export function MagneticButton({ children, className, as = 'button', ...rest }: Props) {
  const ref = useRef<HTMLElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.3 })

  const reduced =
    typeof window !== 'undefined' &&
    (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches)

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const MotionTag = as === 'a' ? motion.a : motion.button
  return (
    <MotionTag
      // @ts-expect-error ref typing differs between a/button motion tags
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
