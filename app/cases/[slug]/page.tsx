import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { compileMDX } from 'next-mdx-remote/rsc'
import { getCaseBySlug, getActiveSlugs, estimateReadTime } from '@/lib/cases'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ScrollProgress from '@/components/ScrollProgress'

interface Params {
  slug: string
}

export async function generateStaticParams() {
  return getActiveSlugs().map(slug => ({ slug }))
}

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
    openGraph: {
      title: c.title,
      description: c.description,
      url: `${siteUrl}/cases/${slug}`,
    },
  }
}

export default async function CasePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const data = getCaseBySlug(slug)

  if (!data || data.frontmatter.status !== 'active') {
    notFound()
  }

  const { frontmatter: c, content } = data
  const readTime = estimateReadTime(content)

  const { content: mdxContent } = await compileMDX({
    source: content,
    options: { parseFrontmatter: false },
  })

  return (
    <>
      <ScrollProgress />

      <main className="max-w-[760px] mx-auto px-6 pt-28 pb-24">

        {/* Back */}
        <Link
          href="/#cases"
          className="inline-flex items-center gap-1.5 text-text-secondary text-sm hover:text-text-primary transition-colors duration-150 mb-12"
        >
          <ArrowLeft size={14} />
          All cases
        </Link>

        {/* Level 1 — above the fold */}
        <h1 className="font-bold text-text-primary text-3xl md:text-4xl mb-3">{c.title}</h1>

        <p className="text-accent font-bold text-2xl md:text-3xl mb-4">{c.metric}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {c.tools.map(t => (
            <span
              key={t}
              className="text-[11px] px-2 py-0.5 rounded-sm bg-bg-tertiary text-text-secondary border border-border-default"
            >
              {t}
            </span>
          ))}
        </div>

        <p className="text-text-secondary text-sm mb-2">{c.description}</p>

        <p className="text-text-disabled text-xs mb-12">{readTime} min read</p>

        {/* MDX content — levels 2 & 3 */}
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

        {/* Inline CTA */}
        <div className="mt-16 pt-8 border-t border-border-default">
          <p className="text-text-secondary text-sm mb-4">Got a similar problem?</p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white text-sm font-medium hover:bg-[#5B3EEF] hover:shadow-accent transition-[background-color,box-shadow] duration-150"
          >
            Let's talk →
          </a>
        </div>
      </main>
    </>
  )
}
