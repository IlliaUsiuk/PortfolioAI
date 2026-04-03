'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: -100, y: -100 })
  const currentRef = useRef({ x: -100, y: -100 })
  const hoveredRef = useRef(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element
      hoveredRef.current = !!el.closest('a, button, [role="button"], [data-cursor-hover]')
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      currentRef.current.x = lerp(currentRef.current.x, posRef.current.x, 0.12)
      currentRef.current.y = lerp(currentRef.current.y, posRef.current.y, 0.12)

      const tx = currentRef.current.x
      const ty = currentRef.current.y

      dot.style.transform = `translate(${tx}px, ${ty}px)`
      ring.style.transform = `translate(${tx}px, ${ty}px)`

      if (hoveredRef.current) {
        dot.style.opacity = '0'
        ring.style.opacity = '1'
      } else {
        dot.style.opacity = '1'
        ring.style.opacity = '0'
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    document.body.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(rafRef.current)
      document.body.style.cursor = ''
    }
  }, [])

  return (
    <>
      {/* Small dot — default state */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full transition-opacity duration-150"
        style={{ width: 8, height: 8, background: '#F0F0FF', marginLeft: -4, marginTop: -4 }}
      />
      {/* Ring — hover state */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full transition-opacity duration-150"
        style={{
          width: 30,
          height: 30,
          border: '1.5px solid rgba(240, 240, 255, 0.55)',
          background: 'transparent',
          marginLeft: -15,
          marginTop: -15,
          opacity: 0,
        }}
      />
    </>
  )
}
