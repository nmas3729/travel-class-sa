'use client'

import { useState } from 'react'
import { ArrowUpRight, ChevronRight, Menu, X } from 'lucide-react'

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="/" className={`logo ${light ? 'logo-light' : ''}`} aria-label="Travel Class SA home">
      <span>TRAVEL CLASS</span><b>SA</b>
    </a>
  )
}

const vipServices = [
  { num: '01', title: 'Private Jet Charters', desc: "Exclusive domestic and international private air travel arranged around the client's schedule, destination and preferences." },
  { num: '02', title: 'Private Yachts', desc: 'Luxury yacht charters and private cruising experiences for bespoke escapes, celebrations and leisure.' },
  { num: '03', title: '5-Star & Luxury Hotels', desc: "Carefully selected premium hotels and resorts matched to the client's preferences and itinerary." },
  { num: '04', title: 'Presidential Suites & Luxury Villas', desc: 'Exclusive accommodation for clients seeking privacy, exceptional comfort and highly personalised stays.' },
  { num: '05', title: 'Butler Services', desc: 'Personalised butler and hospitality services where available.' },
  { num: '06', title: 'Luxury Chauffeur Services', desc: 'Premium private transfers and dedicated drivers for airport journeys, meetings, sightseeing and leisure.' },
  { num: '07', title: 'VIP Airport Services', desc: 'Meet-and-greet, airport assistance, lounge arrangements and related premium airport services.' },
  { num: '08', title: 'Private Tours & Experiences', desc: 'Customised sightseeing, safari, dining, entertainment and cultural experiences.' },
  { num: '09', title: 'Restaurant & Lifestyle Reservations', desc: 'Assistance with premium dining, special occasions and exclusive lifestyle experiences.' },
  { num: '10', title: '24/7 Travel Concierge Support', desc: "Personalised assistance throughout the client's journey, from departure through to return home." },
]

const journeySteps = ['Home', 'Chauffeur', 'VIP Airport', 'Private Air Travel', 'Luxury Hotel / Villa', 'Private Experiences', 'Chauffeur', 'Home']

const vipServiceOptions = vipServices.map(s => s.title)

const navItems = [
  { label: 'Holidays', href: '/#holidays' },
  { label: 'Flights', href: '/#flights' },
  { label: 'Corporate Travel', href: '/#corporate' },
  { label: 'Group Travel', href: '/#group-travel' },
  { label: 'Cruising', href: '/#cruising' },
  { label: 'Visa Desk', href: '/#visa-desk' },
  { label: 'VIP Concierge', href: '/vip-concierge' },
  { label: 'About', href: '/#about' },
]

