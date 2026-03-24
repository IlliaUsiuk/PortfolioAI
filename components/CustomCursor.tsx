'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: -100, y: -100 })
  const currentRef = useRef({ x: -100, y: -100 })
  const hoveredRef = useRef(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Only on desktop (pointer: fine)
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    if (!dot) return

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

      if (dot) {
        dot.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px)`
        if (hoveredRef.current) {
          dot.style.width = '40px'
          dot.style.height = '40px'
          dot.style.opacity = '0.15'
          dot.style.background = '#6B4EFF'
          dot.style.marginLeft = '-20px'
          dot.style.marginTop = '-20px'
        } else {
          dot.style.width = '12px'
          dot.style.height = '12px'
          dot.style.opacity = '1'
          dot.style.background = '#F0F0FF'
          dot.style.marginLeft = '-6px'
          dot.style.marginTop = '-6px'
        }
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
    <div
      ref={dotRef}
      className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full transition-[width,height,opacity,background] duration-200"
      style={{
        width: 12,
        height: 12,
        background: '#F0F0FF',
        marginLeft: -6,
        marginTop: -6,
      }}
    />
  )
}
