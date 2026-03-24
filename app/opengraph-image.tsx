import { ImageResponse } from 'next/og'

export const alt = 'MyAIWay — AI Automation for Your Business'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#08080F',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Purple glow */}
        <div
          style={{
            position: 'absolute',
            left: '20%',
            top: '55%',
            width: 500,
            height: 500,
            background: 'radial-gradient(circle, #6B4EFF 0%, transparent 70%)',
            opacity: 0.18,
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
        />
        {/* Cyan glow */}
        <div
          style={{
            position: 'absolute',
            right: '10%',
            top: '15%',
            width: 350,
            height: 350,
            background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)',
            opacity: 0.1,
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
        />

        {/* Logo */}
        <div
          style={{
            position: 'absolute',
            top: 48,
            left: 80,
            color: '#F0F0FF',
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          MyAIWay
        </div>

        {/* Slogan */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#F0F0FF',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            maxWidth: 800,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>I build systems</span>
          <span>that run <span style={{ color: '#6B4EFF' }}>without you</span></span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: 32,
            color: '#8080A0',
            fontSize: 22,
          }}
        >
          Illia Usiuk · AI Automation Specialist
        </div>
      </div>
    ),
    { ...size }
  )
}
