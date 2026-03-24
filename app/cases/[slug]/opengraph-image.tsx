import { ImageResponse } from 'next/og'
import { getCaseBySlug } from '@/lib/cases'

export const alt = 'Case study — MyAIWay'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function Image({ params }: Props) {
  const { slug } = await params
  const data = getCaseBySlug(slug)

  const title = data?.frontmatter.title ?? 'Case Study'
  const metric = data?.frontmatter.metric ?? ''
  const tools = data?.frontmatter.tools?.slice(0, 4).join(' · ') ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#08080F',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Purple glow */}
        <div
          style={{
            position: 'absolute',
            left: '30%',
            bottom: '20%',
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, #6B4EFF 0%, transparent 70%)',
            opacity: 0.15,
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
        />

        {/* Top: logo */}
        <div style={{ color: '#8080A0', fontSize: 18, fontWeight: 600 }}>
          MyAIWay
        </div>

        {/* Center: title + metric */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              color: '#F0F0FF',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              maxWidth: 900,
            }}
          >
            {title}
          </div>
          {metric && (
            <div
              style={{
                fontSize: 38,
                fontWeight: 800,
                color: '#6B4EFF',
                letterSpacing: '-0.02em',
              }}
            >
              {metric}
            </div>
          )}
        </div>

        {/* Bottom: tools */}
        {tools && (
          <div style={{ color: '#8080A0', fontSize: 18 }}>
            {tools}
          </div>
        )}
      </div>
    ),
    { ...size }
  )
}
