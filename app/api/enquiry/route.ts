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

function renderStandardTravelEmailHtml(data: {
  subject: string,
  customerName: string,
  submittedEmail: string,
  phone: string,
  service: string,
  destination: string,
  departureLocation: string,
  departureDate: string,
  returnDate: string,
  travellers: string,
  budget: string,
  notes: string,
  submittedAt: string,
}) {
  const rows = [
    ['Name', data.customerName],
    ['Email', data.submittedEmail],
    ['Phone / WhatsApp', data.phone],
    ['Service', data.service],
    ['Destination', data.destination],
    ['Departure location', data.departureLocation || 'Not supplied'],
    ['Departure date', data.departureDate || 'Not supplied'],
    ['Return date', data.returnDate || 'Not supplied'],
    ['Number of travellers', data.travellers || 'Not supplied'],
    ['Approximate budget', data.budget || 'Not supplied'],
    ['Customer message', data.notes || 'Not supplied'],
  ];

  return `<div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
    <div style="font-size: 16px; font-weight: 700; color: #111827;">TRAVEL CLASS SA</div>
    <div style="margin-top: 14px; font-size: 24px; font-weight: 700; color: #1d4ed8;">🔵 STANDARD TRAVEL ENQUIRY</div>
    <div style="margin-top: 24px; border-top: 1px solid #d1d5db; padding-top: 16px;">
      <div style="font-size: 12px; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 0.16em;">ENQUIRY TYPE</div>
      <div style="font-size: 16px; font-weight: 700; color: #111827; margin-top: 8px;">STANDARD TRAVEL</div>
    </div>
    <div style="margin-top: 28px; font-size: 14px; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 0.14em; border-bottom: 1px solid #d1d5db; padding-bottom: 8px;">CUSTOMER DETAILS</div>
    <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 640px; margin-top: 12px;">
      ${rows
        .slice(0, 3)
        .map(([label, value]) => `
          <tr>
            <td style="border-bottom: 1px solid #e5e7eb; padding: 10px 8px; font-weight: 700; vertical-align: top; width: 180px;">${escapeHtml(label)}</td>
            <td style="border-bottom: 1px solid #e5e7eb; padding: 10px 8px; vertical-align: top;">${escapeHtml(value)}</td>
          </tr>`)
        .join('')}
    </table>
    <div style="margin-top: 24px; font-size: 14px; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 0.14em; border-bottom: 1px solid #d1d5db; padding-bottom: 8px;">TRAVEL REQUIREMENT</div>
    <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 640px; margin-top: 12px;">
      ${rows
        .slice(3, 10)
        .map(([label, value]) => `
          <tr>
            <td style="border-bottom: 1px solid #e5e7eb; padding: 10px 8px; font-weight: 700; vertical-align: top; width: 180px;">${escapeHtml(label)}</td>
            <td style="border-bottom: 1px solid #e5e7eb; padding: 10px 8px; vertical-align: top;">${escapeHtml(value)}</td>
          </tr>`)
        .join('')}
    </table>
    <div style="margin-top: 24px; font-size: 14px; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 0.14em; border-bottom: 1px solid #d1d5db; padding-bottom: 8px;">ADDITIONAL REQUIREMENTS</div>
    <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 640px; margin-top: 12px;">
      <tr>
        <td style="border-bottom: 1px solid #e5e7eb; padding: 10px 8px; font-weight: 700; vertical-align: top; width: 180px;">Customer message</td>
        <td style="border-bottom: 1px solid #e5e7eb; padding: 10px 8px; vertical-align: top;">${escapeHtml(data.notes || 'Not supplied')}</td>
      </tr>
    </table>
    <div style="margin-top: 24px; font-size: 12px; color: #6b7280;">Submitted: ${escapeHtml(data.submittedAt)}</div>
    <div style="margin-top: 16px; font-size: 16px; font-weight: 700; color: #111827;">Travel Class SA</div>
    <div style="font-size: 12px; color: #6b7280;">Your journey. Our expertise.</div>
  </div>`;
}

function renderVipEmailHtml(data: {
  subject: string,
  customerName: string,
  submittedEmail: string,
  phone: string,
  destination: string,
  dates: string,
  travellers: string,
  selectedService: string,
  notes: string,
}) {
  const fields: Array<[string, string]> = [
    ['Type', 'VIP Concierge'],
    ['Type of enquiry', 'VIP Concierge'],
    ['Journey type', data.selectedService || 'Not supplied'],
    ['Destination', data.destination],
    ['Travel dates', data.dates],
    ['Number of travellers', data.travellers],
    ['Name', data.customerName],
    ['Email', data.submittedEmail],
    ['Phone', data.phone],
    ['Selected service', data.selectedService],
    ['Notes', data.notes],
  ].filter(([, value]) => value !== '');

  return `<div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
    <div style="font-size: 16px; font-weight: 700; color: #111827;">TRAVEL CLASS SA</div>
    <div style="margin-top: 14px; font-size: 24px; font-weight: 700; color: #b91c1c;">🔴 VIP CONCIERGE ENQUIRY</div>
    <div style="margin-top: 24px; border-top: 1px solid #d1d5db; padding-top: 16px;">
      <div style="font-size: 12px; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 0.16em;">ENQUIRY TYPE</div>
      <div style="font-size: 16px; font-weight: 700; color: #111827; margin-top: 8px;">VIP CONCIERGE</div>
    </div>
    <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 640px; margin-top: 16px;">
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
    <div style="margin-top: 24px; font-size: 12px; color: #6b7280;">Submitted: ${escapeHtml(new Date().toISOString())}</div>
    <div style="margin-top: 16px; font-size: 16px; font-weight: 700; color: #111827;">Travel Class SA</div>
    <div style="font-size: 12px; color: #6b7280;">Your journey. Our expertise.</div>
  </div>`;
}

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
      ? '🔴 VIP CONCIERGE ENQUIRY — Travel Class SA'
      : '🔵 STANDARD TRAVEL ENQUIRY — Travel Class SA';

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

    const submittedAt = new Date().toISOString();

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
      const emailHtml = isVip
        ? renderVipEmailHtml({
            subject,
            customerName,
            submittedEmail,
            phone,
            destination,
            dates,
            travellers,
            selectedService,
            notes,
          })
        : renderStandardTravelEmailHtml({
            subject,
            customerName,
            submittedEmail,
            phone,
            service: selectedService || journeyType || 'Not supplied',
            destination,
            departureLocation: normalizeString(data['departure-location']) || 'Not supplied',
            departureDate: firstString(normalizeString(data['departure-date']), normalizeString(data['from-date']), dates) || 'Not supplied',
            returnDate: normalizeString(data['return-date']) || 'Not supplied',
            travellers,
            budget: normalizeString(data.budget) || 'Not supplied',
            notes,
            submittedAt,
          });

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

