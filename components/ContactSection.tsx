'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Mail, Send } from 'lucide-react'
import ContactForm from './ContactForm'
import { useLang } from '@/components/LangProvider'
import { t } from '@/lib/i18n'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] } },
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/illia-usiuk',
    icon: <LinkedinIcon size={16} />,
  },
  {
    label: 'Telegram',
    href: 'https://t.me/illia_usiuk',
    icon: <Send size={16} />,
  },
  {
    label: 'usyuk01@gmail.com',
    href: 'mailto:usyuk01@gmail.com',
    icon: <Mail size={16} />,
  },
]

export default function ContactSection() {
  const { lang } = useLang()
  const tr = t[lang].contact

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
          className="mb-10"
        >
          <h2 className="text-text-primary font-semibold text-2xl md:text-3xl">{tr.heading}</h2>
          <p className="text-text-secondary text-sm mt-2 max-w-md">{tr.sub}</p>

          <div className="flex flex-wrap gap-3 mt-6">
            {socials.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border-default bg-bg-secondary text-text-secondary text-sm hover:border-border-active hover:text-text-primary transition-[border-color,color] duration-150"
              >
                {icon}
                {label}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
        >
          <ContactForm lang={lang} />
        </motion.div>
      </div>
    </section>
  )
}