export default function VipConciergePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  function toggleService(s: string) {
    setSelectedServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  return (
    <main style={{ background: '#080808', color: '#f0ede8', fontFamily: 'Arial, Helvetica, sans-serif', minHeight: '100vh' }}>

      {/* Header */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', gap: '2rem', padding: '22px 5vw', background: 'rgba(8,8,8,0.92)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <Logo light />
        <nav aria-label="Primary navigation" style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(10px,1.2vw,20px)', flex: 1 }} className="vip-desktop-nav">
          {navItems.map(item => (
            <a key={item.label} href={item.href} style={{ textTransform: 'uppercase', fontSize: '9px', letterSpacing: '.12em', opacity: item.label === 'VIP Concierge' ? 1 : 0.6, color: item.label === 'VIP Concierge' ? '#D7192D' : 'inherit' }}>{item.label}</a>
          ))}
        </nav>
        <a href="#vip-enquiry" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '.1em', borderBottom: '1px solid #D7192D', paddingBottom: '7px', whiteSpace: 'nowrap' }} className="vip-header-cta">
          Design My Experience <ArrowUpRight size={13} />
        </a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 0, color: '#f0ede8', cursor: 'pointer' }}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile nav */}
      {menuOpen && (
        <nav aria-label="Mobile navigation" style={{ position: 'fixed', inset: 0, zIndex: 99, background: '#080808', color: '#f0ede8', padding: '100px 8vw 40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {navItems.map(item => (
            <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} style={{ textTransform: 'uppercase', letterSpacing: '.14em', fontSize: '14px', color: item.label === 'VIP Concierge' ? '#D7192D' : 'inherit' }}>{item.label}</a>
          ))}
          <a href="#vip-enquiry" onClick={() => setMenuOpen(false)} style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '9px', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '.1em', borderBottom: '1px solid #D7192D', paddingBottom: '7px', alignSelf: 'flex-start' }}>
            Design My Experience <ArrowUpRight size={13} />
          </a>
        </nav>
      )}

      {/* Hero */}
      <section aria-label="VIP Concierge hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(120px,14vw,180px) clamp(5vw,8vw,10vw) clamp(60px,8vw,110px)', position: 'relative', overflow: 'hidden', background: 'radial-gradient(ellipse at 60% 40%, #1a0a0a 0%, #080808 65%)', borderBottom: '1px solid rgba(215,25,45,0.25)' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '8vw', width: '1px', height: '38%', background: 'linear-gradient(to bottom, transparent, #D7192D, transparent)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px' }}>
          <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.28em', color: '#D7192D', margin: '0 0 28px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ display: 'inline-block', width: '32px', height: '1px', background: '#D7192D', verticalAlign: 'middle' }} />
            Travel Class SA
          </p>
          <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400, letterSpacing: '-.04em', lineHeight: .88, fontSize: 'clamp(52px, 9vw, 130px)', margin: '0 0 clamp(24px,3vw,40px)', color: '#f0ede8' }}>
            VIP<br /><em style={{ fontStyle: 'italic', color: '#D7192D' }}>Concierge</em>
          </h1>
          <p style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(20px, 2.8vw, 36px)', fontWeight: 400, letterSpacing: '-.02em', lineHeight: 1.15, color: 'rgba(240,237,232,0.72)', margin: '0 0 clamp(18px,2.5vw,32px)', maxWidth: '640px' }}>
            Exceptional Travel.<br />Personally Curated.
          </p>
          <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'rgba(240,237,232,0.55)', maxWidth: '520px', margin: '0 0 clamp(36px,5vw,60px)' }}>
            From private aviation and luxury accommodation to chauffeur services, exclusive experiences and personalised assistance, every detail is coordinated around you.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' }}>
            <a href="#vip-enquiry" style={{ display: 'inline-flex', alignItems: 'center', gap: '18px', padding: '18px 28px', background: '#D7192D', color: '#fff', textTransform: 'uppercase', letterSpacing: '.12em', fontSize: '10px', fontWeight: 700 }}>
              Speak to Your Private Travel Concierge <ArrowUpRight size={14} />
            </a>
            <a href="#vip-enquiry" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '.12em', fontSize: '10px', fontWeight: 700, borderBottom: '1px solid rgba(240,237,232,0.4)', paddingBottom: '6px', color: '#f0ede8' }}>
              Design My Experience <ChevronRight size={14} />
            </a>
          </div>
        </div>
        <div aria-hidden="true" style={{ position: 'absolute', right: '4%', top: '50%', transform: 'translateY(-50%)', writingMode: 'vertical-rl', color: 'rgba(240,237,232,0.2)', fontSize: '9px', letterSpacing: '.22em', textTransform: 'uppercase' }}>
          TC / VIP <span style={{ color: '#D7192D', marginTop: '12px', display: 'block' }}>PRIVATE CONCIERGE</span>
        </div>
      </section>

      {/* Editorial positioning */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ padding: 'clamp(60px,9vw,120px) clamp(5vw,8vw,10vw)', borderRight: '1px solid rgba(255,255,255,0.07)' }}>
          <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.22em', color: '#D7192D', margin: '0 0 28px' }}>A private travel service</p>
          <h2 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400, fontSize: 'clamp(36px,4.5vw,64px)', letterSpacing: '-.04em', lineHeight: 1, margin: '0 0 32px', color: '#f0ede8' }}>
            Exceptional Travel.<br /><em style={{ fontStyle: 'italic', color: '#D7192D' }}>Personally Curated.</em>
          </h2>
          <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(240,237,232,0.55)', maxWidth: '440px', margin: 0 }}>
            Your journey should feel effortless from beginning to end. Our VIP Concierge service brings together the details that transform exceptional travel into a completely personalised experience.
          </p>
        </div>
        <div style={{ padding: 'clamp(60px,9vw,120px) clamp(5vw,8vw,10vw)' }}>
          {[['Privacy', 'Your travel arrangements remain entirely private and confidential.'], ['Comfort', 'Every element is selected for exceptional comfort and quality.'], ['Discretion', 'A quiet, personal service — never transactional.'], ['Personalisation', 'Built around your preferences, schedule and destination.'], ['End-to-end coordination', 'From departure through return, every detail managed for you.']].map(([label, body]) => (
            <div key={label} style={{ display: 'grid', gridTemplateColumns: '38% 1fr', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '18px 0' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '.12em', fontSize: '10px', color: '#D7192D' }}>{label}</span>
              <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5, color: 'rgba(240,237,232,0.5)' }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: 'clamp(70px,9vw,130px) clamp(5vw,7vw,10vw)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(48px,6vw,80px)', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <p style={{ textTransform: 'uppercase', letterSpacing: '.22em', fontSize: '10px', color: '#D7192D', margin: '0 0 16px' }}>The full service</p>
            <h2 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400, fontSize: 'clamp(40px,5.5vw,80px)', letterSpacing: '-.05em', lineHeight: .9, margin: 0, color: '#f0ede8' }}>
              Everything<br /><em style={{ fontStyle: 'italic', color: '#D7192D' }}>arranged.</em>
            </h2>
          </div>
          <p style={{ maxWidth: '280px', fontSize: '13px', lineHeight: 1.7, color: 'rgba(240,237,232,0.45)', margin: 0 }}>Ten VIP services — each personalised, each coordinated around your journey.</p>
        </div>

        {/* Featured: 01 Private Jet Charters */}
        <div style={{ background: '#D7192D', color: '#fff', padding: 'clamp(32px,4vw,50px)', marginBottom: '2px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'clamp(24px,4vw,60px)', alignItems: 'flex-end', position: 'relative', minHeight: '280px' }}>
          <span style={{ position: 'absolute', top: '32px', left: '32px', fontFamily: 'monospace', fontSize: '11px', opacity: .8 }}>01 / 10</span>
          <div style={{ paddingTop: '60px' }}>
            <h3 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400, fontSize: 'clamp(36px,4vw,56px)', margin: '0 0 16px', lineHeight: 1 }}>Private Jet<br />Charters</h3>
            <p style={{ margin: '0 0 28px', lineHeight: 1.6, fontSize: '13px', maxWidth: '320px', opacity: .85 }}>Exclusive domestic and international private air travel arranged around the client&apos;s schedule, destination and preferences.</p>
            <a href="#vip-enquiry" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textTransform: 'uppercase', letterSpacing: '.12em', fontSize: '10px', fontWeight: 700, color: '#fff' }}>Enquire <ArrowUpRight size={13} /></a>
          </div>
          <div aria-hidden="true" style={{ minHeight: '200px', background: 'rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.12)' }}>
            <span style={{ fontSize: '9px', letterSpacing: '.18em', textTransform: 'uppercase', opacity: .4 }}>Image: Private Jet Interior</span>
          </div>
        </div>

        {/* Services 02–10 */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {vipServices.slice(1).map(svc => (
            <a key={svc.num} href="#vip-enquiry" style={{ display: 'grid', gridTemplateColumns: '52px 1fr auto', alignItems: 'center', gap: '24px', padding: 'clamp(16px,2.2vw,24px) 0', borderBottom: '1px solid rgba(255,255,255,0.07)', color: '#f0ede8', textDecoration: 'none' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#D7192D', flexShrink: 0 }}>{svc.num}</span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(18px,2vw,26px)', fontWeight: 400 }}>{svc.title}</span>
                <span style={{ fontSize: '11px', lineHeight: 1.5, color: 'rgba(240,237,232,0.42)' }}>{svc.desc}</span>
              </span>
              <ArrowUpRight size={15} style={{ flexShrink: 0, color: '#D7192D', opacity: 0.6 }} />
            </a>
          ))}
        </div>
      </section>

      {/* From Home to Home */}
      <section style={{ padding: 'clamp(70px,9vw,130px) clamp(5vw,7vw,10vw)', background: '#0d0d0d', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '.22em', fontSize: '10px', color: '#D7192D', margin: '0 0 20px' }}>The complete journey</p>
        <h2 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400, fontSize: 'clamp(40px,6vw,92px)', letterSpacing: '-.05em', lineHeight: .9, margin: '0 0 clamp(28px,4vw,48px)', color: '#f0ede8' }}>
          From Home<br /><em style={{ fontStyle: 'italic', color: '#D7192D' }}>to Home.</em>
        </h2>
        <p style={{ fontSize: '16px', lineHeight: 1.75, color: 'rgba(240,237,232,0.5)', maxWidth: '560px', margin: '0 0 clamp(48px,7vw,90px)' }}>
          Your journey does not begin at the airport — and it does not end when you land. Travel Class SA coordinates every stage of the experience, from your front door through to your return home.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', overflowX: 'auto', paddingBottom: '8px' }}>
          {journeySteps.map((step, i) => (
            <div key={`${step}-${i}`} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: i === 0 || i === journeySteps.length - 1 ? '#D7192D' : 'transparent', border: `1px solid ${i === 0 || i === journeySteps.length - 1 ? '#D7192D' : 'rgba(255,255,255,0.3)'}` }} />
                <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '.12em', color: 'rgba(240,237,232,0.5)', textAlign: 'center', maxWidth: '80px' }}>{step}</span>
              </div>
              {i < journeySteps.length - 1 && (
                <div style={{ width: 'clamp(24px,3.5vw,56px)', height: '1px', background: 'linear-gradient(90deg, #D7192D, rgba(255,255,255,0.15))', flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Quote / imagery placeholder */}
      <section style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ minHeight: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', flexDirection: 'column', gap: '16px', padding: '60px 5vw', textAlign: 'center' }}>
          <div style={{ border: '1px solid rgba(215,25,45,0.3)', padding: '40px 48px', maxWidth: '600px' }}>
            <p style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(24px,3vw,38px)', fontWeight: 400, lineHeight: 1.2, color: '#f0ede8', margin: '0 0 18px' }}>
              &ldquo;Every detail, personally attended to.&rdquo;
            </p>
            <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.2em', color: '#D7192D', margin: 0 }}>Travel Class SA VIP Concierge</p>
          </div>
          <p aria-hidden="true" style={{ fontSize: '9px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)', marginTop: '12px' }}>Luxury imagery to be placed here</p>
        </div>
      </section>

      {/* VIP Enquiry */}
      <section id="vip-enquiry" style={{ padding: 'clamp(70px,9vw,130px) clamp(5vw,7vw,10vw)', background: '#080808', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(40px,6vw,100px)' }}>
          <div>
            <p style={{ textTransform: 'uppercase', letterSpacing: '.22em', fontSize: '10px', color: '#D7192D', margin: '0 0 20px' }}>Private enquiry</p>
            <h2 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400, fontSize: 'clamp(36px,4.5vw,64px)', letterSpacing: '-.04em', lineHeight: .95, margin: '0 0 28px', color: '#f0ede8' }}>
              Design My<br /><em style={{ fontStyle: 'italic', color: '#D7192D' }}>Experience.</em>
            </h2>
            <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(240,237,232,0.5)', maxWidth: '380px', margin: 0 }}>
              Tell us how you would like to travel and your private concierge will begin designing the experience around you.
            </p>
            <div style={{ marginTop: '48px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '32px' }}>
              {['Privacy assured', 'No obligation consultation', 'Dedicated concierge assigned', 'Response within 24 hours'].map(p => (
                <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#D7192D', flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', color: 'rgba(240,237,232,0.5)', textTransform: 'uppercase', letterSpacing: '.1em' }}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {submitted ? (
            <div style={{ background: '#0f0f0f', border: '1px solid rgba(215,25,45,0.3)', padding: 'clamp(32px,4vw,50px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '400px', textAlign: 'center', gap: '16px' }}>
              <span style={{ fontSize: '28px', color: '#D7192D' }}>✦</span>
              <h3 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400, fontSize: '28px', color: '#f0ede8', margin: 0 }}>Your enquiry has been received.</h3>
              <p style={{ fontSize: '14px', color: 'rgba(240,237,232,0.5)', lineHeight: 1.7, margin: 0 }}>Your dedicated concierge will be in touch within 24 hours to begin designing your experience.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} style={{ background: '#0f0f0f', borderTop: '3px solid #D7192D', padding: 'clamp(32px,4vw,50px)', display: 'flex', flexDirection: 'column' }} aria-label="VIP Concierge enquiry form">
              {[
                { id: 'vip-name', label: 'Full name', type: 'text', placeholder: 'Your full name', required: true, autoComplete: 'name' },
                { id: 'vip-email', label: 'Email address', type: 'email', placeholder: 'you@example.com', required: true, autoComplete: 'email' },
                { id: 'vip-phone', label: 'Phone / WhatsApp', type: 'tel', placeholder: '+27 000 000 0000', required: false, autoComplete: 'tel' },
                { id: 'vip-destination', label: 'Destination', type: 'text', placeholder: 'Where would you like to travel?', required: false, autoComplete: 'off' },
                { id: 'vip-dates', label: 'Travel dates', type: 'text', placeholder: 'When would you like to travel?', required: false, autoComplete: 'off' },
                { id: 'vip-travellers', label: 'Number of travellers', type: 'number', placeholder: '1', required: false, autoComplete: 'off' },
              ].map(field => (
                <label key={field.id} htmlFor={field.id} style={{ display: 'grid', gap: '8px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 20px', color: 'rgba(240,237,232,0.6)' }}>
                  {field.label}{field.required && <span style={{ color: '#D7192D' }}> *</span>}
                  <input id={field.id} type={field.type} placeholder={field.placeholder} required={field.required} autoComplete={field.autoComplete} style={{ border: 0, borderBottom: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#f0ede8', padding: '10px 0', outline: 0, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px' }} />
                </label>
              ))}

              <fieldset style={{ border: 0, padding: 0, margin: '0 0 24px' }}>
                <legend style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(240,237,232,0.6)', marginBottom: '16px', display: 'block' }}>VIP services required</legend>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {vipServiceOptions.map(svc => {
                    const checked = selectedServices.includes(svc)
                    return (
                      <label key={svc} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '11px', cursor: 'pointer', lineHeight: 1.4, color: checked ? '#f0ede8' : 'rgba(240,237,232,0.45)' }}>
                        <input type="checkbox" checked={checked} onChange={() => toggleService(svc)} style={{ accentColor: '#D7192D', marginTop: '2px', flexShrink: 0 }} aria-label={svc} />
                        {svc}
                      </label>
                    )
                  })}
                </div>
              </fieldset>

              <label htmlFor="vip-notes" style={{ display: 'grid', gap: '8px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 28px', color: 'rgba(240,237,232,0.6)' }}>
                Additional requirements / notes
                <textarea id="vip-notes" rows={4} placeholder="Any specific requirements, preferences or questions..." style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: 0, background: 'transparent', color: '#f0ede8', padding: '10px 12px', outline: 0, resize: 'vertical', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px' }} />
              </label>

              <button type="submit" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', gap: '18px', padding: '18px 24px', background: '#D7192D', color: '#fff', border: 0, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '.12em', fontSize: '10px', fontWeight: 700 }}>
                Speak to Your Private Travel Concierge <ArrowUpRight size={14} />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#050505', color: '#f0ede8', padding: '60px 7vw 25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '40px', flexWrap: 'wrap', paddingBottom: '40px', borderBottom: '1px solid #1f1f1f', marginBottom: '24px' }}>
          <div>
            <Logo light />
            <p style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: '40px', lineHeight: .92, margin: '40px 0 0', color: '#f0ede8' }}>
              Your journey.<br /><em style={{ color: '#D7192D', fontStyle: 'italic' }}>Our expertise.</em>
            </p>
          </div>
          <nav aria-label="Footer navigation" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[{ label: 'Home', href: '/' }, { label: 'Holidays', href: '/#holidays' }, { label: 'Corporate', href: '/#corporate' }, { label: 'Group travel', href: '/#group-travel' }, { label: 'VIP Concierge', href: '/vip-concierge' }, { label: 'Contact', href: '/#contact' }].map(link => (
              <a key={link.label} href={link.href} style={{ textTransform: 'uppercase', letterSpacing: '.12em', fontSize: '10px', color: link.label === 'VIP Concierge' ? '#D7192D' : 'rgba(240,237,232,0.5)' }}>{link.label}</a>
            ))}
          </nav>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(240,237,232,0.3)', fontSize: '10px', flexWrap: 'wrap', gap: '8px' }}>
          <span>© 2026 Travel Class SA</span><span>South Africa</span>
        </div>
      </footer>

      <style>{`
        @media (max-width: 900px) { .vip-desktop-nav { display: none !important; } .vip-header-cta { display: none !important; } }
        @media (min-width: 901px) { .menu-toggle { display: none !important; } }
        @media (prefers-reduced-motion: reduce) { *, *:before, *:after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; } }
      `}</style>
    </main>
  )
}
