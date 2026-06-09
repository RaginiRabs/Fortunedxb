import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { getSessionId, verifySession } from '@/lib/session';

// GET - List all users with pagination and sorting (Admin only)
export async function GET(request) {
  try {
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

    const { searchParams } = new URL(request.url);

    const limit = parseInt(searchParams.get('limit')) || 10;
    const offset = parseInt(searchParams.get('offset')) || 0;
    let sort_by = searchParams.get('sort_by') || 'user_id';
    let sort_order = (searchParams.get('sort_order') || 'DESC').toUpperCase();

    if (!['ASC', 'DESC'].includes(sort_order)) {
      sort_order = 'DESC';
    }

    const sortMap = {
      user_id: 'user_id',
      user_name: 'user_name',
      user_email: 'user_email',
      user_phone: 'user_phone',
      user_role: 'user_role',
      created_at: 'created_at',
    };
    const sortField = sortMap[sort_by] || 'user_id';

    // Get total count
    const countRows = await query('SELECT COUNT(*) as total FROM users');
    const totalCount = Number(countRows?.[0]?.total || 0);

    // Get all users (exclude password) with pagination and sorting
    const users = await query(
      `SELECT user_id, user_name, user_email, user_phone, user_role, created_at 
       FROM users 
       ORDER BY ${sortField} ${sort_order}
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    return NextResponse.json({
      success: true,
      data: users,
      total: totalCount,
    });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST - Create new user (Admin only)
export async function POST(request) {
  try {
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

    const { user_name, user_email, user_phone, user_role, password } = await request.json();

    // Validation
    if (!user_name || !user_email || !user_role || !password) {
      return NextResponse.json(
        { success: false, message: 'Name, email, role and password are required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await query(
      'SELECT user_id FROM users WHERE user_email = ?',
      [user_email]
    );

    if (existingUser.length > 0) {
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

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Insert user
    const result = await query(
      `INSERT INTO users (user_name, user_email, user_phone, user_role, password)
       VALUES (?, ?, ?, ?, ?)`,
      [user_name, user_email, user_phone || null, user_role, hashedPassword]
    );

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      data: { user_id: result.insertId },
    });
  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create user' },
      { status: 500 }
    );
  }
}