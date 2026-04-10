import type { Metadata } from 'next'
import { Nunito, DM_Sans } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-nunito',
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
    'FanKit is your creative merch partner. We design, build, and run your merch store — so you can focus on making content you love.',
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
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%23FF6B45'/><text x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-weight='700' font-size='14' fill='%23FFF8F3'>FK</text></svg>",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${dmSans.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
