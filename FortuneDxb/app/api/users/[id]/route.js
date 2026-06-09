import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { getSessionId, verifySession } from '@/lib/session';

// GET - Single user (Admin only)
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    // Verify admin session
    const sessionId = await getSessionId();
    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const currentUser = await verifySession(sessionId);
    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }

    // Get user (exclude password)
    const user = await queryOne(
      `SELECT user_id, user_name, user_email, user_phone, user_role, created_at 
       FROM users 
       WHERE user_id = ?`,
      [id]
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// PUT - Update user (Admin only)
export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    // Verify admin session
    const sessionId = await getSessionId();
    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const currentUser = await verifySession(sessionId);
    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }

    // Check if user exists
    const existingUser = await queryOne(
      'SELECT user_id FROM users WHERE user_id = ?',
      [id]
    );

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    const { user_name, user_email, user_phone, user_role, password } = await request.json();

    // Validation
    if (!user_name || !user_email || !user_role) {
      return NextResponse.json(
        { success: false, message: 'Name, email and role are required' },
        { status: 400 }
      );
    }

    // Check if email already exists (for another user)
    const emailCheck = await query(
      'SELECT user_id FROM users WHERE user_email = ? AND user_id != ?',
      [user_email, id]
    );

    if (emailCheck.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Email already exists' },
        { status: 400 }
      );
    }

    // Validate role
    if (!['admin', 'user'].includes(user_role)) {
      return NextResponse.json(
        { success: false, message: 'Invalid role' },
        { status: 400 }
      );
    }

    // Update user
    if (password) {
      // Update with new password
      const hashedPassword = await hashPassword(password);
      await query(
        `UPDATE users SET 
          user_name = ?, 
          user_email = ?, 
          user_phone = ?, 
          user_role = ?,
          password = ?
         WHERE user_id = ?`,
        [user_name, user_email, user_phone || null, user_role, hashedPassword, id]
      );
    } else {
      // Update without changing password
      await query(
        `UPDATE users SET 
          user_name = ?, 
          user_email = ?, 
          user_phone = ?, 
          user_role = ?
         WHERE user_id = ?`,
        [user_name, user_email, user_phone || null, user_role, id]
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
    });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE - Delete user (Admin only)
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // Verify admin session
    const sessionId = await getSessionId();
    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const currentUser = await verifySession(sessionId);
    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }

    // Prevent self-deletion
    if (currentUser.userId == id) {
      return NextResponse.json(
        { success: false, message: 'Cannot delete your own account' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await queryOne(
      'SELECT user_id FROM users WHERE user_id = ?',
      [id]
    );

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Delete user
    await query('DELETE FROM users WHERE user_id = ?', [id]);

    // Also delete user's sessions
    await query('DELETE FROM sessions WHERE user_id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete user' },
      { status: 500 }
    );
  }
}