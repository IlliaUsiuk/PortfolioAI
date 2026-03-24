'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useRef } from 'react'
import MagneticButton from './MagneticButton'

const sloganWords = ['I', 'build', 'systems', 'that', 'run']
const sloganAccent = ['without', 'you']

const stats = [
  { value: '6+', label: 'Automations built' },
  { value: '90%', label: 'Avg. time saved per process' },
  { value: '< 1 week', label: 'From brief to production' },
]

const ease = [0, 0, 0.2, 1] as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease, delay },
  }),
}

export default function Hero() {
  const contactRef = useRef<HTMLButtonElement>(null)

  const handleAudit = () => {
    const el = document.getElementById('contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      // Pre-fill topic — dispatched as custom event, contact form listens
      window.dispatchEvent(new CustomEvent('prefill-contact', { detail: 'Process audit request' }))
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6">

      {/* Blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Purple blob — warm pole */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            left: '30%',
            top: '60%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, #6B4EFF 0%, transparent 70%)',
            opacity: 0.2,
            filter: 'blur(80px)',
          }}
        />
        {/* Cyan blob — cold pole */}
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 25, 0] }}
          transition={{ duration: 14, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            left: '75%',
            top: '25%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)',
            opacity: 0.12,
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto w-full pt-24">

        {/* Name + role */}
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-text-secondary text-sm mb-6"
        >
          Illia Usiuk · AI Automation Specialist
        </motion.p>

        {/* Slogan */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-display font-extrabold text-display-mobile md:text-display-tablet lg:text-display-desktop text-text-primary leading-[1.05] tracking-[-0.03em] mb-6"
          aria-label="I build systems that run without you"
        >
          {sloganWords.map((word) => (
            <motion.span key={word} variants={wordVariants} className="inline-block mr-[0.25em]">
              {word}
            </motion.span>
          ))}
          <br className="hidden md:block" />
          {sloganAccent.map((word) => (
            <motion.span
              key={word}
              variants={wordVariants}
              className="inline-block mr-[0.25em] text-accent"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={1.2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-text-secondary text-base mb-10"
        >
          Make · n8n · Claude API · no code required
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={1.5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-3"
        >
          <MagneticButton>
            <a
              href="#cases"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-6 py-3 rounded-full bg-accent text-white text-sm font-medium hover:bg-[#5B3EEF] hover:shadow-accent transition-[background-color,box-shadow] duration-150"
            >
              View Cases
            </a>
          </MagneticButton>

          <MagneticButton>
            <button
              ref={contactRef}
              onClick={handleAudit}
              className="px-6 py-3 rounded-full border border-border-active text-text-primary text-sm font-medium hover:bg-bg-tertiary transition-[background-color] duration-150"
            >
              Get a free audit
            </button>
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={1.8}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-20 flex flex-wrap gap-x-12 gap-y-6"
        >
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="text-text-primary font-bold text-2xl md:text-3xl">{value}</p>
              <p className="text-text-secondary text-sm mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        custom={2.2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-border-active to-transparent mx-auto"
        />
      </motion.div>
    </section>
  )
}
