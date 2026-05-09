'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { useLang } from '@/components/LangProvider'
import { t } from '@/lib/i18n'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number], delay: d } }),
}

export default function BestFit() {
  const { lang } = useLang()
  const tr = t[lang].best_fit

  return (
    <section className="px-6 pb-4">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-md border border-border-default bg-bg-secondary px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8"
        >
          <motion.p custom={0} variants={fadeUp} className="text-text-disabled text-xs uppercase tracking-widest shrink-0">
            {tr.heading}
          </motion.p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {tr.items.map((item, i) => (
              <motion.span key={i} custom={i * 0.05} variants={fadeUp}
                className="flex items-center gap-2 text-text-secondary text-sm"
              >
                <CheckCircle size={13} className="text-accent shrink-0" />
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
