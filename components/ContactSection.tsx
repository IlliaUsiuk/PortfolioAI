'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import ContactForm from './ContactForm'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] } },
}

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
          className="mb-10"
        >
          <h2 className="text-text-primary font-semibold text-2xl md:text-3xl">Get in touch</h2>
          <p className="text-text-secondary text-sm mt-2 max-w-md">
            Tell me about a process you'd like to automate. I'll tell you if and how AI can help — no commitment.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  )
}
