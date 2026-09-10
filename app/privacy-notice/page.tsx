import type { Metadata } from 'next'
import TravelClassFooter from '@/components/TravelClassFooter'

export const metadata: Metadata = {
  title: 'Privacy Notice | Travel Class SA',
  description: 'Privacy information for Travel Class SA website visitors and travel enquiry customers.',
}

export default function PrivacyNoticePage() {
  return (
    <main className="privacy-page">
      <header className="privacy-header">
        <a href="/" className="privacy-back">Travel Class SA</a>
        <span>Privacy Notice</span>
      </header>

      <article className="privacy-content">
        <p className="privacy-eyebrow">Travel Class SA</p>
        <h1>Privacy Notice</h1>
        <p className="privacy-lede">We respect the privacy of people who visit our website and contact us about travel services. This notice explains, in plain language, how enquiry information is handled.</p>
        <p className="privacy-meta">Last updated: 11 September 2026</p>

        <section><h2>Who we are</h2><p>Travel Class SA is a South African travel management company. For privacy questions or requests, contact us at <a href="mailto:info@travelclasssa.com">info@travelclasssa.com</a> or call <a href="tel:+27728336872">+27 72 833 6872</a>.</p></section>

        <section><h2>Information we collect</h2><p>When you submit a standard travel or VIP Concierge enquiry, the website may collect the information you choose to provide:</p><ul><li>Name and email address.</li><li>Phone or WhatsApp number.</li><li>Destination, travel dates and number of travellers.</li><li>Selected services, enquiry type, departure details and budget where applicable.</li><li>Additional travel requirements, notes or other message details.</li></ul><p>The forms also use a hidden anti-spam field. It is not used as customer information. The website does not currently use Google Analytics, advertising cookies, or browser storage for tracking.</p></section>

        <section><h2>Why we use it</h2><p>Travel Class SA uses enquiry information to understand your request, contact you about the journey you asked about, prepare travel assistance or quotations, provide VIP Concierge support, and maintain a basic record of the enquiry and duplicate-submission protection.</p><p>We do not use an enquiry submission as marketing consent. Any future direct marketing should have its own lawful basis and appropriate opt-out process.</p></section>

        <section><h2>Who receives it</h2><p>Enquiry details are sent through Resend, a transactional email service provider, to <a href="mailto:info@travelclasssa.com">info@travelclasssa.com</a>. The customer email is used as Reply-To so Travel Class SA can respond. The configured Resend sender remains a Travel Class SA sending identity.</p><p>Resend may process information outside South Africa. The business owner should confirm Resend&apos;s current processing locations, contractual terms, security arrangements and any cross-border transfer safeguards before production use.</p><p>If you choose to start a WhatsApp conversation, you leave this website and the conversation is handled by WhatsApp under its own terms and privacy practices. The website links to WhatsApp at <a href="https://wa.me/27633690057">+27 63 369 0057</a>.</p><p>Social-media links are optional outbound links. No social-media platform receives enquiry data merely because you view this website.</p></section>

        <section><h2>Security and retention</h2><p>The website keeps the Resend API key and sender configuration server-side, validates and limits requests, uses a honeypot, rate limits requests, rejects oversized input, prevents duplicate submissions, and escapes user-provided content before placing it in email HTML. The website does not intentionally log enquiry contents.</p><p>Enquiry emails are delivered to and retained in the Travel Class SA business inbox and may also be retained by the email service provider according to its service terms. Travel Class SA must set and document its own retention period, review it regularly, and securely delete information when it is no longer needed.</p></section>

        <section><h2>Your rights and requests</h2><p>Subject to applicable law and appropriate identity verification, you may ask Travel Class SA about personal information held about you and request correction of inaccurate information. You may also ask about deletion or restriction where applicable, object to certain processing, or withdraw consent where processing relies on consent. Some requests may be limited by legal, operational or record-keeping requirements.</p><p>Send an access, correction, deletion or privacy request to <a href="mailto:info@travelclasssa.com">info@travelclasssa.com</a>. The business owner should confirm the appointed Information Officer, identity-verification process, response workflow, and any specific postal or physical address before publishing a final legal version of this notice.</p><p>If you are not satisfied with the response, you may raise a complaint with the South African Information Regulator through its official channels: <a href="https://inforegulator.org.za/" target="_blank" rel="noopener noreferrer">inforegulator.org.za</a>.</p></section>

        <section><h2>Business decisions still required</h2><p>This technical notice does not by itself establish POPIA compliance. Travel Class SA should obtain legal or privacy advice and confirm its responsible party details, Information Officer, lawful bases, retention schedule, operator agreements, cross-border safeguards, breach-response process, data-subject request procedure, and any direct-marketing practices.</p></section>
      </article>

      <TravelClassFooter />
    </main>
  )
}
