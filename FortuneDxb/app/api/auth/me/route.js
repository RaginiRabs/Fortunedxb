import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

/**
 * GET /api/auth/me - Get current logged-in user from session
 */
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        user_id: user.userId,
        user_name: user.name,
        user_email: user.email,
        user_role: user.role,
      },
    });
  } catch (error) {
    console.error('Get current user error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}