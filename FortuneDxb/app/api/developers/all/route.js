import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

/**
 * GET /api/developers/all - Get ALL developers without pagination
 * Used for dropdowns, selects, etc where you need all records
 */
export async function GET() {
  try {
    const developers = await query(`
      SELECT 
        d.developer_id,
        d.name,
        d.logo_path,
        d.cover_image,
        d.tagline,
        d.description,
        d.established_year,
        d.headquarters,
        d.total_projects,
        d.completed_projects,
        d.ongoing_projects,
        d.awards_count,
        d.countries_present,
        d.is_verified,
        d.website_url,
        d.contact_email,
        d.contact_phone,
        d.contact_phone_ccode,
        d.facebook_url,
        d.instagram_url,
        d.linkedin_url,
        d.youtube_url,
        d.created_at,
        d.updated_at,
        (SELECT COUNT(*) FROM developer_awards WHERE developer_id = d.developer_id) as awards_added
      FROM developers d
      ORDER BY d.name ASC
    `);

    return NextResponse.json({
      success: true,
      data: developers,
    });
  } catch (error) {
    console.error('Get all developers error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch developers' },
      { status: 500 }
    );
  }
}