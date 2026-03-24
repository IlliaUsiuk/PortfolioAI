'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  /** Full metric string, e.g. "−90% API cost via prompt caching" */
  value: string
  className?: string
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

/**
 * Extracts the first integer from a string and animates it 0→value over 800ms.
 * Everything else in the string is rendered as-is.
 */
export default function AnimatedCounter({ value, className }: Props) {
  const [displayed, setDisplayed] = useState(value)
  const hasAnimated = useRef(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const match = value.match(/\d+/)
    if (!match) return // no number to animate

    const target = parseInt(match[0], 10)
    const prefix = value.slice(0, match.index)
    const suffix = value.slice((match.index ?? 0) + match[0].length)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true
        observer.disconnect()

        const duration = 800
        const start = performance.now()

        const step = (now: number) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)
          const current = Math.round(easeOut(progress) * target)
          setDisplayed(`${prefix}${current}${suffix}`)
          if (progress < 1) requestAnimationFrame(step)
        }

        requestAnimationFrame(step)
      },
      { threshold: 0.15 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} className={className}>
      {displayed}
    </span>
  )
}
