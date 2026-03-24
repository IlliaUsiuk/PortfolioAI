'use client'

import { useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

interface Props {
  children: React.ReactNode
  className?: string
}

export default function MagneticButton({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 150, damping: 15 })
  const y = useSpring(0, { stiffness: 150, damping: 15 })

  const handleMouseMove = (e: React.MouseEvent) => {
    // Desktop only
    if (!window.matchMedia('(pointer: fine)').matches) return

    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = e.clientX - centerX
    const dy = e.clientY - centerY
    const dist = Math.sqrt(dx * dx + dy * dy)
    const zone = 80

    if (dist < zone) {
      x.set(dx * 0.3)
      y.set(dy * 0.3)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
