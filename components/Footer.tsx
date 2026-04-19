'use client'

import { Mail, Send } from 'lucide-react'
import { useLang } from '@/components/LangProvider'

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

export default function Footer() {
  const { lang: _ } = useLang()

  return (
    <footer className="border-t border-border-default mt-auto">
      <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-text-disabled text-sm">
          © {new Date().getFullYear()} Illia Usiuk
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://linkedin.com/in/illia-usiuk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-disabled hover:text-text-primary transition-[color,filter] duration-200 hover:[filter:drop-shadow(0_0_7px_rgba(107,78,255,0.6))]"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href="https://t.me/illia_usiuk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="text-text-disabled hover:text-text-primary transition-[color,filter] duration-200 hover:[filter:drop-shadow(0_0_7px_rgba(107,78,255,0.6))]"
          >
            <Send size={18} />
          </a>
          <a
            href="mailto:illia.usiuk@gmail.com"
            aria-label="Email"
            className="text-text-disabled hover:text-text-primary transition-[color,filter] duration-200 hover:[filter:drop-shadow(0_0_7px_rgba(107,78,255,0.6))]"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
