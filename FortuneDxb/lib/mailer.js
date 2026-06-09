// lib/mailer.js
// Shared nodemailer transporter + sendMail helper.
// Every API route that sends mail should import from here instead of
// creating its own transporter.

import nodemailer from 'nodemailer';

let cachedTransporter = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return cachedTransporter;
}

/**
 * Build the canonical "from" header.
 * Falls back to SMTP_USER if MAIL_FROM_EMAIL is not set.
 */
function buildFrom() {
  const name = process.env.MAIL_FROM_NAME || 'Fortune DXB';
  const email = process.env.MAIL_FROM_EMAIL || process.env.SMTP_USER;
  return `"${name}" <${email}>`;
}

/**
 * Send an email.
 * @param {{ to: string|string[], subject: string, html: string, text?: string, replyTo?: string }} opts
 */
export async function sendMail({ to, subject, html, text, replyTo }) {
  const transporter = getTransporter();

  const info = await transporter.sendMail({
    from: buildFrom(),
    to,
    subject,
    html,
    text,
    replyTo: replyTo || process.env.MAIL_REPLY_TO || undefined,
  });

  return info;
}

export default sendMail;
