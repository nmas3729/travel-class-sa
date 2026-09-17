import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
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
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9Y1GG4VQBH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9Y1GG4VQBH');
          `}
        </Script>
      </body>
    </html>
  )
}
