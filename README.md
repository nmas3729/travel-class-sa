# Travel Class SA

Travel Class SA is a luxury travel management website for bespoke holidays, corporate travel, group journeys, and concierge services.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Enquiry email configuration

The enquiry forms send through Resend from the server-side API route. Configure these variables in the local environment and in production; never expose them with a `NEXT_PUBLIC_` prefix:

```bash
RESEND_API_KEY=re_your_server_only_key
RESEND_FROM="Travel Class SA <enquiries@your-verified-domain.example>"
```

`RESEND_FROM` must use a sender address on a domain verified in Resend. Enquiries are delivered to `info@travelclasssa.com`, with the visitor's email set as `Reply-To`.

## Production build

```bash
npm run build
```
