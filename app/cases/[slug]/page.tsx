import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { compileMDX } from 'next-mdx-remote/rsc'
import { getCaseBySlug, getActiveSlugs, estimateReadTime } from '@/lib/cases'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ScrollProgress from '@/components/ScrollProgress'
import { cookies } from 'next/headers'

interface Params { slug: string }

export async function generateStaticParams() {
  return getActiveSlugs().map(slug => ({ slug }))
}

export const dynamic = 'force-dynamic'

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params
  const data = getCaseBySlug(slug)
  if (!data) return {}
  const { frontmatter: c } = data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  return {
    title: `${c.title} — MyAIWay`,
    description: c.description,
    openGraph: { title: c.title, description: c.description, url: `${siteUrl}/cases/${slug}` },
  }
}

export default async function CasePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params

  const cookieStore = await cookies()
  const langCookie = cookieStore.get('lang')?.value
  const locale: 'en' | 'uk' = langCookie === 'UA' ? 'uk' : 'en'

  const isUK = locale === 'uk'

  const data = getCaseBySlug(slug, locale)
  if (!data || data.frontmatter.status !== 'active') notFound()

  const { frontmatter: c, content } = data
  const readTime = estimateReadTime(content)

  const { content: mdxContent } = await compileMDX({
    source: content,
    options: { parseFrontmatter: false },
  })

  const ui = {
    back: isUK ? '← Всі кейси' : '← All cases',
    about: isUK ? 'Про цей кейс' : 'About this case',
    stack: isUK ? 'Стек' : 'Stack',
    read: isUK ? 'хв читання' : 'min read',
    cta: isUK ? 'Схожа задача?' : 'Got a similar problem?',
  }

  return (
    <>
      <ScrollProgress />
      <main className="max-w-[1400px] mx-auto px-6 pt-24 pb-24">

        <Link
          href="/#cases"
          className="inline-flex items-center gap-1.5 text-text-secondary text-sm hover:text-text-primary transition-colors duration-150 mb-10"
        >
          <ArrowLeft size={14} />
          {ui.back}
        </Link>

        <div className="grid lg:grid-cols-[1fr_280px] gap-12 lg:gap-16 items-start">

          {/* ── Left: prose ── */}
          <article>
            <h1 className="font-bold text-text-primary text-3xl md:text-4xl mb-3">{c.title}</h1>
            <p className="text-accent font-bold text-2xl md:text-3xl mb-8">{c.metric}</p>

            <div className="prose prose-invert prose-sm max-w-none
              [&_h2]:text-text-primary [&_h2]:font-semibold [&_h2]:text-xl [&_h2]:mt-10 [&_h2]:mb-4
              [&_h3]:text-text-primary [&_h3]:font-semibold [&_h3]:text-base [&_h3]:mt-8 [&_h3]:mb-3
              [&_p]:text-text-secondary [&_p]:leading-relaxed [&_p]:mb-4
              [&_li]:text-text-secondary [&_li]:leading-relaxed
              [&_strong]:text-text-primary
              [&_a]:text-accent-blue [&_a]:underline [&_a]:underline-offset-2
              [&_code]:text-accent-cyan [&_code]:bg-bg-tertiary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-sm [&_code]:text-xs
              [&_pre]:bg-bg-secondary [&_pre]:border [&_pre]:border-border-default [&_pre]:rounded-md [&_pre]:p-4 [&_pre]:overflow-x-auto
              [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:text-text-secondary
            ">
              {mdxContent}
            </div>
          </article>

          {/* ── Right: sticky sidebar ── */}
          <aside className="lg:sticky lg:top-28 flex flex-col gap-4">

            <div className="rounded-md bg-bg-secondary border border-border-default p-5">
              <p className="text-text-disabled text-xs uppercase tracking-wider mb-3">{ui.about}</p>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">{c.description}</p>
              <p className="text-text-disabled text-sm">{readTime} {ui.read}</p>
            </div>

            <div className="rounded-md bg-bg-secondary border border-border-default p-5">
              <p className="text-text-disabled text-xs uppercase tracking-wider mb-3">{ui.stack}</p>
              <div className="flex flex-wrap gap-1.5">
                {c.tools.map(tool => (
                  <span key={tool} className="text-sm px-2.5 py-1 rounded-sm bg-bg-tertiary text-text-secondary border border-border-default">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="/#contact"
              className="inline-flex items-center justify-center h-11 px-6 rounded-md bg-accent text-white text-sm font-medium hover:bg-[#5B3EEF] transition-colors duration-200"
            >
              {ui.cta}
            </a>
          </aside>
        </div>
      </main>
    </>
  )
}
