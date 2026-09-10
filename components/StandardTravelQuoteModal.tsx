'use client'

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { buildWhatsAppUrl } from '@/lib/utils'

const services = [
  'Holiday',
  'Flights',
  'Accommodation',
  'Airport Transfer',
  'Coach & Bus Hire',
  'Corporate Travel',
  'Group Travel',
  'Tours & Experiences',
  'Cruising',
  'Visa Desk',
  'General Travel Enquiry',
]

type Props = {
  open: boolean
  initialService?: string
  onClose: () => void
}

type Errors = Partial<Record<'service' | 'destination' | 'name' | 'email' | 'phone', string>>

export default function StandardTravelQuoteModal({ open, initialService = '', onClose }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null)
  const firstFocusableRef = useRef<HTMLButtonElement | null>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  const [step, setStep] = useState(1)
  const [service, setService] = useState(initialService)
  const [destination, setDestination] = useState('')
  const [departureLocation, setDepartureLocation] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [travellers, setTravellers] = useState('')
  const [budget, setBudget] = useState('')
  const [notes, setNotes] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth <= 640)
    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  useEffect(() => {
    if (!open) return

    previousActiveElement.current = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
      previousActiveElement.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    function handleEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    function handleTab(event: KeyboardEvent) {
      if (!modalRef.current) return

      const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
      )).filter(element => !element.hasAttribute('disabled'))

      if (!focusable.length) return

      if (event.shiftKey && document.activeElement === focusable[0]) {
        event.preventDefault()
        focusable[focusable.length - 1].focus()
      } else if (!event.shiftKey && document.activeElement === focusable[focusable.length - 1]) {
        event.preventDefault()
        focusable[0].focus()
      }
    }

    window.addEventListener('keydown', handleEsc)
    window.addEventListener('keydown', handleTab)

    return () => {
      window.removeEventListener('keydown', handleEsc)
      window.removeEventListener('keydown', handleTab)
    }
  }, [open, onClose])

  const stepTitle = useMemo(() => {
    if (step === 1) return 'START YOUR JOURNEY'
    if (step === 2) return 'Tell us about your trip'
    return 'Almost there.'
  }, [step])

  function closeAndReset() {
    setStep(1)
    setService(initialService)
    setDestination('')
    setDepartureLocation('')
    setDepartureDate('')
    setReturnDate('')
    setTravellers('')
    setBudget('')
    setNotes('')
    setName('')
    setEmail('')
    setPhone('')
    setErrors({})
    setSubmitError('')
    setSuccess(false)
    setLoading(false)
    onClose()
  }

  function validateStep1() {
    if (!service.trim()) {
      const nextErrors = { ...errors, service: 'Please choose a service.' }
      setErrors(nextErrors)
      return false
    }
    return true
  }

  function validateStep2() {
    const nextErrors: Errors = {}

    if (!destination.trim()) {
      nextErrors.destination = 'Destination is required.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function validateStep3() {
    const nextErrors: Errors = {}

    if (!name.trim()) {
      nextErrors.name = 'Full name is required.'
    }

    if (!email.trim()) {
      nextErrors.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!phone.trim()) {
      nextErrors.phone = 'Phone / WhatsApp number is required.'
    } else if (!/^\+?[0-9()\s-]{7,25}$/.test(phone.trim())) {
      nextErrors.phone = 'Please enter a valid phone number.'
    }

    if (name.trim().length > 120) nextErrors.name = 'Please shorten your name.'
    if (email.trim().length > 254) nextErrors.email = 'Please use a shorter email address.'
    if (destination.trim().length > 160) nextErrors.destination = 'Please shorten your destination.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!validateStep3()) return

    setLoading(true)
    setSubmitError('')

    const payload = {
      type: 'standard',
      selected: service,
      selectedServices: [service],
      destination,
      'departure-location': departureLocation,
      'departure-date': departureDate,
      'return-date': returnDate,
      dates: `${departureDate || 'Not supplied'}${returnDate ? ` — ${returnDate}` : ''}`,
      travellers,
      budget,
      name,
      email,
      phone,
      notes,
      website: ((event.currentTarget as HTMLFormElement).elements.namedItem('website') as HTMLInputElement | null)?.value || '',
    }

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        setSubmitError(data.error || "We couldn't send your enquiry right now. Please try again or contact our team directly.")
        setLoading(false)
        return
      }

      setSuccess(true)
      setLoading(false)
    } catch (_error) {
      setSubmitError("We couldn't send your enquiry right now. Please try again or contact our team directly.")
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="standard-modal-backdrop"
      onClick={closeAndReset}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'max(12px, env(safe-area-inset-top))',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="standard-modal-title"
        aria-label="Standard Travel Quote Enquiry"
        ref={modalRef}
        onClick={(event) => event.stopPropagation()}
        className="standard-modal-panel"
        style={{
          width: 'min(960px, calc(100vw - 40px))',
          maxWidth: '100%',
          maxHeight: 'min(780px, calc(100dvh - 40px))',
          overflowY: 'auto',
          overflowX: 'hidden',
          background: '#080808',
          color: '#f0ede8',
          border: '1px solid rgba(240,237,232,0.12)',
          boxShadow: '0 30px 90px rgba(0,0,0,0.8)',
          fontFamily: 'Arial, Helvetica, sans-serif',
          boxSizing: 'border-box',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 26px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div id="standard-modal-title" style={{ fontSize: '12px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#f0ede8', fontWeight: 700 }}>Travel Class SA</div>
          <button
            type="button"
            ref={firstFocusableRef}
            aria-label="Close standard quote modal"
            onClick={closeAndReset}
            style={{ background: 'transparent', border: '0', color: '#f0ede8', cursor: 'pointer', fontSize: '24px', minWidth: '44px', minHeight: '44px' }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ padding: 'clamp(28px,4vw,46px)' }}>
          {!success ? (
            <>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '10px', color: '#D7192D', letterSpacing: '.22em', textTransform: 'uppercase', marginBottom: '14px' }}>START YOUR JOURNEY</div>
                <div id="standard-modal-title-text" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(30px,4vw,40px)', fontWeight: 400, lineHeight: 1.2, color: '#f0ede8' }}>
                  {stepTitle}
                </div>
                {step === 1 && (
                  <div style={{ fontSize: '14px', color: 'rgba(240,237,232,0.65)', marginTop: '12px' }}>
                    Tell us what you&apos;re planning. We&apos;ll help coordinate the journey.
                  </div>
                )}
                {step === 2 && (
                  <div style={{ fontSize: '14px', color: 'rgba(240,237,232,0.65)', marginTop: '12px' }}>
                    Where are you going?
                  </div>
                )}
                {step === 3 && (
                  <div style={{ fontSize: '14px', color: 'rgba(240,237,232,0.65)', marginTop: '12px' }}>
                    Almost there.
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', color: '#f0ede8', fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase' }}>
                <span style={{ color: '#D7192D', fontWeight: 700 }}>STANDARD TRAVEL ENQUIRY · {String(step).padStart(2, '0')} / 03</span>
              </div>

              {step === 1 && (
                <div>
                  <div style={{ fontSize: '12px', color: 'rgba(240,237,232,0.65)', textTransform: 'uppercase', letterSpacing: '.14em', marginBottom: '12px' }}>What can we help you with?</div>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {services.map(item => (
                      <button
                        type="button"
                        key={item}
                        className={service === item ? 'service-choice active' : 'service-choice'}
                        onClick={() => {
                          setService(item)
                          setErrors(prev => ({ ...prev, service: '' }))
                        }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '14px 16px',
                          minHeight: '44px',
                          background: service === item ? '#D7192D' : 'transparent',
                          border: '1px solid rgba(240,237,232,0.14)',
                          color: '#f0ede8',
                          cursor: 'pointer',
                          textAlign: 'left',
                          fontSize: '12px',
                          letterSpacing: '.12em',
                          textTransform: 'uppercase',
                          boxSizing: 'border-box',
                        }}
                      >
                        <span>{item}</span>
                        <ArrowRight size={14} />
                      </button>
                    ))}
                  </div>
                  {errors.service && <div style={{ color: '#ffd1d1', marginTop: '12px', fontSize: '12px' }}>{errors.service}</div>}
                  <div style={{ marginTop: '26px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="button" onClick={() => {
                      if (validateStep1()) setStep(2)
                    }} className="button button-red" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 24px', background: '#D7192D', color: '#fff', border: '0', textTransform: 'uppercase', letterSpacing: '.12em', fontSize: '10px', fontWeight: 700, cursor: 'pointer', minHeight: '44px', width: isMobile ? '100%' : 'auto', boxSizing: 'border-box' }}>
                      Continue <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div style={{ display: 'grid', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: '14px' }}>
                    <label style={{ display: 'grid', gap: '8px', color: 'rgba(240,237,232,0.7)', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', width: '100%' }}>
                      Destination <span style={{ color: '#D7192D' }}>*</span>
                      <input name="destination" autoComplete="off" value={destination} onChange={(e) => setDestination(e.target.value)} style={{ border: '0', borderBottom: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#f0ede8', padding: '10px 0', outline: '0', width: '100%', boxSizing: 'border-box' }} placeholder="Where are you going?" />
                      {errors.destination && <span style={{ color: '#ffd1d1' }}>{errors.destination}</span>}
                    </label>
                    <label style={{ display: 'grid', gap: '8px', color: 'rgba(240,237,232,0.7)', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', width: '100%' }}>
                      Departure location
                      <input name="departure-location" autoComplete="address-level2" value={departureLocation} onChange={(e) => setDepartureLocation(e.target.value)} style={{ border: '0', borderBottom: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#f0ede8', padding: '10px 0', outline: '0', width: '100%', boxSizing: 'border-box' }} placeholder="From where will you depart?" />
                    </label>
                    <label style={{ display: 'grid', gap: '8px', color: 'rgba(240,237,232,0.7)', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', width: '100%' }}>
                      Preferred departure date
                      <input type="date" name="departure-date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} style={{ border: '0', borderBottom: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#f0ede8', padding: '10px 0', outline: '0', width: '100%', boxSizing: 'border-box' }} />
                    </label>
                    <label style={{ display: 'grid', gap: '8px', color: 'rgba(240,237,232,0.7)', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', width: '100%' }}>
                      Return date
                      <input type="date" name="return-date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} style={{ border: '0', borderBottom: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#f0ede8', padding: '10px 0', outline: '0', width: '100%', boxSizing: 'border-box' }} />
                    </label>
                    <label style={{ display: 'grid', gap: '8px', color: 'rgba(240,237,232,0.7)', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', width: '100%' }}>
                      Number of travellers
                      <input type="number" min="1" name="travellers" value={travellers} onChange={(e) => setTravellers(e.target.value)} style={{ border: '0', borderBottom: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#f0ede8', padding: '10px 0', outline: '0', width: '100%', boxSizing: 'border-box' }} placeholder="1" />
                    </label>
                    <label style={{ display: 'grid', gap: '8px', color: 'rgba(240,237,232,0.7)', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', width: '100%' }}>
                      Approximate budget
                      <input name="budget" value={budget} onChange={(e) => setBudget(e.target.value)} style={{ border: '0', borderBottom: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#f0ede8', padding: '10px 0', outline: '0', width: '100%', boxSizing: 'border-box' }} placeholder="R 0" />
                    </label>
                  </div>

                  <label style={{ display: 'grid', gap: '8px', color: 'rgba(240,237,232,0.7)', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', width: '100%' }}>
                    Additional requirements
                    <textarea name="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#f0ede8', padding: '12px', outline: '0', resize: 'vertical', width: '100%', boxSizing: 'border-box' }} placeholder="Tell us more about your trip." />
                  </label>

                  <div style={{ display: 'flex', justifyContent: isMobile ? 'stretch' : 'space-between', gap: '12px', marginTop: '16px', flexDirection: isMobile ? 'column' : 'row' }}>
                    <button type="button" onClick={() => setStep(1)} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 20px', color: '#f0ede8', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', minHeight: '44px', width: isMobile ? '100%' : 'auto', boxSizing: 'border-box' }}><ArrowLeft size={14} /> Back</button>
                    <button type="button" onClick={() => {
                      if (validateStep2()) setStep(3)
                    }} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 24px', background: '#D7192D', color: '#fff', border: '0', cursor: 'pointer', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', minHeight: '44px', width: isMobile ? '100%' : 'auto', boxSizing: 'border-box' }}>Continue <ArrowRight size={14} /></button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit} noValidate>
                  <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', opacity: 0 }} />
                  <div style={{ display: 'grid', gap: '14px' }}>
                    <label style={{ display: 'grid', gap: '8px', color: 'rgba(240,237,232,0.7)', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', width: '100%' }}>
                      Full name <span style={{ color: '#D7192D' }}>*</span>
                      <input name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} style={{ border: '0', borderBottom: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#f0ede8', padding: '10px 0', outline: '0', width: '100%', boxSizing: 'border-box' }} placeholder="Full name" />
                      {errors.name && <span style={{ color: '#ffd1d1' }}>{errors.name}</span>}
                    </label>
                    <label style={{ display: 'grid', gap: '8px', color: 'rgba(240,237,232,0.7)', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', width: '100%' }}>
                      Email address <span style={{ color: '#D7192D' }}>*</span>
                      <input type="email" name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ border: '0', borderBottom: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#f0ede8', padding: '10px 0', outline: '0', width: '100%', boxSizing: 'border-box' }} placeholder="you@example.com" />
                      {errors.email && <span style={{ color: '#ffd1d1' }}>{errors.email}</span>}
                    </label>
                    <label style={{ display: 'grid', gap: '8px', color: 'rgba(240,237,232,0.7)', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', width: '100%' }}>
                      Phone / WhatsApp number <span style={{ color: '#D7192D' }}>*</span>
                      <input type="tel" name="phone" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ border: '0', borderBottom: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#f0ede8', padding: '10px 0', outline: '0', width: '100%', boxSizing: 'border-box' }} placeholder="+27 000 000 0000" />
                      {errors.phone && <span style={{ color: '#ffd1d1' }}>{errors.phone}</span>}
                    </label>
                  </div>

                  {submitError && <div role="alert" style={{ color: '#ffd1d1', marginTop: '14px', fontSize: '12px' }}>{submitError} <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>Chat to a consultant on WhatsApp</a></div>}

                  <div style={{ display: 'flex', justifyContent: isMobile ? 'stretch' : 'space-between', gap: '12px', marginTop: '16px', flexDirection: isMobile ? 'column' : 'row' }}>
                    <button type="button" onClick={() => setStep(2)} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 20px', color: '#f0ede8', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', minHeight: '44px', width: isMobile ? '100%' : 'auto', boxSizing: 'border-box' }}><ArrowLeft size={14} /> Back</button>
                    <button type="submit" disabled={loading} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 24px', background: loading ? '#8a1a22' : '#D7192D', color: '#fff', border: '0', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', opacity: loading ? 0.8 : 1, minHeight: '44px', width: isMobile ? '100%' : 'auto', boxSizing: 'border-box' }}>
                      {loading ? 'Sending enquiry...' : 'Send my enquiry'} <ArrowRight size={14} />
                    </button>
                  </div>
                </form>
              )}
            </>
          ) : (
            <div style={{ display: 'grid', gap: '20px', justifyItems: 'center', textAlign: 'center', padding: '30px 10px' }}>
              <div style={{ color: '#D7192D', fontSize: '40px' }}>✦</div>
              <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(34px,4vw,42px)', color: '#f0ede8', lineHeight: 1.3 }}>YOUR JOURNEY IS NOW WITH US.</div>
              <div role="status" style={{ color: 'rgba(240,237,232,0.68)', fontSize: '14px', lineHeight: 1.8 }}>Thank you. Your enquiry has been received.<br />A Travel Class SA consultant will review your request and get back to you shortly.</div>
              <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: '28px', color: '#f0ede8' }}>Your journey.<br /><span style={{ color: '#D7192D' }}>Our expertise.</span></div>
              <button type="button" onClick={closeAndReset} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: '#D7192D', color: '#fff', border: '0', cursor: 'pointer', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase' }}>Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
