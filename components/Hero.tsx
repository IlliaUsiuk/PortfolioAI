'use client'

import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'

const ease = [0, 0, 0.2, 1] as [number, number, number, number]
const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease, delay: d } }),
}

const stats = [
  { value: '6+', label: 'Automations built' },
  { value: '90%', label: 'Avg. time saved' },
  { value: '< 1 week', label: 'Brief to production' },
]

const tools = ['Make', 'n8n', 'Claude API', 'No-code']

export default function Hero() {
  const handleAudit = () => {
    const el = document.getElementById('contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      window.dispatchEvent(new CustomEvent('prefill-contact', { detail: 'Process audit request' }))
    }
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-6">

      {/* Ambient blob */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: 640,
            height: 640,
            right: '-4%',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'radial-gradient(circle, #6B4EFF 0%, transparent 65%)',
            opacity: 0.14,
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">

        {/* Avatar + name */}
        <motion.div
          custom={0}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-3 mb-5"
        >
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold shrink-0">
            IU
          </div>
          <span className="text-text-primary text-sm font-medium">
            Illia Usiuk
            <span className="text-text-secondary font-normal"> · AI Automation Specialist</span>
          </span>
        </motion.div>

        {/* Tool pills */}
        <motion.div
          custom={0.1}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-2 mb-7"
        >
          {tools.map((t) => (
            <span key={t} className="text-sm px-2.5 py-1 rounded-sm border border-border-active text-text-secondary">
              {t}
            </span>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={0.2}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="font-display font-extrabold text-display-mobile md:text-display-tablet lg:text-display-desktop text-text-primary leading-[1.05] tracking-[-0.03em] mb-10"
        >
          I build systems that run<br />
          <span className="text-accent">without you</span>
        </motion.h1>

        {/* CTAs */}
        <motion.div
          custom={0.3}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-3 mb-14"
        >
          <MagneticButton>
            <button
              onClick={handleAudit}
              className="inline-flex items-center h-11 px-7 rounded-md bg-accent text-white text-sm font-medium hover:bg-[#5B3EEF] transition-colors duration-200"
            >
              Get a free audit
            </button>
          </MagneticButton>

          <MagneticButton>
            <a
              href="#cases"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center h-11 px-7 rounded-md border border-border-active text-text-primary text-sm font-medium hover:bg-white/5 hover:border-[#4a4a70] transition-[background,border-color] duration-200"
            >
              View Cases
            </a>
          </MagneticButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          custom={0.45}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-x-10 gap-y-4 border-t border-border-default pt-8"
        >
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="text-text-primary font-bold text-2xl tracking-tight">{value}</p>
              <p className="text-text-secondary text-sm mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
