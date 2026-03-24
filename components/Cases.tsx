'use client'

import { motion, useSpring } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import * as LucideIcons from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { casesPreview } from '@/config/cases-preview'
import AnimatedCounter from './AnimatedCounter'

interface ActiveCase {
  slug: string
  title: string
  description: string
  metric: string
  tools: string[]
  icon: string
  status: 'active' | 'locked'
}

interface Props {
  activeCases: ActiveCase[]
}

type IconComponent = React.FC<LucideProps>

function getIcon(name: string): IconComponent {
  return ((LucideIcons as unknown) as Record<string, IconComponent>)[name] ?? LucideIcons.Zap
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] } },
}

/* ─── Active card ──────────────────────────────────────────────────────────── */
function ActiveCard({ c, featured }: { c: ActiveCase; featured?: boolean }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [inView, setInView] = useState(false)
  const [hovered, setHovered] = useState(false)
  const x = useSpring(0, { stiffness: 300, damping: 20 })
  const y = useSpring(0, { stiffness: 300, damping: 20 })

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const IconComp = getIcon(c.icon)

  return (
    <motion.a
      ref={cardRef}
      href={`/cases/${c.slug}`}
      style={{ x, y }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={[
        'group relative flex flex-col justify-between rounded-md bg-bg-secondary border border-border-default',
        'transition-[border-color,box-shadow] duration-200 cursor-pointer focus-visible:outline-none focus-visible:shadow-focus-ring',
        hovered ? 'border-border-active shadow-card-hover' : '',
        featured ? 'col-span-full min-h-[320px] p-8' : 'min-h-[240px] p-6',
      ].join(' ')}
    >
      {/* Icon */}
      <IconComp size={32} className="text-text-secondary" />

      {/* Text */}
      <div>
        <h3 className="font-semibold text-text-primary text-base mt-4 mb-1 line-clamp-1">{c.title}</h3>
        <p className="text-text-secondary text-sm line-clamp-1">{c.description}</p>
      </div>

      {/* Metric — animated counter */}
      <AnimatedCounter
        value={c.metric}
        className={[
          'font-bold text-accent mt-4 block',
          featured ? 'text-2xl' : 'text-lg',
          hovered && featured ? '[text-shadow:-1px_0_#FF0050,1px_0_#00D4FF]' : '',
          'transition-[text-shadow] duration-200',
        ].join(' ')}
      />

      {/* Tools */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {c.tools.slice(0, 4).map((t) => (
          <span key={t} className="text-[11px] px-2 py-0.5 rounded-sm bg-bg-tertiary text-text-secondary border border-border-default">
            {t}
          </span>
        ))}
      </div>
    </motion.a>
  )
}

/* ─── In-progress card ─────────────────────────────────────────────────────── */
function InProgressCard({ item }: { item: (typeof casesPreview)[number] }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const IconComp = getIcon(item.icon)

  return (
    <div
      className="relative flex flex-col justify-between rounded-md bg-bg-secondary border border-border-default min-h-[240px] p-6 opacity-60 select-none"
      aria-disabled="true"
      tabIndex={-1}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <IconComp size={32} className="text-text-disabled" />

      <div>
        <h3 className="font-semibold text-text-secondary text-base mt-4 mb-1">{item.title}</h3>
        <p className="text-text-disabled text-xs">Coming {item.comingSoon}</p>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-md bg-bg-secondary border border-border-default text-text-secondary text-xs shadow-card-hover z-10">
          {item.hint}
        </div>
      )}
    </div>
  )
}

/* ─── Cases section ─────────────────────────────────────────────────────────── */
export default function Cases({ activeCases }: Props) {
  const inProgressCount = 6 - activeCases.length
  const previews = casesPreview.slice(0, inProgressCount)

  return (
    <section id="cases" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
          className="mb-12"
        >
          <h2 className="text-text-primary font-semibold text-2xl md:text-3xl">Cases</h2>
          <p className="text-text-secondary text-sm mt-2">Real problems. Real automations. Real results.</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } } as Variants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {activeCases.map((c, i) => (
            <motion.div
              key={c.slug}
              variants={fadeUp}
              className={i === 0 ? 'lg:col-span-3' : ''}
            >
              <ActiveCard c={c} featured={i === 0} />
            </motion.div>
          ))}

          {previews.map((item) => (
            <motion.div key={item.title} variants={fadeUp}>
              <InProgressCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
