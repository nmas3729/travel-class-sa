import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'VIP Concierge | Travel Class SA',
  description: 'Travel Class SA VIP Concierge offers personally curated luxury travel, private jet charters, yachts, luxury accommodation, chauffeur services, VIP airport assistance and 24/7 personalised travel support.',
}

export default function VipConciergeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
