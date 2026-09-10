// app/api/enquiry/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const fromAddress = process.env.RESEND_FROM;
const recipientAddress = 'info@travelclasssa.com';

const duplicateSubmissionKeys = new Set<string>();
const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const normalizeString = (value: unknown) =>
  typeof value === 'string' ? value.trim() : '';

const firstString = (...values: Array<string | undefined>) => {
  for (const value of values) {
    if (value) {
      return value;
    }
  }
  return '';
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!resendApiKey || !fromAddress) {
      return NextResponse.json(
        { success: false, error: "We couldn't send your enquiry right now. Please try again or contact us directly." },
        { status: 503 }
      );
    }

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return NextResponse.json(
        { success: false, error: 'Please provide your enquiry details.' },
        { status: 400 }
      );
    }

    const isVip = data.type === 'vip';
    const subject = isVip
      ? 'Travel Class SA — New VIP Concierge Enquiry'
      : 'Travel Class SA — New Travel Enquiry';

    const name = normalizeString(data.name);
    const vipName = normalizeString(data['vip-name']);
    const email = normalizeString(data.email);
    const vipEmail = normalizeString(data['vip-email']);
    const submittedEmail = firstString(email, vipEmail);
    const customerName = firstString(name, vipName);

    const phone = firstString(
      normalizeString(data.phone),
      normalizeString(data['vip-phone'])
    );

    const destination = firstString(
      normalizeString(data.destination),
      normalizeString(data['vip-destination'])
    );

    const dates = firstString(
      normalizeString(data.dates),
      normalizeString(data['vip-dates'])
    );

    const travellers = firstString(
      normalizeString(data.travellers),
      normalizeString(data['vip-travellers'])
    );

    const selectedService = Array.isArray(data.selectedServices)
      ? data.selectedServices.map((value: unknown) => normalizeString(value)).filter(Boolean).join(', ')
      : normalizeString(data.selected);

    const notes = firstString(
      normalizeString(data.notes),
      normalizeString(data['vip-notes'])
    );

    const journeyType = firstString(
      normalizeString(data.selected),
      normalizeString(data['journeyType']),
      normalizeString(data['journey-type'])
    );

    if (!customerName || !submittedEmail) {
      return NextResponse.json(
        { success: false, error: 'Please provide your name and email address.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(submittedEmail)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!journeyType && !selectedService) {
      return NextResponse.json(
        { success: false, error: 'Please choose a service or journey type.' },
        { status: 400 }
      );
    }

    if (!destination) {
      return NextResponse.json(
        { success: false, error: 'Please provide your destination.' },
        { status: 400 }
      );
    }

    const duplicateKey = [
      submittedEmail.toLowerCase(),
      customerName.toLowerCase(),
      journeyType,
      destination,
      dates,
      travellers,
      selectedService,
    ].join('|');

    if (duplicateSubmissionKeys.has(duplicateKey)) {
      return NextResponse.json(
        { success: false, error: 'This enquiry is already being processed.' },
        { status: 409 }
      );
    }

    duplicateSubmissionKeys.add(duplicateKey);

    try {
      const fields: Array<[string, string]> = [
        ['Type', isVip ? 'VIP Concierge' : 'Travel enquiry'],
        ['Journey type', journeyType || 'Not supplied'],
        ['Destination', destination],
        ['Corporate', data.type === 'vip' ? 'VIP Concierge' : 'Corporate Travel'],
        ['Group Travel', data.type === 'vip' ? 'VIP Concierge' : 'Group Travel'],
        ['VIP Concierge', isVip ? 'VIP Concierge' : 'No'],
        ['Name', customerName],
        ['Email', submittedEmail],
        ['Phone', phone],
        ['Travel dates', dates],
        ['Number of travellers', travellers],
        ['Selected service', selectedService],
        ['Notes', notes],
      ].filter(([, value]) => value !== '');

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
          <h2 style="margin: 0 0 16px;">${escapeHtml(subject)}</h2>
          <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 640px;">
            ${fields
              .map(
                ([label, value]) => `
                  <tr>
                    <td style="border-bottom: 1px solid #e5e7eb; padding: 10px 8px; font-weight: 700; vertical-align: top; width: 180px;">${escapeHtml(label)}</td>
                    <td style="border-bottom: 1px solid #e5e7eb; padding: 10px 8px; vertical-align: top;">${escapeHtml(value)}</td>
                  </tr>
                `
              )
              .join('')}
          </table>
        </div>
      `;

      const resend = new Resend(resendApiKey);
      const { error } = await resend.emails.send({
        from: fromAddress,
        to: [recipientAddress],
        replyTo: submittedEmail,
        subject,
        html: emailHtml,
      });

      if (error) {
        return NextResponse.json(
          { success: false, error: "We couldn't send your enquiry right now. Please try again or contact us directly." },
          { status: 502 }
        );
      }

      return NextResponse.json({ success: true });
    } finally {
      duplicateSubmissionKeys.delete(duplicateKey);
    }
  } catch (_error) {
    console.error('Enquiry API error');
    return NextResponse.json(
      { success: false, error: "We couldn't send your enquiry right now. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}

