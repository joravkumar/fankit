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
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 96, color: '#f0ede8', letterSpacing: '0.05em', lineHeight: 1 }}>
          Fan<span style={{ color: '#1aab78' }}>Kit</span>
        </div>
        <div style={{ fontSize: 30, color: '#a8a49e', marginTop: 20, fontWeight: 300 }}>
          Creator Merch, Done For You
        </div>
        <div style={{ fontSize: 16, color: '#1aab78', marginTop: 32, letterSpacing: '0.15em' }}>
          FANKIT.IN
        </div>
      </div>
    ),
    { ...size }
  )
}
