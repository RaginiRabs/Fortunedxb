// lib/emails/sellerEmails.js
// HTML email templates for the seller flow.
// Two functions:
//   - renderOtpEmail()       — 6-digit verification code
//   - renderThankYouEmail()  — post-submission confirmation

const BRAND = {
  gold: '#C49A3C',
  navy: '#0B1A2A',
  bg: '#F8F6F2',
  card: '#FFFFFF',
  border: '#E9E5DF',
  text: '#1A1A1A',
  muted: '#64748B',
};

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatAED(value) {
  if (value === null || value === undefined || value === '') return '—';
  const n = Number(value);
  if (!Number.isFinite(n)) return '—';
  return 'AED ' + n.toLocaleString();
}

const PROPERTY_TYPE_LABELS = {
  apartment: 'Apartment',
  townhouse: 'Townhouse',
  villa: 'Villa',
  luxury_villa: 'Luxury Villa',
};
const LISTING_TYPE_LABELS = {
  off_plan: 'Off-Plan',
  ready: 'Ready to Move In',
};

function baseLayout({ title, bodyHtml }) {
  const siteUrl = (process.env.PUBLIC_SITE_URL || 'https://fortunedxb.com').replace(/\/+$/, '');
  const logoUrl = `${siteUrl}/asset/logo.png`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.bg};font-family:'Helvetica Neue',Arial,sans-serif;color:${BRAND.text};-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.bg};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background:${BRAND.card};border:1px solid ${BRAND.border};border-radius:2px;">

          <!-- Header -->
          <tr>
            <td style="padding:28px 36px 22px;border-bottom:1px solid ${BRAND.border};text-align:center;background:${BRAND.navy};">
              <img
                src="${logoUrl}"
                alt="Fortune DXB"
                width="160"
                style="display:inline-block;max-width:160px;height:auto;border:0;outline:none;text-decoration:none;"
              />
              <div style="font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${BRAND.gold};margin-top:10px;">
                Dubai · RERA Licensed
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px;">
              ${bodyHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 36px;border-top:1px solid ${BRAND.border};background:${BRAND.bg};text-align:center;">
              <div style="font-size:11px;color:${BRAND.muted};line-height:1.7;">
                Fortune DXB &middot; Dubai, United Arab Emirates<br/>
                This email was sent because you submitted a listing request on our website.<br/>
                If this wasn&rsquo;t you, please ignore this email.
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * OTP verification email.
 * @param {{ name?: string, otp: string }} args
 */
export function renderOtpEmail({ name, otp }) {
  const firstName = name ? escapeHtml(String(name).split(' ')[0]) : 'there';
  const code = escapeHtml(String(otp || ''));

  const body = `
    <h1 style="margin:0 0 8px;font-family:'Playfair Display',Georgia,serif;font-size:24px;font-weight:400;color:${BRAND.navy};line-height:1.3;">
      Verify your email
    </h1>
    <p style="margin:0 0 22px;font-size:14px;line-height:1.8;color:${BRAND.muted};">
      Hi ${firstName}, thanks for starting your property listing with Fortune DXB.
      Please use the verification code below to confirm your email address and complete your submission.
    </p>

    <div style="margin:26px 0;padding:22px 24px;background:${BRAND.bg};border:1px solid ${BRAND.border};border-radius:2px;text-align:center;">
      <div style="font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${BRAND.muted};margin-bottom:10px;">
        Your verification code
      </div>
      <div style="font-family:'Courier New',monospace;font-size:36px;font-weight:700;letter-spacing:0.24em;color:${BRAND.navy};">
        ${code}
      </div>
      <div style="font-size:11px;color:${BRAND.muted};margin-top:12px;">
        This code expires in <strong style="color:${BRAND.navy};">10 minutes</strong>.
      </div>
    </div>

    <p style="margin:0 0 6px;font-size:13px;line-height:1.7;color:${BRAND.muted};">
      For your security, do not share this code with anyone. Fortune DXB staff will never ask you for this code.
    </p>
    <p style="margin:0;font-size:13px;line-height:1.7;color:${BRAND.muted};">
      If you did not request this code, please ignore this email &mdash; no action is required on your part.
    </p>
  `;

  return baseLayout({ title: 'Your verification code', bodyHtml: body });
}

/**
 * Thank-you / submission-received email.
 * @param {{
 *   name: string, ref_code?: string,
 *   property_type?: string, listing_type?: string,
 *   project_name?: string, project_location?: string,
 *   asking_price?: string | number,
 *   phone_ccode?: string, phone?: string
 * }} args
 */
export function renderThankYouEmail(args) {
  const firstName = escapeHtml(String(args.name || '').split(' ')[0] || 'there');
  const ref = escapeHtml(args.ref_code || '');

  const propertyLabel = PROPERTY_TYPE_LABELS[args.property_type] || '—';
  const statusLabel = LISTING_TYPE_LABELS[args.listing_type] || '—';
  const project = escapeHtml(args.project_name || '—');
  const location = escapeHtml(args.project_location || '—');
  const asking = escapeHtml(formatAED(args.asking_price));
  const phoneDisplay = args.phone
    ? escapeHtml(`${args.phone_ccode ? args.phone_ccode + ' ' : ''}${args.phone}`)
    : '—';

  const summaryRow = (label, value) => `
    <tr>
      <td style="padding:9px 0;border-bottom:1px solid ${BRAND.border};font-size:12px;color:${BRAND.muted};width:42%;">
        ${label}
      </td>
      <td style="padding:9px 0;border-bottom:1px solid ${BRAND.border};font-size:13px;color:${BRAND.navy};font-weight:500;text-align:right;">
        ${value}
      </td>
    </tr>`;

  const body = `
    <h1 style="margin:0 0 8px;font-family:'Playfair Display',Georgia,serif;font-size:26px;font-weight:400;color:${BRAND.navy};line-height:1.3;">
      Thank you, ${firstName}.
    </h1>
    <p style="margin:0 0 22px;font-size:14px;line-height:1.85;color:${BRAND.muted};">
      We&rsquo;ve successfully received your property listing submission and your details are now with our specialist team for review.
      Thank you for trusting Fortune DXB with your listing &mdash; we take that responsibility seriously.
    </p>

    ${ref ? `
    <div style="margin:0 0 22px;padding:14px 18px;background:${BRAND.bg};border:1px solid ${BRAND.border};border-radius:2px;display:inline-block;">
      <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:${BRAND.muted};margin-bottom:4px;">
        Reference number
      </div>
      <div style="font-family:'Playfair Display',Georgia,serif;font-size:18px;color:${BRAND.gold};letter-spacing:0.04em;">
        ${ref}
      </div>
    </div>
    ` : ''}

    <h2 style="margin:24px 0 10px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.muted};font-weight:600;">
      Your listing summary
    </h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${BRAND.border};">
      ${summaryRow('Property category', propertyLabel)}
      ${summaryRow('Listing status', statusLabel)}
      ${summaryRow('Project / Tower', project)}
      ${summaryRow('Location', location)}
      ${summaryRow('Asking price', asking)}
      ${summaryRow('Contact number', phoneDisplay)}
    </table>

    <h2 style="margin:28px 0 10px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${BRAND.muted};font-weight:600;">
      What happens next
    </h2>
    <p style="margin:0 0 12px;font-size:13px;line-height:1.8;color:${BRAND.text};">
      A dedicated Fortune DXB property consultant will contact you within
      <strong style="color:${BRAND.navy};">24 hours</strong> on the phone number you provided.
      They will walk you through listing strategy, fair-market valuation, and the next steps to bring your property to the right buyers.
    </p>
    <p style="margin:0 0 22px;font-size:13px;line-height:1.8;color:${BRAND.text};">
      In the meantime, please keep this email for your records. If you need to share anything additional with our team, simply reply to this message &mdash; we&rsquo;ll see it.
    </p>

    <div style="margin-top:26px;padding-top:20px;border-top:1px solid ${BRAND.border};">
      <p style="margin:0;font-size:13px;color:${BRAND.muted};line-height:1.7;">
        Warm regards,<br/>
        <strong style="color:${BRAND.navy};">The Fortune DXB Team</strong>
      </p>
    </div>
  `;

  return baseLayout({
    title: `Thank you for listing with Fortune DXB${ref ? ' · ' + ref : ''}`,
    bodyHtml: body,
  });
}
