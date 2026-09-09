'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ArrowUpRight, ChevronDown, ChevronRight, Menu, X } from 'lucide-react'

const enquiryTypes = ['Holiday', 'Flights', 'Accommodation', 'Airport Transfer', 'Coach & Bus Hire', 'Corporate Travel', 'Group Travel', 'Tours & Experiences', 'Cruising', 'Visa Desk']
const destinations = ['Kruger', 'Garden Route', 'Durban', 'Victoria Falls', 'Zanzibar', 'Mauritius', 'Namibia', 'Mozambique', 'Botswana']

function RouteMark({ dark = false }: { dark?: boolean }) {
  return <span className={`route-mark ${dark ? 'route-mark-dark' : ''}`} aria-hidden="true"><span /><span /><span /></span>
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className={`logo-image-link ${light ? 'logo-light' : ''}`} aria-label="Travel Class SA home" style={{ display: 'inline-block' }}>
      <Image 
        src="/logo.png" 
        alt="Travel Class SA" 
        width={167} 
        height={127} 
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
  const [selected, setSelected] = useState('Holiday')
  const [destination, setDestination] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [dates, setDates] = useState('')
  const [activeHeroIndex, setActiveHeroIndex] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')

  const inputStyle: React.CSSProperties = {}

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
    { label: 'Accommodation', href: '#accommodation' },
    { label: 'Airport Transfers', href: '#airport-transfers' },
    { label: 'Coach & Bus Hire', href: '#coach-bus-hire' },
    { label: 'Tours & Experiences', href: '#tours-experiences' },
    { label: 'Cruising', href: '#cruising' },
    { label: 'Visa Desk', href: '#visa-desk' },
  ]

  const heroSlides = [
    { src: '/hero-beach.webp', alt: 'Beach holiday destination' },
    { src: '/hero-city.webp', alt: 'City travel experience' },
    { src: '/hero-safari.webp', alt: 'Safari and bush experience' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroIndex(prev => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

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
                onClick={() => setServicesOpen(false)}
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
                  onClick={() => setMenuOpen(false)}
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
          border-radius: 2px;
          overflow: hidden;
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
      `}</style>
      <div className="hero-copy">
        <p className="hero-sub">We plan. You travel. Stress-free.</p>
        <div className="reference-rule" />
        <p className="eyebrow"><span className="eyebrow-line" /> Travel management company</p>
        <h1><span>Your journey.</span><br /><em>Our expertise.</em></h1>
        <p className="hero-body">From flights and accommodation to transfers, group travel, corporate travel and unforgettable experiences, Travel Class SA brings your journey together through one trusted travel partner.</p>
        <div className="hero-actions">
          <a className="button button-red" href="#enquiry">Request a quote <ArrowUpRight size={16} /></a>
          <a className="text-link" href="#contact">Speak to a consultant <ChevronRight size={16} /></a>
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
          <div className="premium-indicators" aria-label="Slideshow indicators">
            {heroSlides.map((_, i) => (
              <div key={i} className={`premium-indicator ${i === activeHeroIndex ? 'active' : ''}`} aria-hidden="true">
                0{i + 1}
                <div className="premium-indicator-line" />
              </div>
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

    <section className="services-section" id="transport"><div className="section-label">What we do <span>03—03</span></div><div className="services-head"><div><p className="eyebrow red">One partner. Every detail.</p><h2>Everything<br /><em>in motion.</em></h2></div><p>One trusted team to plan, book and manage every part of your travel. No loose ends. No handovers. Just a better way to go.</p></div><div className="services-editorial"><div className="service-feature"><span>01 / 10</span><h3>Flights</h3><p>Domestic, international, multi-city and everything between. We find the route that makes sense for you.</p><a href="#enquiry">Request a flight quote <ArrowUpRight size={15} /></a></div><div className="service-list">{[['Accommodation', 'Plan a stay'], ['Airport Transfers', 'Arrange a transfer'], ['Coach & Bus Hire', 'Hire a coach'], ['Corporate Travel', 'Move your team'], ['Group Travel', 'Plan group travel'], ['Cruising', 'Plan a cruise'], ['Holiday Packages', 'Explore holidays'], ['Tours & Experiences', 'Discover experiences'], ['Visa Desk', 'Get visa guidance']].map((item, i) => <a key={item[0]} href="#enquiry"><span>0{i + 2}</span><span className="service-list-copy">{item[0]}<small>{item[1]}</small></span><ArrowUpRight size={15} /></a>)}</div>        <div className="service-feature" id="cruising" style={{ position: 'relative', overflow: 'hidden' }}>
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
          <a href="#enquiry" style={{ position: 'relative', zIndex: 2 }}>Plan a cruise <ArrowUpRight size={15} /></a>
        </div><div className="service-feature" id="visa-desk"><span>08 / 10</span><h3>Visa Desk</h3><p>Guidance on visa requirements and supporting documentation for your destination. We help you understand what&apos;s needed and support you in preparing your travel visa documentation. Visa requirements vary by destination and traveller circumstances.</p><a href="#enquiry">Get visa guidance <ArrowUpRight size={15} /></a></div></div></section>

    <section className="destination-section" id="holidays"><div className="destination-image"><Image src="/cape-town.png" alt="Cape Town with Table Mountain in the distance" fill sizes="(max-width: 800px) 100vw, 62vw" /><div className="image-caption">Featured destination / 01</div></div><div className="destination-copy"><p className="eyebrow">Go further</p><h2>Cape Town<br /><em>South Africa</em></h2><p>Where mountain meets ocean, and every day feels like the beginning of something. Let us take you there.</p><a className="text-link" href="#enquiry">Plan this journey <ChevronRight size={16} /></a><div className="destination-list">{destinations.map((d, i) => <span key={d}><b>{String(i + 2).padStart(2, '0')}</b>{d}</span>)}</div></div></section>

    <section className="dark-feature corporate" id="corporate"><div className="feature-marker">TC / 04</div><div><p className="eyebrow red">For business that moves</p><h2>Corporate travel.<br /><em>Without the complexity.</em></h2></div><div className="feature-detail"><p>Coordinate business flights, accommodation, transfers, shuttles, conferences and employee travel through one point of coordination.</p><div className="detail-list">{['Business flights', 'Accommodation', 'Transfers & shuttles', 'Car hire', 'Conferences', 'Group travel', 'Employee travel', 'Reporting & support', 'Emergency assistance'].map(x => <span key={x}>{x}</span>)}</div><a className="button button-outline" href="#enquiry">Talk to our corporate team <ArrowUpRight size={16} /></a></div></section>

    <section className="group-section" id="group-travel"><div className="group-copy"><p className="eyebrow red">For every kind of group</p><h2>One group.<br />One itinerary.<br /><em>One travel partner.</em></h2><p>Schools, universities, churches, sports teams, NGOs, conferences and weddings. We coordinate the whole picture so everyone can enjoy the moment.</p><a className="button button-red" href="#enquiry">Plan group travel <ArrowUpRight size={16} /></a></div><div className="group-steps">{['Flights', 'Accommodation', 'Transfers', 'Coach', 'Activities', 'Meals', 'Itinerary management'].map((x, i) => <div key={x}><span>0{i + 1}</span>{x}<ChevronRight size={15} /></div>)}</div></section>

    <section className="premium-section"><div className="premium-stamp">TC<br /><span>SA</span></div><div><p className="eyebrow red">A new way to travel</p><h2>Plan today.<br /><em>Travel tomorrow.</em></h2><p>Travel Premium Plan — currently being developed. Travel Class SA is exploring a future structured travel funding solution through an appropriately licensed financial-services or insurance partner. Nothing here is an active financial product.</p><div className="contribution-list" aria-label="Potential illustrative contribution levels">{['R250', 'R500', 'R750', 'R1,000', 'R1,500+'].map(x => <span key={x}>{x}</span>)}</div><small className="premium-note">Potential illustrative contribution levels only.</small><a className="button button-dark" href="#contact">Join the waitlist <ArrowUpRight size={16} /></a></div></section>

    <section className="trust-section"><div><p className="eyebrow red">Why Travel Class SA</p><h2>A better way<br /><em>to go.</em></h2></div><div className="trust-copy"><p className="trust-lede">Travel is personal. Your travel partner should be too.</p><div className="trust-lines">{[['Trust', 'A travel partner coordinating your journey from planning through return.'], ['Expertise', 'Thoughtful travel management shaped around your journey.'], ['Convenience', 'One conversation. One itinerary. Every detail coordinated.'], ['Affordability', 'Travel options shaped around your destination, dates and budget.'], ['Flexibility', 'Journey details can be discussed and adjusted with your consultant.'], ['Support', 'Travel support throughout the journey.']].map(x => <div key={x[0]}><span>{x[0]}</span><p>{x[1]}</p></div>)}</div></div></section>

    <section className="about-section" id="about"><div><p className="eyebrow red">About Travel Class SA</p><h2>Travel made<br /><em>more personal.</em></h2></div><div className="about-copy"><p>Travel Class SA is a South African full-service Travel Management Company coordinating complete journeys for individuals, families, couples, leisure travellers, groups and organisations.</p><p>Our aim is to make travel simple, affordable, convenient, professional, personalised and memorable.</p><div className="about-principles"><span>Simple</span><span>Convenient</span><span>Personalised</span><span>Memorable</span></div></div></section>

    <section className="final-cta" id="contact"><RouteMark dark /><p className="eyebrow">The next step is yours</p><h2>Ready to start<br /><em>your journey?</em></h2><p>Tell us where you want to go. We&apos;ll help coordinate how you get there.</p><div className="hero-actions"><a className="button button-red" href="#enquiry">Request a quote <ArrowUpRight size={16} /></a><a className="text-link" href="#enquiry">Speak to a consultant <ChevronRight size={16} /></a></div></section>

    <footer className="site-footer"><Logo light /><p>Your journey.<br /><em>Our expertise.</em></p><div className="footer-links"><a href="#holidays">Holidays</a><a href="#corporate">Corporate</a><a href="#group-travel">Group travel</a><a href="#contact">Contact</a></div><div className="footer-bottom"><span>© 2026 Travel Class SA</span><span>South Africa</span><p>Designed by <a href="https://sihleb.co.za" target="_blank" rel="noopener noreferrer">SihleB</a></p></div></footer>
  </main>
}
