'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLang } from '@/components/LangProvider'
import { t } from '@/lib/i18n'


export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { lang, setLang } = useLang()
  const tr = t[lang].nav

  const links = [
    { href: '/', label: tr.home },
    { href: '/#cases', label: tr.cases },
    { href: '/about', label: tr.about },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href.replace('/#', '/'))
  }

  const handleContactClick = () => {
    setDrawerOpen(false)
    if (pathname !== '/') {
      window.location.href = '/#contact'
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={[
          'fixed top-0 inset-x-0 z-50 transition-[border-color,background-color] duration-200',
          'bg-bg-primary/80 backdrop-blur-[20px]',
          scrolled ? 'border-b border-border-default' : 'border-b border-transparent',
        ].join(' ')}
      >
        <nav className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="font-bold text-text-primary text-base tracking-tight hover:opacity-80 transition-opacity duration-150"
          >
            MyAIWay
          </Link>

          {/* Center links — desktop */}
          <ul className="hidden md:flex items-center gap-6">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    'text-sm transition-colors duration-150 relative pb-0.5',
                    isActive(href)
                      ? 'text-text-primary after:absolute after:bottom-0 after:inset-x-0 after:h-px after:bg-accent'
                      : 'text-text-secondary hover:text-text-primary',
                  ].join(' ')}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side — desktop */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language switcher */}
            <button
              onClick={() => setLang(lang === 'EN' ? 'UA' : 'EN')}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 px-1"
              aria-label="Switch language"
            >
              {lang}
            </button>

            {/* Contact CTA */}
            <button
              onClick={handleContactClick}
              className="px-4 py-2 rounded-md bg-accent text-white text-sm font-medium hover:bg-[#5B3EEF] transition-colors duration-150"
            >
              {tr.contact}
            </button>
          </div>

          {/* Burger — mobile */}
          <button
            className="md:hidden text-text-secondary hover:text-text-primary transition-colors duration-150"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black"
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-bg-secondary border-l border-border-default flex flex-col p-6"
            >
              {/* Close */}
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-text-primary">MyAIWay</span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="text-text-secondary hover:text-text-primary transition-colors duration-150"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Links */}
              <ul className="flex flex-col gap-1 flex-1">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setDrawerOpen(false)}
                      className={[
                        'block px-3 py-2.5 rounded-md text-sm transition-colors duration-150',
                        isActive(href)
                          ? 'text-text-primary bg-bg-tertiary'
                          : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary',
                      ].join(' ')}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Bottom row */}
              <div className="flex items-center justify-between pt-6 border-t border-border-default">
                <button
                  onClick={() => setLang(lang === 'EN' ? 'UA' : 'EN')}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
                >
                  {lang}
                </button>
                <button
                  onClick={handleContactClick}
                  className="px-4 py-2 rounded-full bg-accent text-white text-sm font-medium hover:bg-[#5B3EEF] transition-colors duration-150"
                >
                  Contact
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
