import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Travel Class SA | Your Journey. Our Expertise.',
  description: 'Travel Class SA manages the complete travel journey — flights, accommodation, transfers, corporate travel, groups and experiences.',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-white">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
