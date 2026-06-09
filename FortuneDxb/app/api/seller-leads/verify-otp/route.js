// app/api/seller-leads/verify-otp/route.js
// Verifies a plaintext OTP against the bcrypt hash stored in seller_otps.
// On the 6th failed attempt the email is blocked for 10 minutes.
// On success the row is marked is_verified=1 (actually consumed by the
// main /api/seller-leads POST after insert).

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query, queryOne } from '@/lib/db';

const MAX_ATTEMPTS = 6;
const BLOCK_MINUTES = 10;

export async function POST(request) {
  try {
    const body = await request.json();
    const emailRaw = (body.email || '').toString().trim().toLowerCase();
    const otp = (body.otp || '').toString().trim();

    if (!emailRaw || !otp) {
      return NextResponse.json(
        { success: false, message: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    const row = await queryOne(
      `SELECT otp_id, otp_code, attempts, is_verified, blocked_until, expires_at
       FROM seller_otps
       WHERE email = ?
       ORDER BY otp_id DESC
       LIMIT 1`,
      [emailRaw]
    );

    if (!row) {
      return NextResponse.json(
        { success: false, message: 'No verification code found. Please request a new one.' },
        { status: 404 }
      );
    }

    // Blocked?
    if (row.blocked_until && new Date(row.blocked_until) > new Date()) {
      const mins = Math.max(
        1,
        Math.ceil((new Date(row.blocked_until).getTime() - Date.now()) / 60000)
      );
      return NextResponse.json(
        {
          success: false,
          message: `Too many attempts. Please try again in ${mins} minute${mins === 1 ? '' : 's'}.`,
        },
        { status: 429 }
      );
    }

    // Expired?
    if (new Date(row.expires_at) < new Date()) {
      return NextResponse.json(
        { success: false, message: 'Verification code has expired. Please request a new one.' },
        { status: 410 }
      );
    }

    // Compare
    const match = await bcrypt.compare(otp, row.otp_code);

    if (!match) {
      const newAttempts = (row.attempts || 0) + 1;

      if (newAttempts >= MAX_ATTEMPTS) {
        const blockedUntil = new Date(Date.now() + BLOCK_MINUTES * 60 * 1000);
        await query(
          'UPDATE seller_otps SET attempts = ?, blocked_until = ? WHERE otp_id = ?',
          [newAttempts, blockedUntil, row.otp_id]
        );
        return NextResponse.json(
          {
            success: false,
            message: `Too many attempts. Please try again after ${BLOCK_MINUTES} minutes.`,
          },
          { status: 429 }
        );
      }

      await query(
        'UPDATE seller_otps SET attempts = ? WHERE otp_id = ?',
        [newAttempts, row.otp_id]
      );

      const remaining = MAX_ATTEMPTS - newAttempts;
      return NextResponse.json(
        {
          success: false,
          message: `Incorrect code. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`,
        },
        { status: 401 }
      );
    }

    // Success — mark verified (final consumption happens in POST /seller-leads)
    await query(
      'UPDATE seller_otps SET is_verified = 1, verified_at = NOW() WHERE otp_id = ?',
      [row.otp_id]
    );

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
    });
  } catch (error) {
    console.error('[verify-otp] error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to verify code' },
      { status: 500 }
    );
  }
}
