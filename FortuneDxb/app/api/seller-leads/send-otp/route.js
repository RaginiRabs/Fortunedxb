// app/api/seller-leads/send-otp/route.js
// Generates a 6-digit OTP for the given email, stores a bcrypt hash in
// seller_otps, and emails the plaintext code to the user.

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query, queryOne } from '@/lib/db';
import { sendMail } from '@/lib/mailer';
import { renderOtpEmail } from '@/lib/emails/sellerEmails';

const OTP_TTL_MINUTES = 10;
const RESEND_COOLDOWN_SECONDS = 30;
const BLOCK_MINUTES = 10;

function generateOtp() {
  // 6-digit, zero-padded
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function POST(request) {
  try {
    const body = await request.json();
    const emailRaw = (body.email || '').toString().trim().toLowerCase();
    const name = (body.name || '').toString().trim();

    if (!emailRaw || !/\S+@\S+\.\S+/.test(emailRaw)) {
      return NextResponse.json(
        { success: false, message: 'Valid email address is required' },
        { status: 400 }
      );
    }

    // Cleanup expired rows (cheap housekeeping)
    try {
      await query(
        'DELETE FROM seller_otps WHERE expires_at < NOW() AND (blocked_until IS NULL OR blocked_until < NOW())'
      );
    } catch (_) {
      // non-fatal
    }

    // Is this email currently blocked?
    const existing = await queryOne(
      'SELECT otp_id, blocked_until, created_at FROM seller_otps WHERE email = ? ORDER BY otp_id DESC LIMIT 1',
      [emailRaw]
    );

    if (existing?.blocked_until) {
      const blockedUntil = new Date(existing.blocked_until);
      if (blockedUntil > new Date()) {
        const mins = Math.max(
          1,
          Math.ceil((blockedUntil.getTime() - Date.now()) / 60000)
        );
        return NextResponse.json(
          {
            success: false,
            message: `Too many attempts. Please try again in ${mins} minute${mins === 1 ? '' : 's'}.`,
          },
          { status: 429 }
        );
      }
    }

    // Resend cooldown — if a non-blocked row was created very recently, throttle
    if (existing?.created_at && !existing.blocked_until) {
      const createdAt = new Date(existing.created_at);
      const secondsSince = (Date.now() - createdAt.getTime()) / 1000;
      if (secondsSince < RESEND_COOLDOWN_SECONDS) {
        const wait = Math.ceil(RESEND_COOLDOWN_SECONDS - secondsSince);
        return NextResponse.json(
          {
            success: false,
            message: `Please wait ${wait} seconds before requesting another code.`,
          },
          { status: 429 }
        );
      }
    }

    // Generate and hash the OTP
    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

    // Invalidate any previous unverified rows for this email
    await query(
      'DELETE FROM seller_otps WHERE email = ? AND is_verified = 0',
      [emailRaw]
    );

    // Insert fresh row
    await query(
      `INSERT INTO seller_otps (email, otp_code, attempts, is_verified, expires_at)
       VALUES (?, ?, 0, 0, ?)`,
      [emailRaw, otpHash, expiresAt]
    );

    // Send the mail
    try {
      await sendMail({
        to: emailRaw,
        subject: 'Your Fortune DXB verification code',
        html: renderOtpEmail({ name, otp }),
      });
    } catch (mailErr) {
      console.error('[send-otp] Mailer error:', mailErr);
      return NextResponse.json(
        { success: false, message: 'Failed to send verification email. Please try again.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Verification code sent',
      data: { expires_in: OTP_TTL_MINUTES * 60 },
    });
  } catch (error) {
    console.error('[send-otp] error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send verification code' },
      { status: 500 }
    );
  }
}
