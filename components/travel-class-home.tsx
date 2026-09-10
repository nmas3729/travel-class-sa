'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ArrowUpRight, ChevronDown, ChevronRight, Menu, X } from 'lucide-react'

function SocialPlaceholderGlyph({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span
      aria-label={label}
      title={label}
      role="img"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(255,255,255,0.02)',
        color: 'rgba(240,237,232,0.72)',
      }}
    >
      {children}
    </span>
  )
}

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none">
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="5.5" fill="url(#ig-grad)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="white" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3.2" stroke="white" strokeWidth="1.5" />
      <circle cx="17" cy="7" r="1" fill="white" />
    </svg>
  )
}

function FacebookGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#1877F2" />
      <path d="M13.55 21v-8.22h2.74l.42-3.12h-3.16V7.48c0-.9.3-1.56 1.66-1.56h1.77V2.96c-.3-.04-1.35-.1-2.57-.1-2.55 0-4.29 1.56-4.29 4.42v2.48H7.5v3.12h2.56V21h3.49Z" fill="white" />
    </svg>
  )
}

function LinkedInGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#0A66C2" />
      <path d="M6.65 8.32a1.65 1.65 0 1 1 0-3.3 1.65 1.65 0 0 1 0 3.3ZM5.06 9.84h3.18v8.16H5.06V9.84Zm5.19 0h3.06v1.12h.05c.42-.8 1.47-1.65 3.02-1.65 3.23 0 3.82 2.13 3.82 4.89v3.8h-3.18v-3.54c0-1.04-.02-2.38-1.45-2.38-1.46 0-1.68 1.14-1.68 2.31v3.61H10.25V9.84Z" fill="white" />
    </svg>
  )
}

function TikTokGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#010101" />
      <path d="M15.8 3.6c.64 1.63 1.9 2.75 3.74 3.12v2.72a6.51 6.51 0 0 1-3.4-1.05v7.13c0 2.95-2.38 5.34-5.33 5.34S5.48 18.46 5.48 15.5s2.38-5.33 5.33-5.33c.44 0 .86.08 1.26.2v2.78a3.09 3.09 0 0 0-1.26-.31c-1.64 0-2.97 1.33-2.97 2.97s1.33 2.97 2.97 2.97 2.96-1.33 2.96-2.97V3.6h2.97Z" fill="#69C9D0" />
      <path d="M15.3 3.2c.64 1.63 1.9 2.75 3.74 3.12v2.72a6.51 6.51 0 0 1-3.4-1.05v7.13c0 2.95-2.38 5.34-5.33 5.34S4.98 17.96 4.98 15s2.38-5.33 5.33-5.33c.44 0 .86.08 1.26.2v2.78a3.09 3.09 0 0 0-1.26-.31c-1.64 0-2.97 1.33-2.97 2.97s1.33 2.97 2.97 2.97 2.96-1.33 2.96-2.97V3.2h2.97Z" fill="#EE1D52" />
      <path d="M15.1 3c.64 1.63 1.9 2.75 3.74 3.12v2.72a6.51 6.51 0 0 1-3.4-1.05v7.13c0 2.95-2.38 5.34-5.33 5.34S4.78 17.76 4.78 14.8s2.38-5.33 5.33-5.33c.44 0 .86.08 1.26.2v2.78a3.09 3.09 0 0 0-1.26-.31c-1.64 0-2.97 1.33-2.97 2.97s1.33 2.97 2.97 2.97 2.96-1.33 2.96-2.97V3h2.97Z" fill="white" />
    </svg>
  )
}

function YouTubeGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#FF0000" />
      <path d="M19.5 8.3a2 2 0 0 0-1.4-1.4C16.9 6.5 12 6.5 12 6.5s-4.9 0-6.1.4A2 2 0 0 0 4.5 8.3C4.1 9.5 4 12 4 12s.1 2.5.5 3.7a2 2 0 0 0 1.4 1.4C7.1 17.5 12 17.5 12 17.5s4.9 0 6.1-.4a2 2 0 0 0 1.4-1.4c.4-1.2.5-3.7.5-3.7s-.1-2.5-.5-3.7ZM10 14.5V9.5l4.5 2.5-4.5 2.5Z" fill="white" />
    </svg>
  )
}

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#25D366" />
      <path d="M17.5 6.5A7.5 7.5 0 0 0 6.3 17.1L5 20l2.9-1.3A7.5 7.5 0 1 0 17.5 6.5Zm-5.5 11a5.5 5.5 0 0 1-3-.87l-2.1.95.95-2.06a5.5 5.5 0 1 1 4.15 1.98Zm3-4.25c-.16-.08-.97-.48-1.12-.53-.15-.06-.26-.08-.37.08-.11.16-.43.53-.53.64-.1.1-.2.12-.36.04a4.5 4.5 0 0 1-2.25-1.97c-.17-.29.17-.27.48-.9.05-.11.03-.2-.01-.28-.04-.08-.37-.9-.51-1.23-.13-.33-.27-.28-.37-.29H8.5a.7.7 0 0 0-.51.24c-.17.19-.66.64-.66 1.57s.68 1.82.77 1.94c.1.13 1.33 2.03 3.22 2.85.45.19.8.31 1.07.39.45.14.86.12 1.18-.07.36-.22.97-.4 1.1-.78.14-.38.14-.7.1-.77-.04-.07-.15-.11-.31-.19Z" fill="white" />
    </svg>
  )
}

const socialPlaceholders = [
  { label: 'Instagram', Icon: InstagramGlyph },
  { label: 'Facebook', Icon: FacebookGlyph },
  { label: 'LinkedIn', Icon: LinkedInGlyph },
  { label: 'TikTok', Icon: TikTokGlyph },
  { label: 'YouTube', Icon: YouTubeGlyph },
]

const enquiryTypes = ['Holiday', 'Flights', 'Accommodation', 'Airport Transfer', 'Coach & Bus Hire', 'Corporate Travel', 'Group Travel', 'Tours & Experiences', 'Cruising', 'Visa Desk']
const destinationOptions = [
  { name: 'Cape Town', country: 'South Africa', image: '/cape-town.webp', alt: 'Cape Town with Table Mountain in the distance' },
  { name: 'Kruger' },
  { name: 'Garden Route' },
  { name: 'Durban' },
  { name: 'Victoria Falls' },
  { name: 'Zanzibar' },
  { name: 'Mauritius' },
  { name: 'Namibia' },
  { name: 'Mozambique' },
  { name: 'Botswana' },
]

function RouteMark({ dark = false }: { dark?: boolean }) {
  return <span className={`route-mark ${dark ? 'route-mark-dark' : ''}`} aria-hidden="true"><span /><span /><span /></span>
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="/" className={`logo-image-link ${light ? 'logo-light' : ''}`} aria-label="Travel Class SA home" style={{ display: 'inline-block' }}>
      <Image 
        src="/logo.png" 
        alt="Travel Class SA" 
        width={167} 
        height={127} 
        priority
        style={{ 
          width: 'auto', 
          height: light ? 'clamp(55px, 7vw, 80px)' : 'clamp(40px, 5vw, 55px)', 
          objectFit: 'contain',
          filter: light ? 'drop-shadow(0px 6px 16px rgba(0,0,0,0.3)) opacity(0.95)' : 'drop-shadow(0px 2px 10px rgba(0,0,0,0.15)) opacity(0.92)'
        }} 
      />
    </a>
  )
}

