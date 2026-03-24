'use client'

import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0

    const update = () => {
      const bar = barRef.current
      if (!bar) return
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const pct = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0
      bar.style.width = `${pct}%`
      raf = requestAnimationFrame(update)
    }

    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="fixed top-0 inset-x-0 h-0.5 z-50 bg-border-default" aria-hidden="true">
      <div
        ref={barRef}
        className="h-full bg-accent transition-none"
        style={{ width: '0%' }}
      />
    </div>
  )
}
