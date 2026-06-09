import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET - Fetch 4 verified developers for popular searches
export async function GET() {
  try {
    const developers = await query(
      `SELECT name FROM developers 
       WHERE is_verified = 1 
       ORDER BY total_projects DESC, created_at DESC 
       LIMIT 7`
    );

    return NextResponse.json({
      success: true,
      data: developers.map((d) => d.name),
    });
  } catch (error) {
    console.error('Fetch popular developers error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch popular developers' },
      { status: 500 }
    );
  }
}