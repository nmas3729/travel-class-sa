import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const fromAddress = process.env.RESEND_FROM;
const recipientAddress = 'info@travelclasssa.com';
const maxBodyBytes = 50_000;
const rateLimitWindowMs = 10 * 60 * 1000;
const maxRequestsPerWindow = 5;
const duplicateWindowMs = 10 * 60 * 1000;
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const duplicateSubmissions = new Map<string, number>();
const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isValidPhone = (value: string) => /^\+?[0-9()\s-]{7,25}$/.test(value);
type EnquiryData = Record<string, unknown>;

const normalizeString = (value: unknown) => typeof value === 'string' ? value.trim() : '';
const firstString = (...values: Array<string | undefined>) => values.find(Boolean) || '';
const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

function getClientKey(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const current = rateLimits.get(key);
  if (!current || current.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + rateLimitWindowMs });
    return true;
  }
  if (current.count >= maxRequestsPerWindow) return false;
  current.count += 1;
  return true;
}

function cleanDuplicateSubmissions() {
  const now = Date.now();
  for (const [key, createdAt] of duplicateSubmissions) {
    if (createdAt + duplicateWindowMs <= now) duplicateSubmissions.delete(key);
  }
}

function renderEmailHtml(data: {
  enquiryType: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  destination: string;
  dates: string;
  travellers: string;
  requirements: string;
  message: string;
  departureLocation: string;
  departureDate: string;
  returnDate: string;
  budget: string;
  submittedAt: string;
}) {
  const rows = [
    ['Customer name', data.name],
    ['Customer email', data.email],
    ['Customer phone', data.phone],
    ['Enquiry type', data.enquiryType],
    ['Service', data.service],
    ['Destination', data.destination],
    ['Travel dates', data.dates],
    ['Departure location', data.departureLocation],
    ['Departure date', data.departureDate],
    ['Return date', data.returnDate],
    ['Number of travellers', data.travellers],
    ['Budget', data.budget],
    ['Travel requirements', data.requirements],
    ['Message/details', data.message],
    ['Date and time submitted', data.submittedAt],
  ].filter(([, value]) => value !== '');

  return `<div style="font-family:Arial,sans-serif;color:#171717;line-height:1.6;max-width:720px">
    <h1 style="font-size:22px;margin:0 0 8px;color:#171717">Travel Class SA — New Travel Enquiry</h1>
    <p style="margin:0 0 24px;color:#666">${escapeHtml(data.enquiryType)}</p>
    <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%">
      ${rows.map(([label, value]) => `<tr><td style="border-top:1px solid #e5e7eb;padding:10px 12px 10px 0;font-weight:700;vertical-align:top;width:190px">${escapeHtml(label)}</td><td style="border-top:1px solid #e5e7eb;padding:10px 0;white-space:pre-wrap;vertical-align:top">${escapeHtml(value)}</td></tr>`).join('')}
    </table>
    <p style="margin:24px 0 0;color:#666;font-size:12px">Travel Class SA · Your journey. Our expertise.</p>
  </div>`;
}

