import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
})

const dmSans = DM_Sans({
  weight: 'variable',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://fankit.in'),
  title: 'FanKit: Creator Merch, Done For You',
  description:
    'FanKit builds and runs custom merch stores for Indian creators. You post. We handle design, store, shipping, everything. 60% of revenue is yours.',
  openGraph: {
    title: 'FanKit: Creator Merch, Done For You',
    description: 'Your audience wants to wear your vibe. We make that happen.',
    url: 'https://fankit.in',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'FanKit — Creator Merch, Done For You',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FanKit: Creator Merch, Done For You',
    description: 'Your audience wants to wear your vibe. We make that happen.',
  },
  icons: {
    icon:
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%231aab78'/><text x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-weight='700' font-size='14' fill='%23080808'>FK</text></svg>",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${dmSans.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
