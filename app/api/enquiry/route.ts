// app/api/enquiry/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Expected environment variables:
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Determine subject based on type field (optional)
    const isVip = data.type === 'vip';
    const subject = isVip
      ? 'Travel Class SA — New VIP Concierge Enquiry'
      : 'Travel Class SA — New Travel Enquiry';

    const htmlBody = `
      <h2>${subject}</h2>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'info@classsa.com',
      subject,
      html: htmlBody,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Enquiry API error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

