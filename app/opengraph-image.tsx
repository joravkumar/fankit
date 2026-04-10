import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FF6B45',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Warm glow top right */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,248,243,0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Top row — logo + pill */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: 48, fontWeight: 800, letterSpacing: '0.01em', color: '#FFF8F3' }}>
            <span>Fan</span>
            <span style={{ color: '#1A3C2E' }}>Kit</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255,248,243,0.15)',
              border: '1px solid rgba(255,248,243,0.4)',
              borderRadius: 100,
              padding: '8px 20px',
              fontSize: 14,
              fontWeight: 600,
              color: '#FFF8F3',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#FFF8F3', display: 'flex' }} />
            made with love for indian creators
          </div>
        </div>

        {/* Center — headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              color: '#FFF8F3',
              lineHeight: 0.95,
              letterSpacing: '-0.01em',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>LET&apos;S TURN YOUR</span>
            <span>AUDIENCE INTO YOUR</span>
            <span style={{ color: '#1A3C2E' }}>BIGGEST FANS.</span>
          </div>
          <div style={{ fontSize: 22, color: 'rgba(255,248,243,0.85)', fontWeight: 400, display: 'flex' }}>
            Custom merch stores for Indian creators. You post. We handle everything.
          </div>
        </div>

        {/* Bottom — stats */}
        <div style={{ display: 'flex', gap: 48, borderTop: '1px solid rgba(255,248,243,0.3)', paddingTop: 36, background: 'rgba(255,248,243,0.15)', padding: '24px 32px', borderRadius: 16 }}>
          {[
            { num: '60%', label: 'Revenue yours' },
            { num: '5', label: 'Days to go live' },
            { num: 'Rs 0', label: 'Setup cost' },
          ].map((stat) => (
            <div key={stat.num} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#FFF8F3', display: 'flex' }}>
                {stat.num}
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,248,243,0.8)', display: 'flex' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
