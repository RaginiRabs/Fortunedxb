import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET - Fetch all verified developers
export async function GET() {
  try {
    const developers = await query(
      `SELECT 
        developer_id,
        name,
        logo_path,
        description,
        total_projects
       FROM developers 
       WHERE is_verified = 1 
       ORDER BY total_projects DESC, created_at DESC`
    );

    return NextResponse.json({
      success: true,
      data: developers,
    });
  } catch (error) {
    console.error('Fetch verified developers error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch verified developers' },
      { status: 500 }
    );
  }
}