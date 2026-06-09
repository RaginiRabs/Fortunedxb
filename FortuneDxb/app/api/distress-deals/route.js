import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET - Public distress deals
// Projects flagged is_distress_deal = 1, each joined with its latest offer + first gallery image.
export async function GET() {
  try {
    const projects = await query(
      `SELECT p.*, d.name AS developer_name
       FROM project_details p
       LEFT JOIN developers d ON p.developer_id = d.developer_id
       WHERE p.is_distress_deal = 1
       ORDER BY p.project_id DESC`
    );

    const data = await Promise.all(projects.map(async (p) => {
      // Latest offer for this project (deal text + expiry)
      const offerRows = await query(
        `SELECT offer_id, title, description, expiry_date, has_expiry
         FROM project_offers
         WHERE project_id = ?
         ORDER BY offer_id DESC
         LIMIT 1`,
        [p.project_id]
      );

      // Gallery images for the card (same shape as /api/projects)
      const galleryFiles = await query(
        `SELECT file_id, file_name, file_path, file_type
         FROM project_files
         WHERE project_id = ? AND file_type = 'gallery'
         ORDER BY file_id ASC`,
        [p.project_id]
      );

      return {
        ...p,
        configurations: p.configurations ? JSON.parse(p.configurations) : [],
        highlights: p.highlights ? JSON.parse(p.highlights) : [],
        amenities: p.amenities ? JSON.parse(p.amenities) : [],
        gallery: galleryFiles,
        offer: offerRows?.[0] || null,
      };
    }));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Get distress deals error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch distress deals' },
      { status: 500 }
    );
  }
}
