import type { MetadataRoute } from 'next'
import { getActiveSlugs } from '@/lib/cases'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://myaiway.com'
  const slugs = getActiveSlugs()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  const caseRoutes: MetadataRoute.Sitemap = slugs.map(slug => ({
    url: `${siteUrl}/cases/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...staticRoutes, ...caseRoutes]
}
