'use client'

import Image from 'next/image'

function InstagramIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.75" /><circle cx="12" cy="12" r="4.1" /><circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" stroke="none" /></svg>
}

function FacebookIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.55 21v-8.22h2.74l.42-3.12h-3.16V7.48c0-.9.3-1.56 1.66-1.56h1.77V2.96c-.3-.04-1.35-.1-2.57-.1-2.55 0-4.29 1.56-4.29 4.42v2.48H7.5v3.12h2.56V21h3.49Z" /></svg>
}

function LinkedInIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.65 8.32a1.65 1.65 0 1 1 0-3.3 1.65 1.65 0 0 1 0 3.3ZM5.06 9.84h3.18v8.16H5.06V9.84Zm5.19 0h3.06v1.12h.05c.42-.8 1.47-1.65 3.02-1.65 3.23 0 3.82 2.13 3.82 4.89v3.8h-3.18v-3.54c0-1.04-.02-2.38-1.45-2.38-1.46 0-1.68 1.14-1.68 2.31v3.61H10.25V9.84Z" /></svg>
}

function TikTokIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.3 3.2c.64 1.63 1.9 2.75 3.74 3.12v2.72a6.51 6.51 0 0 1-3.4-1.05v7.13c0 2.95-2.38 5.33-5.33 5.33S4.98 18.07 4.98 15s2.38-5.33 5.33-5.33c.44 0 .86.08 1.26.2v2.78a3.09 3.09 0 0 0-1.26-.31c-1.64 0-2.97 1.33-2.97 2.97s1.33 2.97 2.97 2.97 2.96-1.33 2.96-2.97V3.2h2.03Z" /></svg>
}

function YouTubeIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.13c0-1.72-.2-3.33-.6-4.43-.5-1.45-1.57-2.38-3.08-2.78C16.4 4.44 12 4.44 12 4.44s-4.4 0-5.32.48c-1.51.4-2.58 1.33-3.08 2.78C3.2 8.8 3 10.41 3 12.13c0 1.72.2 3.33.6 4.43.5 1.45 1.57 2.38 3.08 2.78.92.48 5.32.48 5.32.48s4.4 0 5.32-.48c1.51-.4 2.58-1.33 3.08-2.78.4-1.1.6-2.71.6-4.43Zm-11.05 3.63V8.83l6.36 3.47-6.36 3.46Z" /></svg>
}

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/travelclasssa/', Icon: InstagramIcon },
  { label: 'Facebook', href: 'https://www.facebook.com/travelclasssa/', Icon: FacebookIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/travel-class-sa/', Icon: LinkedInIcon },
  { label: 'TikTok', href: 'https://www.tiktok.com/@travelclasssa', Icon: TikTokIcon },
  { label: 'YouTube', href: 'https://www.youtube.com/@travelclasssa', Icon: YouTubeIcon },
]

const exploreLinks = [
  { label: 'Holidays', href: '/#holidays' },
  { label: 'Corporate', href: '/#corporate' },
  { label: 'Group Travel', href: '/#group-travel' },
  { label: 'VIP Concierge', href: '/vip-concierge' },
  { label: 'Contact', href: '/#contact' },
]

export default function TravelClassFooter() {
  return (
    <footer className="travel-footer">
      <div className="travel-footer-main">
        <div className="travel-footer-brand">
          <a href="/" aria-label="Travel Class SA home" className="travel-footer-logo">
            <Image src="/logo.png" alt="Travel Class SA" width={140} height={104} priority />
          </a>
          <p>Your journey.<br /><em>Our expertise.</em></p>
        </div>

        <nav className="travel-footer-explore" aria-label="Footer navigation">
          <h2>Explore</h2>
          {exploreLinks.map(link => <a key={link.label} href={link.href}>{link.label}</a>)}
        </nav>

        <div className="travel-footer-contact">
          <h2>Contact</h2>
          <span>Johannesburg, South Africa</span>
          <a href="tel:+27728336872">+27 72 833 6872</a>
          <a href="mailto:info@travelclasssa.com">info@travelclasssa.com</a>
        </div>
      </div>

      <div className="travel-footer-social">
        <h2>Follow us</h2>
        <div className="travel-footer-social-links" aria-label="Travel Class SA social media">
          {socialLinks.map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
              <Icon />
            </a>
          ))}
        </div>
      </div>

      <div className="travel-footer-bottom">
        <span>© 2026 Travel Class SA · South Africa</span>
        <span>Designed by <a href="https://sihleb.co.za" target="_blank" rel="noopener noreferrer">SihleB</a></span>
      </div>
    </footer>
  )
}
