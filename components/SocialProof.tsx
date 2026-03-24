'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] } },
}

export default function SocialProof() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
        >
          <blockquote className="rounded-md bg-bg-secondary border border-border-default p-8 max-w-2xl">
            <p className="text-text-primary text-base leading-relaxed mb-4">
              "Built a personal AI coach that reads real schedule data and executes actions — marks
              tasks complete, reschedules the day, adjusts the plan — all from a single chat
              message. Prompt caching cut API costs by 90%."
            </p>
            <footer className="text-text-secondary text-sm">
              Personal project · Claude API + Next.js · 2025
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}
