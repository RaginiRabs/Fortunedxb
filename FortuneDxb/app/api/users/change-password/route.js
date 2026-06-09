import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { hashPassword, comparePassword } from '@/lib/auth';
import { getSessionId, verifySession } from '@/lib/session';

// POST - Change own password (All logged-in users)
export async function POST(request) {
  try {
    // Verify session
    const sessionId = await getSessionId();
    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const currentUser = await verifySession(sessionId);
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: 'Invalid session' },
        { status: 401 }
      );
    }

    const { current_password, new_password } = await request.json();

    // Validation
    if (!current_password || !new_password) {
      return NextResponse.json(
        { success: false, message: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    if (new_password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'New password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Get user with password
    const user = await queryOne(
      'SELECT user_id, password FROM users WHERE user_id = ?',
      [currentUser.userId]
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Verify current password
    const isValid = await comparePassword(current_password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await hashPassword(new_password);

    // Update password
    await query(
      'UPDATE users SET password = ? WHERE user_id = ?',
      [hashedPassword, currentUser.userId]
    );

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to change password' },
      { status: 500 }
    );
  }
}