function errorResponse(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export async function POST(request: Request) {
  try {
    if (!resendApiKey || !fromAddress) {
      return errorResponse("We couldn't send your enquiry right now. Please try again or contact us directly.", 503);
    }

    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > maxBodyBytes) return errorResponse('Your enquiry is too large. Please shorten the details and try again.', 413);

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > maxBodyBytes) {
      return errorResponse('Your enquiry is too large. Please shorten the details and try again.', 413);
    }

    let data: EnquiryData;
    try {
      const parsed: unknown = JSON.parse(rawBody);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return errorResponse('Please provide your enquiry details.', 400);
      data = parsed as EnquiryData;
    } catch {
      return errorResponse('Please provide your enquiry details.', 400);
    }

    if (normalizeString(data.website)) return NextResponse.json({ success: true });
    if (!checkRateLimit(getClientKey(request))) return errorResponse('Please wait a few minutes before sending another enquiry.', 429);

    const isVip = data.type === 'vip';
    if (!isVip && data.type !== 'standard') return errorResponse('Please provide a valid enquiry type.', 400);

    const name = firstString(normalizeString(data.name), normalizeString(data['vip-name']));
    const email = firstString(normalizeString(data.email), normalizeString(data['vip-email']));
    const phone = firstString(normalizeString(data.phone), normalizeString(data['vip-phone']));
    const destination = firstString(normalizeString(data.destination), normalizeString(data['vip-destination']));
    const dates = firstString(normalizeString(data.dates), normalizeString(data['vip-dates']));
    const travellers = firstString(normalizeString(data.travellers), normalizeString(data['vip-travellers']));
    const selectedServices = Array.isArray(data.selectedServices)
      ? data.selectedServices.map(normalizeString).filter(Boolean).join(', ')
      : '';
    const service = firstString(normalizeString(data.selected), normalizeString(data.journeyType), selectedServices);
    const requirements = selectedServices || service;
    const message = firstString(normalizeString(data.notes), normalizeString(data['vip-notes']));
    const departureLocation = normalizeString(data['departure-location']);
    const departureDate = firstString(normalizeString(data['departure-date']), normalizeString(data['from-date']));
    const returnDate = normalizeString(data['return-date']);
    const budget = normalizeString(data.budget);

    if (!name || !email) return errorResponse('Please provide your name and email address.', 400);
    if (!isValidEmail(email) || email.length > 254) return errorResponse('Please provide a valid email address.', 400);
    if (!isVip && !phone) return errorResponse('Please provide your phone number.', 400);
    if (phone && (!isValidPhone(phone) || phone.length > 25)) return errorResponse('Please provide a valid phone number.', 400);
    if (!service) return errorResponse('Please choose a service or journey type.', 400);
    if (!destination) return errorResponse('Please provide your destination.', 400);
    if (travellers && (!/^\d+$/.test(travellers) || Number(travellers) < 1 || Number(travellers) > 50)) {
      return errorResponse('Please provide a valid number of travellers.', 400);
    }

    const lengthChecks: Array<[string, string, number]> = [
      ['name', name, 120], ['service', service, 120], ['destination', destination, 160],
      ['dates', dates, 120], ['departure location', departureLocation, 160],
      ['message', message, 5000], ['requirements', requirements, 1000], ['budget', budget, 80],
    ];
    const invalidLength = lengthChecks.find(([, value, maximum]) => value.length > maximum);
    if (invalidLength) return errorResponse(`Please shorten your ${invalidLength[0]} and try again.`, 400);

    cleanDuplicateSubmissions();
    const duplicateKey = [isVip ? 'vip' : 'standard', email.toLowerCase(), name.toLowerCase(), service, destination, dates, travellers].join('|');
    if (duplicateSubmissions.has(duplicateKey)) return errorResponse('This enquiry has already been received.', 409);
    duplicateSubmissions.set(duplicateKey, Date.now());

    const submittedAt = new Date().toLocaleString('en-ZA', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Africa/Johannesburg' });
    const enquiryType = isVip ? 'VIP Concierge' : 'Standard Travel';
    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: [recipientAddress],
      replyTo: email,
      subject: 'Travel Class SA — New Travel Enquiry',
      html: renderEmailHtml({ enquiryType, name, email, phone, service, destination, dates, travellers, requirements, message, departureLocation, departureDate, returnDate, budget, submittedAt }),
    });

    if (error) {
      duplicateSubmissions.delete(duplicateKey);
      return errorResponse("We couldn't send your enquiry right now. Please try again or contact us directly.", 502);
    }

    return NextResponse.json({ success: true });
  } catch {
    return errorResponse("We couldn't send your enquiry right now. Please try again or contact us directly.", 500);
  }
}
