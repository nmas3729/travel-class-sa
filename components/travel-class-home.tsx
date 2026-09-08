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
  return <a href="#top" className={`logo ${light ? 'logo-light' : ''}`} aria-label="Travel Class SA home"><span>TRAVEL CLASS</span><b>SA</b></a>
}

export default function TravelClassHome() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState('Holiday')
  const [destination, setDestination] = useState('')
  const [activeHeroIndex, setActiveHeroIndex] = useState(0)

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

    <section className="hero-section reference-hero">
      <div className="hero-copy">
        <div className="hero-brand-lockup"><span className="hero-suitcase" aria-hidden="true">✦</span><span>TRAVEL <b>CLASS</b></span><small>SA</small></div>
        <p className="hero-sub">We plan. You travel. Stress-free.</p>
        <div className="reference-rule" />
        <p className="eyebrow"><span className="eyebrow-line" /> Travel management company</p>
        <h1><span>Your journey.</span><br /><em>Our expertise.</em></h1>
        <p className="hero-body">From flights and accommodation to transfers, group travel, corporate travel and unforgettable experiences, Travel Class SA brings your journey together through one trusted travel partner.</p>
        <div className="hero-actions"><a className="button button-red" href="#enquiry">Request a quote <ArrowUpRight size={16} /></a><a className="text-link" href="#contact">Speak to a consultant <ChevronRight size={16} /></a></div>
      </div>
      <div className="hero-visual"><div className="hero-image-wrap">{heroSlides.map((slide, i) => <Image key={slide.src} src={slide.src} alt={slide.alt} fill priority={i === 0} sizes="(max-width: 800px) 100vw, 52vw" className={`hero-slide${i === activeHeroIndex ? ' hero-slide-active' : ''}`} />)}</div><div className="hero-image-panel airport"><Image src="/cape-town.png" alt="Cape Town coastline and Table Mountain" fill sizes="(max-width: 800px) 45vw, 24vw" /></div><div className="hero-location"><span className="location-dot" /> 33°55'31\" S / 18°25'26\" E<br /><b>Cape Town, South Africa</b></div><div className="hero-route"><RouteMark /><svg viewBox="0 0 250 180" preserveAspectRatio="none" aria-hidden="true"><path d="M1 174 C85 174 56 28 139 30 S206 118 249 2" /></svg></div></div>
      <div className="hero-side-note">TC / 01 <span>CONNECTING PEOPLE TO PLACES THAT INSPIRE</span></div>
      <div className="hero-meta"><span><b>01</b> Flights</span><span><b>02</b> Accommodation</span><span><b>03</b> Transport</span><span><b>04</b> Group travel</span><span><b>05</b> Destination services</span></div>
    </section>

    <section className="enquiry-section" id="enquiry"><div className="section-label">Start here <span>01—03</span></div><div className="enquiry-grid"><div><p className="eyebrow red">Your journey begins</p><h2>Where are<br /><em>you going?</em></h2><p className="section-intro">Tell us what you&apos;re planning. We&apos;ll help coordinate the journey.</p><div className="journey-progress"><span className="progress-active" /><span /><span /></div></div><div className="enquiry-panel"><p className="panel-kicker">Step {step + 1} of 3</p>{step === 0 && <><h3>What kind of journey are you planning?</h3><div className="choice-list">{enquiryTypes.map(type => <button key={type} className={selected === type ? 'choice selected' : 'choice'} onClick={() => setSelected(type)}>{type}<ChevronRight size={17} /></button>)}</div></>}{step === 1 && <><h3>Where will your journey take you?</h3><label>Destination<input value={destination} onChange={e => setDestination(e.target.value)} placeholder="e.g. Cape Town, Mauritius, Paris" /></label><label>Travel dates<input type="text" placeholder="When would you like to travel?" /></label></>}{step === 2 && <><h3>Let&apos;s make it personal.</h3><label>Your name<input placeholder="Full name" /></label><label>Email or WhatsApp<input placeholder="you@example.com" /></label></>}{step < 2 ? <button className="panel-next" onClick={() => setStep(step + 1)}>Continue <ArrowUpRight size={16} /></button> : <button className="panel-next" onClick={() => setStep(0)}>Send enquiry <ArrowUpRight size={16} /></button>}</div></div></section>

    <section className="journey-section"><div className="section-label light">The complete picture <span>02—03</span></div><div className="journey-heading"><p className="eyebrow red">More than a booking</p><h2>We manage<br /><em>the journey.</em></h2><p>Every moving part, thoughtfully connected. From the moment you leave home to the moment you return.</p></div><div className="timeline">{[['01', 'Flight', 'The right route, the right fare.'], ['02', 'Airport transfer', 'A smooth arrival, every time.'], ['03', 'Accommodation', 'A place that feels like yours.'], ['04', 'Tours & experiences', 'The moments you came for.'], ['05', 'Local transport', 'Every table, trail and turn connected.'], ['06', 'Return transfer', 'A considered journey back to the airport.'], ['07', 'Flight home', 'Home, with stories to tell.']].map((item, i) => <div className="timeline-item" key={item[1]}><div className="timeline-top"><span>{item[0]}</span><i className={i === 0 ? 'active-dot' : ''} /></div><h3>{item[1]}</h3><p>{item[2]}</p></div>)}</div><div className="journey-relationship"><span>Discover</span><i /> <span>Enquire</span><i /> <span>Consult</span><i /> <span>Quote</span><i /> <span>Confirm</span><i /> <span>Travel</span><i /> <span>Support</span><i /> <span>Return</span></div></section>

    <section className="services-section" id="transport"><div className="section-label">What we do <span>03—03</span></div><div className="services-head"><div><p className="eyebrow red">One partner. Every detail.</p><h2>Everything<br /><em>in motion.</em></h2></div><p>One trusted team to plan, book and manage every part of your travel. No loose ends. No handovers. Just a better way to go.</p></div><div className="services-editorial"><div className="service-feature"><span>01 / 10</span><h3>Flights</h3><p>Domestic, international, multi-city and everything between. We find the route that makes sense for you.</p><a href="#enquiry">Request a flight quote <ArrowUpRight size={15} /></a></div><div className="service-list">{[['Accommodation', 'Plan a stay'], ['Airport Transfers', 'Arrange a transfer'], ['Coach & Bus Hire', 'Hire a coach'], ['Corporate Travel', 'Move your team'], ['Group Travel', 'Plan group travel'], ['Cruising', 'Plan a cruise'], ['Holiday Packages', 'Explore holidays'], ['Tours & Experiences', 'Discover experiences'], ['Visa Desk', 'Get visa guidance']].map((item, i) => <a key={item[0]} href="#enquiry"><span>0{i + 2}</span><span className="service-list-copy">{item[0]}<small>{item[1]}</small></span><ArrowUpRight size={15} /></a>)}</div><div className="service-feature" id="cruising"><span>07 / 10</span><h3>Cruising</h3><p>Cruise holiday packages and related cruise travel options, coordinated around your journey, dates and destination.</p><a href="#enquiry">Plan a cruise <ArrowUpRight size={15} /></a></div><div className="service-feature" id="visa-desk"><span>08 / 10</span><h3>Visa Desk</h3><p>Guidance on visa requirements and supporting documentation for your destination. We help you understand what&apos;s needed and support you in preparing your travel visa documentation. Visa requirements vary by destination and traveller circumstances.</p><a href="#enquiry">Get visa guidance <ArrowUpRight size={15} /></a></div></div></section>

    <section className="destination-section" id="holidays"><div className="destination-image"><Image src="/cape-town.png" alt="Cape Town with Table Mountain in the distance" fill sizes="(max-width: 800px) 100vw, 62vw" /><div className="image-caption">Featured destination / 01</div></div><div className="destination-copy"><p className="eyebrow">Go further</p><h2>Cape Town<br /><em>South Africa</em></h2><p>Where mountain meets ocean, and every day feels like the beginning of something. Let us take you there.</p><a className="text-link" href="#enquiry">Plan this journey <ChevronRight size={16} /></a><div className="destination-list">{destinations.map((d, i) => <span key={d}><b>{String(i + 2).padStart(2, '0')}</b>{d}</span>)}</div></div></section>

    <section className="dark-feature corporate" id="corporate"><div className="feature-marker">TC / 04</div><div><p className="eyebrow red">For business that moves</p><h2>Corporate travel.<br /><em>Without the complexity.</em></h2></div><div className="feature-detail"><p>Coordinate business flights, accommodation, transfers, shuttles, conferences and employee travel through one point of coordination.</p><div className="detail-list">{['Business flights', 'Accommodation', 'Transfers & shuttles', 'Car hire', 'Conferences', 'Group travel', 'Employee travel', 'Reporting & support', 'Emergency assistance'].map(x => <span key={x}>{x}</span>)}</div><a className="button button-outline" href="#enquiry">Talk to our corporate team <ArrowUpRight size={16} /></a></div></section>

    <section className="group-section" id="group-travel"><div className="group-copy"><p className="eyebrow red">For every kind of group</p><h2>One group.<br />One itinerary.<br /><em>One travel partner.</em></h2><p>Schools, universities, churches, sports teams, NGOs, conferences and weddings. We coordinate the whole picture so everyone can enjoy the moment.</p><a className="button button-red" href="#enquiry">Plan group travel <ArrowUpRight size={16} /></a></div><div className="group-steps">{['Flights', 'Accommodation', 'Transfers', 'Coach', 'Activities', 'Meals', 'Itinerary management'].map((x, i) => <div key={x}><span>0{i + 1}</span>{x}<ChevronRight size={15} /></div>)}</div></section>

    <section className="premium-section"><div className="premium-stamp">TC<br /><span>SA</span></div><div><p className="eyebrow red">A new way to travel</p><h2>Plan today.<br /><em>Travel tomorrow.</em></h2><p>Travel Premium Plan — currently being developed. Travel Class SA is exploring a future structured travel funding solution through an appropriately licensed financial-services or insurance partner. Nothing here is an active financial product.</p><div className="contribution-list" aria-label="Potential illustrative contribution levels">{['R250', 'R500', 'R750', 'R1,000', 'R1,500+'].map(x => <span key={x}>{x}</span>)}</div><small className="premium-note">Potential illustrative contribution levels only.</small><a className="button button-dark" href="#contact">Join the waitlist <ArrowUpRight size={16} /></a></div></section>

    <section className="trust-section"><div><p className="eyebrow red">Why Travel Class SA</p><h2>A better way<br /><em>to go.</em></h2></div><div className="trust-copy"><p className="trust-lede">Travel is personal. Your travel partner should be too.</p><div className="trust-lines">{[['Trust', 'A travel partner coordinating your journey from planning through return.'], ['Expertise', 'Thoughtful travel management shaped around your journey.'], ['Convenience', 'One conversation. One itinerary. Every detail coordinated.'], ['Affordability', 'Travel options shaped around your destination, dates and budget.'], ['Flexibility', 'Journey details can be discussed and adjusted with your consultant.'], ['Support', 'Travel support throughout the journey.']].map(x => <div key={x[0]}><span>{x[0]}</span><p>{x[1]}</p></div>)}</div></div></section>

    <section className="about-section" id="about"><div><p className="eyebrow red">About Travel Class SA</p><h2>Travel made<br /><em>more personal.</em></h2></div><div className="about-copy"><p>Travel Class SA is a South African full-service Travel Management Company coordinating complete journeys for individuals, families, couples, leisure travellers, groups and organisations.</p><p>Our aim is to make travel simple, affordable, convenient, professional, personalised and memorable.</p><div className="about-principles"><span>Simple</span><span>Convenient</span><span>Personalised</span><span>Memorable</span></div></div></section>

    <section className="final-cta" id="contact"><RouteMark dark /><p className="eyebrow">The next step is yours</p><h2>Ready to start<br /><em>your journey?</em></h2><p>Tell us where you want to go. We&apos;ll help coordinate how you get there.</p><div className="hero-actions"><a className="button button-red" href="#enquiry">Request a quote <ArrowUpRight size={16} /></a><a className="text-link" href="#enquiry">Speak to a consultant <ChevronRight size={16} /></a></div></section>

    <footer className="site-footer"><Logo light /><p>Your journey.<br /><em>Our expertise.</em></p><div className="footer-links"><a href="#holidays">Holidays</a><a href="#corporate">Corporate</a><a href="#group-travel">Group travel</a><a href="#contact">Contact</a></div><div className="footer-bottom"><span>© 2026 Travel Class SA</span><span>South Africa</span></div></footer>
  </main>
}
