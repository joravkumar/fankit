import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#080808',
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
        {/* Teal glow top right */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(26,171,120,0.18) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Top row — logo + pill */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: 48, fontWeight: 700, letterSpacing: '0.04em', color: '#f0ede8' }}>
            <span>Fan</span>
            <span style={{ color: '#1aab78' }}>Kit</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(26,171,120,0.12)',
              border: '1px solid rgba(26,171,120,0.35)',
              borderRadius: 100,
              padding: '8px 20px',
              fontSize: 14,
              fontWeight: 500,
              color: '#1aab78',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#1aab78', display: 'flex' }} />
            India&apos;s Creator Merch Studio
          </div>
        </div>

        {/* Center — headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              color: '#f0ede8',
              lineHeight: 0.92,
              letterSpacing: '0.01em',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>YOUR FANS</span>
            <span>WANT TO WEAR</span>
            <span style={{ color: '#1aab78' }}>YOUR VIBE.</span>
          </div>
          <div style={{ fontSize: 22, color: '#a8a49e', fontWeight: 300, display: 'flex' }}>
            Custom merch stores for Indian creators. You post. We handle everything.
          </div>
        </div>

        {/* Bottom — stats */}
        <div style={{ display: 'flex', gap: 48, borderTop: '1px solid #2a2a2a', paddingTop: 36 }}>
          {[
            { num: '60%', label: 'Revenue yours' },
            { num: '5', label: 'Days to go live' },
            { num: 'Rs 0', label: 'Setup cost' },
          ].map((stat) => (
            <div key={stat.num} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: '#f0ede8', display: 'flex' }}>
                {stat.num}
              </div>
              <div style={{ fontSize: 14, color: '#a8a49e', display: 'flex' }}>
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