export default function TravelClassHome() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [selected, setSelected] = useState('')
  const [destination, setDestination] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [dates, setDates] = useState('')
  const [activeHeroIndex, setActiveHeroIndex] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)

  const inputStyle: React.CSSProperties = {}

  function openEnquiryContext(context?: { journeyType?: string; destination?: string; step?: number }) {
    const nextJourneyType = context?.journeyType ?? ''
    const nextDestination = context?.destination ?? ''
    const nextStep = typeof context?.step === 'number'
      ? context.step
      : nextDestination
        ? 1
        : nextJourneyType
          ? 0
          : 0

    setSelected(nextJourneyType)
    setDestination(nextDestination)
    setStep(nextStep)
    setSubmitted(false)
    setErrorMsg('')
  }

  function openDestinationContext(destination: string) {
    openEnquiryContext({ destination, step: 1 })
  }

  async function handleSubmit(event: React.MouseEvent | React.FormEvent) {
    event.preventDefault();
    const payload = {
      type: 'main',
      selected,
      destination,
      dates,
      name,
      email,
    };
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(json.error || 'Submission failed');
      }
    } catch (err) {
      setErrorMsg('Network error');
    }
  }

  const serviceDropdownItems = [
    { label: 'Accommodation', href: '#enquiry', journeyType: 'Accommodation' },
    { label: 'Airport Transfers', href: '#enquiry', journeyType: 'Airport Transfer' },
    { label: 'Coach & Bus Hire', href: '#enquiry', journeyType: 'Coach & Bus Hire' },
    { label: 'Tours & Experiences', href: '#enquiry', journeyType: 'Tours & Experiences' },
    { label: 'Cruising', href: '#cruising', journeyType: 'Cruising' },
    { label: 'Visa Desk', href: '#visa-desk', journeyType: 'Visa Desk' },
  ]

  const heroSlides = [
    { src: '/hero-beach.webp', alt: 'Beach holiday destination' },
    { src: '/hero-city.webp', alt: 'City travel experience' },
    { src: '/hero-safari.webp', alt: 'Safari and bush experience' },
  ]

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches)

    updateMotionPreference()
    mediaQuery.addEventListener('change', updateMotionPreference)

    return () => mediaQuery.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    if (reducedMotion || !isAutoPlaying) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setActiveHeroIndex(prev => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [isAutoPlaying, reducedMotion])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return <main id="top">
    <header className="site-header">
      <Logo />
      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="#holidays">Holidays</a>
        <a href="#flights">Flights</a>
        <div
          className={`nav-dropdown ${servicesOpen ? 'open' : ''}`}
          onMouseEnter={() => setServicesOpen(true)}
          onMouseLeave={() => setServicesOpen(false)}
          onFocus={() => setServicesOpen(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setServicesOpen(false)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setServicesOpen(false)
            }
          }}
        >
          <a
            href="#transport"
            className="nav-dropdown-trigger"
            aria-haspopup="true"
            aria-expanded={servicesOpen}
            onClick={() => setServicesOpen(prev => !prev)}
          >
            Services <ChevronDown size={11} className="dropdown-arrow" />
          </a>
          <div className="nav-dropdown-menu" role="menu" aria-label="Services submenu">
            {serviceDropdownItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                role="menuitem"
                onClick={() => {
                  setServicesOpen(false)
                  if (item.journeyType) {
                    openEnquiryContext({ journeyType: item.journeyType, step: 0 })
                  }
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <a href="#corporate">Corporate</a>
        <a href="#group-travel">Group</a>
        <a href="#travel-premium">Travel Premium</a>
        <a href="/vip-concierge" style={{ color: '#D7192D', fontWeight: 700 }}>VIP Concierge</a>
        <a href="#about">About</a>
      </nav>
      <a className="header-cta" href="#enquiry">Request a quote <ArrowUpRight size={15} /></a>
      <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>
    {menuOpen && (
      <nav className="mobile-nav" aria-label="Mobile navigation">
        <a onClick={() => setMenuOpen(false)} href="#holidays">Holidays</a>
        <a onClick={() => setMenuOpen(false)} href="#flights">Flights</a>
        <div className="mobile-services-section">
          <button
            type="button"
            className={`mobile-services-toggle ${mobileServicesOpen ? 'open' : ''}`}
            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            aria-expanded={mobileServicesOpen}
          >
            <span>Services</span>
            <ChevronDown size={14} className="mobile-dropdown-arrow" />
          </button>
          {mobileServicesOpen && (
            <div className="mobile-services-list">
              {serviceDropdownItems.map(item => (
                <a
                  key={item.label}
                  onClick={() => {
                    setMenuOpen(false)
                    if (item.journeyType) {
                      openEnquiryContext({ journeyType: item.journeyType, step: 0 })
                    }
                  }}
                  href={item.href}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
        <a onClick={() => setMenuOpen(false)} href="#corporate">Corporate</a>
        <a onClick={() => setMenuOpen(false)} href="#group-travel">Group</a>
        <a onClick={() => setMenuOpen(false)} href="#travel-premium">Travel Premium</a>
        <a onClick={() => setMenuOpen(false)} href="/vip-concierge" style={{ color: '#D7192D', fontWeight: 700 }}>VIP Concierge</a>
        <a onClick={() => setMenuOpen(false)} href="#about">About</a>
        <a className="mobile-nav-cta" onClick={() => setMenuOpen(false)} href="#enquiry">Request a quote <ArrowUpRight size={15} /></a>
      </nav>
    )}

    <section className="hero-section reference-hero" style={{ gridTemplateColumns: 'var(--hero-cols, 58% 42%)' }}>
      <style>{`
        @media (max-width: 900px) {
          .hero-section.reference-hero { --hero-cols: 1fr; }
        }
        .premium-hero-visual {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4vw;
        }
        .premium-image-wrapper {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 480px;
        }
        .premium-image-frame {
          position: relative;
          width: 100%;
          height: 520px;
          max-height: 60vh;
          min-height: 400px;
          border-radius: 18px; /* refined premium corner */
          overflow: hidden; /* ensure image and overlays are clipped */
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
        }
        @media (max-width: 900px) {
          .premium-hero-visual {
            padding: 0 8vw 60px;
          }
          .premium-image-frame {
            height: 300px;
            min-height: 260px;
          }
        }
        .premium-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          visibility: hidden;
          transition: opacity 1.2s ease, visibility 1.2s, transform 0s 1.2s;
          transform: scale(1);
        }
        .premium-slide-active {
          opacity: 1;
          visibility: visible;
          transform: scale(1.025);
          transition: opacity 1.2s ease, transform 5.5s ease-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .premium-slide, .premium-slide-active {
            transform: none !important;
            transition: opacity 1.2s ease, visibility 1.2s !important;
          }
        }
        .premium-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(8,8,8,0.25) 0%, rgba(8,8,8,0) 40%, rgba(8,8,8,0.1) 100%);
          z-index: 2;
          pointer-events: none;
        }
        .premium-frame-meta {
          position: absolute;
          left: -30px;
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          transform-origin: center;
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 0.25em;
          color: rgba(255,255,255,0.35);
          white-space: nowrap;
          z-index: 3;
        }
        @media (max-width: 900px) {
          .premium-frame-meta { display: none; }
        }
        .premium-indicators {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 24px;
        }
        .premium-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          transition: color 0.4s ease;
          background: transparent;
          border: 0;
          padding: 0;
          cursor: pointer;
          appearance: none;
        }
        .premium-indicator:focus-visible {
          outline: 2px solid rgba(215, 25, 45, 0.9);
          outline-offset: 4px;
          border-radius: 2px;
        }
        .premium-indicator.active {
          color: #D7192D;
        }
        .premium-indicator-line {
          width: 32px;
          height: 1px;
          background: rgba(255,255,255,0.15);
          transition: background 0.4s ease;
        }
        .premium-indicator.active .premium-indicator-line {
          background: #D7192D;
        }
        @media (max-width: 540px) {
          .premium-indicators {
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
          }
          .premium-indicator {
            min-width: 52px;
            min-height: 32px;
            justify-content: center;
          }
        }
      `}</style>
      <div className="hero-copy">
        <p className="hero-sub">We plan. You travel. Stress-free.</p>
        <div className="reference-rule" />
        <p className="eyebrow"><span className="eyebrow-line" /> Travel management company</p>
        <h1><span>Your journey.</span><br /><em>Our expertise.</em></h1>
        <p className="hero-body">From flights and accommodation to transfers, group travel, corporate travel and unforgettable experiences, Travel Class SA brings your journey together through one trusted travel partner.</p>
        <div className="hero-actions">
          <a className="button button-red" href="#enquiry" onClick={() => openEnquiryContext()}>Request a quote <ArrowUpRight size={16} /></a>
          <a className="text-link" href="#enquiry" onClick={() => openEnquiryContext()}>Speak to a consultant <ChevronRight size={16} /></a>
        </div>
      </div>
      <div className="premium-hero-visual">
        <div className="premium-frame-meta" aria-hidden="true">
          01 / 03 &nbsp; — &nbsp; DESTINATION EXPERIENCE
        </div>
        <div className="premium-image-wrapper">
          <div className="premium-image-frame">
            <div className="premium-image-overlay" />
            {heroSlides.map((slide, i) => (
              <div key={slide.src} className={`premium-slide ${i === activeHeroIndex ? 'premium-slide-active' : ''}`} aria-hidden={i !== activeHeroIndex}>
                <Image 
                  src={slide.src} 
                  alt={slide.alt} 
                  fill 
                  priority={i === 0} 
                  sizes="(max-width: 900px) 90vw, 40vw" 
                  style={{ objectFit: 'cover' }} 
                />
              </div>
            ))}
          </div>
          <div className="premium-indicators" aria-label="Destination experience controls">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                className={`premium-indicator ${i === activeHeroIndex ? 'active' : ''}`}
                onClick={() => {
                  setActiveHeroIndex(i)
                  setIsAutoPlaying(false)
                }}
                onFocus={() => setIsAutoPlaying(false)}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                onBlur={() => setIsAutoPlaying(true)}
                aria-label={`Show ${slide.alt}`}
                aria-pressed={i === activeHeroIndex}
                aria-current={i === activeHeroIndex ? 'true' : undefined}
              >
                {String(i + 1).padStart(2, '0')}
                <div className="premium-indicator-line" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="enquiry-section" id="enquiry"><div className="section-label">Start here <span>01—03</span></div><div className="enquiry-grid"><div><p className="eyebrow red">Your journey begins</p><h2>Where are<br /><em>you going?</em></h2><p className="section-intro">Tell us what you&apos;re planning. We&apos;ll help coordinate the journey.</p><div className="journey-progress"><span className="progress-active" /><span /><span /></div></div><div className="enquiry-panel"><p className="panel-kicker">Step {step + 1} of 3</p>{step === 0 && <><h3>What kind of journey are you planning?</h3><div className="choice-list">{enquiryTypes.map(type => <button key={type} className={selected === type ? 'choice selected' : 'choice'} onClick={() => setSelected(type)}>{type}<ChevronRight size={17} /></button>)}</div></>}{step === 1 && <><h3>Where will your journey take you?</h3><label>Destination<input value={destination} onChange={e => setDestination(e.target.value)} placeholder="e.g. Cape Town, Mauritius, Paris" /></label><label>Travel dates<input value={dates} onChange={e => setDates(e.target.value)} type="text" placeholder="When would you like to travel?" /></label></>}{step === 2 && (
      <>
        <h3>Let’s make it personal.</h3>
        <label>
          Your name
          <input placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required style={inputStyle} />
        </label>
        <label>
          Email or WhatsApp
          <input placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
        </label>
        <button className="panel-next" onClick={handleSubmit}>
          Send enquiry <ArrowUpRight size={16} />
        </button>
      </>
    )}
    {step < 2 && (
      <button className="panel-next" onClick={() => setStep(step + 1)}>
        Continue <ArrowUpRight size={16} />
      </button>
    )}</div></div></section>

    <section className="journey-section"><div className="section-label light">The complete picture <span>02—03</span></div><div className="journey-heading"><p className="eyebrow red">More than a booking</p><h2>We manage<br /><em>the journey.</em></h2><p>Every moving part, thoughtfully connected. From the moment you leave home to the moment you return.</p></div><div className="timeline">{[['01', 'Flight', 'The right route, the right fare.'], ['02', 'Airport transfer', 'A smooth arrival, every time.'], ['03', 'Accommodation', 'A place that feels like yours.'], ['04', 'Tours & experiences', 'The moments you came for.'], ['05', 'Local transport', 'Every table, trail and turn connected.'], ['06', 'Return transfer', 'A considered journey back to the airport.'], ['07', 'Flight home', 'Home, with stories to tell.']].map((item, i) => <div className="timeline-item" key={item[1]}><div className="timeline-top"><span>{item[0]}</span><i className={i === 0 ? 'active-dot' : ''} /></div><h3>{item[1]}</h3><p>{item[2]}</p></div>)}</div><div className="journey-relationship"><span>Discover</span><i /> <span>Enquire</span><i /> <span>Consult</span><i /> <span>Quote</span><i /> <span>Confirm</span><i /> <span>Travel</span><i /> <span>Support</span><i /> <span>Return</span></div></section>

    <section className="services-section" id="transport"><div className="section-label">What we do <span>03—03</span></div><div className="services-head"><div><p className="eyebrow red">One partner. Every detail.</p><h2>Everything<br /><em>in motion.</em></h2></div><p>One trusted team to plan, book and manage every part of your travel. No loose ends. No handovers. Just a better way to go.</p></div><div className="services-editorial"><div className="service-feature" id="flights" style={{ position: 'relative', overflow: 'hidden' }}>
          <Image
            src="/fight-card.png"
            alt="Commercial aircraft on approach with warm sky"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
            style={{ objectFit: 'cover', objectPosition: 'center 25%' }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(142, 11, 24, 0.95) 0%, rgba(215, 25, 45, 0.82) 40%, rgba(5, 10, 20, 0.25) 70%, rgba(5, 10, 20, 0.6) 100%)',
              zIndex: 1,
            }}
          />
          <span style={{ zIndex: 2 }}>01 / 10</span>
          <h3 style={{ position: 'relative', zIndex: 2 }}>Flights</h3>
          <p style={{ position: 'relative', zIndex: 2 }}>Domestic, international, multi-city and everything between. We find the route that makes sense for you.</p>
          <a href="#enquiry" style={{ position: 'relative', zIndex: 2 }} onClick={() => openEnquiryContext({ journeyType: 'Flights' })}>Request a flight quote <ArrowUpRight size={15} /></a>
        </div><div className="service-list">{[['Accommodation', 'Plan a stay', 'Accommodation'], ['Airport Transfers', 'Arrange a transfer', 'Airport Transfer'], ['Coach & Bus Hire', 'Hire a coach', 'Coach & Bus Hire'], ['Corporate Travel', 'Move your team', 'Corporate Travel'], ['Group Travel', 'Plan group travel', 'Group Travel'], ['Cruising', 'Plan a cruise', 'Cruising'], ['Holiday Packages', 'Explore holidays', 'Holiday'], ['Tours & Experiences', 'Discover experiences', 'Tours & Experiences'], ['Visa Desk', 'Get visa guidance', 'Visa Desk']].map((item, i) => <a key={item[0]} href="#enquiry" onClick={() => openEnquiryContext({ journeyType: item[2] })}><span>0{i + 2}</span><span className="service-list-copy">{item[0]}<small>{item[1]}</small></span><ArrowUpRight size={15} /></a>)}</div>        <div className="service-feature" id="cruising" style={{ position: 'relative', overflow: 'hidden' }}>
          <Image
            src="/cruise.png"
            alt="Luxury ocean cruise liner docked under evening sky with calm water reflection"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
            style={{ objectFit: 'cover', objectPosition: 'center 25%' }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(142, 11, 24, 0.95) 0%, rgba(215, 25, 45, 0.82) 40%, rgba(5, 10, 20, 0.25) 70%, rgba(5, 10, 20, 0.6) 100%)',
              zIndex: 1,
            }}
          />
          <span style={{ zIndex: 2 }}>07 / 10</span>
          <h3 style={{ position: 'relative', zIndex: 2 }}>Cruising</h3>
          <p style={{ position: 'relative', zIndex: 2 }}>Cruise holiday packages and related cruise travel options, coordinated around your journey, dates and destination.</p>
          <a href="#enquiry" style={{ position: 'relative', zIndex: 2 }} onClick={() => openEnquiryContext({ journeyType: 'Cruising' })}>Plan a cruise <ArrowUpRight size={15} /></a>
        </div><div className="service-feature" id="visa-desk" style={{ position: 'relative', overflow: 'hidden' }}>
          <Image
            src="/visa-card.png"
            alt="Visa desk staff assisting customers in a bright office"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
            style={{ objectFit: 'cover', objectPosition: 'center 25%' }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(142, 11, 24, 0.95) 0%, rgba(215, 25, 45, 0.82) 40%, rgba(5, 10, 20, 0.25) 70%, rgba(5, 10, 20, 0.6) 100%)',
              zIndex: 1,
            }}
          />
          <span style={{ zIndex: 2 }}>08 / 10</span>
          <h3 style={{ position: 'relative', zIndex: 2 }}>Visa Desk</h3>
          <p style={{ position: 'relative', zIndex: 2 }}>Guidance on visa requirements and supporting documentation for your destination. We help you understand what&apos;s needed and support you in preparing your travel visa documentation. Visa requirements vary by destination and traveller circumstances.</p>
          <a href="#enquiry" style={{ position: 'relative', zIndex: 2 }} onClick={() => openEnquiryContext({ journeyType: 'Visa Desk' })}>Get visa guidance <ArrowUpRight size={15} /></a>
        </div></div></section>

    <section className="destination-section" id="holidays"><div className="destination-image"><Image src={destinationOptions[0].image} alt={destinationOptions[0].alt} fill sizes="(max-width: 800px) 100vw, 62vw" /><div className="image-caption">Featured destination / 01</div></div><div className="destination-copy"><p className="eyebrow">Go further</p><h2>{destinationOptions[0].name}<br /><em>{destinationOptions[0].country}</em></h2><p>Where mountain meets ocean, and every day feels like the beginning of something. Let us take you there.</p><a className="text-link" href="#enquiry" onClick={() => openDestinationContext(destinationOptions[0].name)}>Plan this journey <ChevronRight size={16} /></a><div className="destination-list">{destinationOptions.slice(1).map((destination, i) => <button key={destination.name} type="button" onClick={() => openDestinationContext(destination.name)} style={{ appearance: 'none', border: 0, background: 'transparent', padding: 0, width: '100%', textAlign: 'left', font: 'inherit', color: 'inherit', cursor: 'pointer' }}><span><b>{String(i + 2).padStart(2, '0')}</b>{destination.name}</span></button>)}</div></div></section>

    <section className="dark-feature corporate" id="corporate"><div className="feature-marker">TC / 04</div><div><p className="eyebrow red">For business that moves</p><h2>Corporate travel.<br /><em>Without the complexity.</em></h2></div><div className="feature-detail"><p>Coordinate business flights, accommodation, transfers, shuttles, conferences and employee travel through one point of coordination.</p><div className="detail-list">{['Business flights', 'Accommodation', 'Transfers & shuttles', 'Car hire', 'Conferences', 'Group travel', 'Employee travel', 'Reporting & support', 'Emergency assistance'].map(x => <span key={x}>{x}</span>)}</div><a className="button button-outline" href="#enquiry" onClick={() => openEnquiryContext({ journeyType: 'Corporate Travel', step: 0 })}>Talk to our corporate team <ArrowUpRight size={16} /></a></div></section>

    <section className="group-section" id="group-travel"><div className="group-copy"><p className="eyebrow red">For every kind of group</p><h2>One group.<br />One itinerary.<br /><em>One travel partner.</em></h2><p>Schools, universities, churches, sports teams, NGOs, conferences and weddings. We coordinate the whole picture so everyone can enjoy the moment.</p><a className="button button-red" href="#enquiry" onClick={() => openEnquiryContext({ journeyType: 'Group Travel', step: 0 })}>Plan group travel <ArrowUpRight size={16} /></a></div><div className="group-steps">{['Flights', 'Accommodation', 'Transfers', 'Coach', 'Activities', 'Meals', 'Itinerary management'].map((x, i) => <div key={x}><span>0{i + 1}</span>{x}<ChevronRight size={15} /></div>)}</div></section>

    <section className="premium-section" id="travel-premium"><div className="premium-stamp">TC<br /><span>SA</span></div><div><p className="eyebrow red">A new way to travel</p><h2>Plan today.<br /><em>Travel tomorrow.</em></h2><p>Travel Premium Plan — currently being developed. Travel Class SA is exploring a future structured travel funding solution through an appropriately licensed financial-services or insurance partner. Nothing here is an active financial product.</p><div className="contribution-list" aria-label="Potential illustrative contribution levels">{['R250', 'R500', 'R750', 'R1,000', 'R1,500+'].map(x => <span key={x}>{x}</span>)}</div><small className="premium-note">Potential illustrative contribution levels only.</small><a className="button button-dark" href="#contact">Join the waitlist <ArrowUpRight size={16} /></a></div></section>

    <section className="trust-section"><div><p className="eyebrow red">Why Travel Class SA</p><h2>A better way<br /><em>to go.</em></h2></div><div className="trust-copy"><p className="trust-lede">Travel is personal. Your travel partner should be too.</p><div className="trust-lines">{[['Trust', 'A travel partner coordinating your journey from planning through return.'], ['Expertise', 'Thoughtful travel management shaped around your journey.'], ['Convenience', 'One conversation. One itinerary. Every detail coordinated.'], ['Affordability', 'Travel options shaped around your destination, dates and budget.'], ['Flexibility', 'Journey details can be discussed and adjusted with your consultant.'], ['Support', 'Travel support throughout the journey.']].map(x => <div key={x[0]}><span>{x[0]}</span><p>{x[1]}</p></div>)}</div></div></section>

    <section className="about-section" id="about"><div><p className="eyebrow red">About Travel Class SA</p><h2>Travel made<br /><em>more personal.</em></h2></div><div className="about-copy"><p>Travel Class SA is a South African full-service Travel Management Company coordinating complete journeys for individuals, families, couples, leisure travellers, groups and organisations.</p><p>Our aim is to make travel simple, affordable, convenient, professional, personalised and memorable.</p><div className="about-principles"><span>Simple</span><span>Convenient</span><span>Personalised</span><span>Memorable</span></div></div></section>

    <section className="final-cta" id="contact"><RouteMark dark /><p className="eyebrow">The next step is yours</p><h2>Ready to start<br /><em>your journey?</em></h2><p>Tell us where you want to go. We&apos;ll help coordinate how you get there.</p><div className="hero-actions"><a className="button button-red" href="#enquiry" onClick={() => openEnquiryContext()}>Request a quote <ArrowUpRight size={16} /></a><a className="text-link" href="#enquiry" onClick={() => openEnquiryContext()}>Speak to a consultant <ChevronRight size={16} /></a></div></section>

    <footer className="site-footer"><Logo light /><p>Your journey.<br /><em>Our expertise.</em></p><div className="footer-links"><a href="#holidays">Holidays</a><a href="#corporate">Corporate</a><a href="#group-travel">Group travel</a><a href="#contact">Contact</a></div><div className="footer-contact" aria-label="Travel Class SA contact information"><a className="footer-email-link" href="mailto:info@travelclasssa.com" aria-label="Email Travel Class SA">info@travelclasssa.com</a><button type="button" className="footer-whatsapp-button" aria-label="WhatsApp — coming soon" aria-disabled="true" disabled title="WhatsApp — coming soon"><WhatsAppGlyph /></button><div className="footer-socials" aria-label="Travel Class SA social media placeholders">{socialPlaceholders.map(({ label, Icon }) => (<span key={label} className="footer-social-item" aria-label={`${label} — coming soon`} title={`${label} — coming soon`} role="img"><Icon /></span>))}</div></div><div className="footer-bottom"><span>© 2026 Travel Class SA</span><span>South Africa</span><p>Designed by <a href="https://sihleb.co.za" target="_blank" rel="noopener noreferrer">SihleB</a></p></div></footer>
  </main>
}
