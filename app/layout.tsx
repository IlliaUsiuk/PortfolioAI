import type { Metadata } from 'next'
import { Geist, Geist_Mono, Unbounded } from 'next/font/google'
import './globals.css'
import PageTransition from '@/components/PageTransition'
import { LangProvider } from '@/components/LangProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const syne = Unbounded({
  variable: '--font-syne',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://myaiway.com'),
  title: 'Illia Usiuk — AI Specialist',
  description:
    'AI Specialist with a design background. I build agents, automation workflows, and LLM pipelines — from prototype to team adoption.',
  keywords: ['AI specialist', 'AI automation', 'n8n', 'Make', 'Claude API', 'LLM', 'no-code'],
  openGraph: {
    title: 'Illia Usiuk — AI Specialist',
    description:
      'AI Specialist with a design background. I build agents, automation workflows, and LLM pipelines — from prototype to team adoption.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        <LangProvider>
          <PageTransition>{children}</PageTransition>
        </LangProvider>
      </body>
    </html>
  )
}
