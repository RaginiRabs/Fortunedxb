import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { withRestart } from '@/lib/apiHandler';

// GET - Fetch only featured projects with pagination and gallery images
async function getHandler(request) {
  const { searchParams } = new URL(request.url);

  // Query parameters
  const status = searchParams.get('status');
  const limit = parseInt(searchParams.get('limit')) || 8;
  const offset = parseInt(searchParams.get('offset')) || 0;

  try {
    // Base SQL query - Only featured projects
    let sql = `
      SELECT 
        p.*,
        d.name as developer_name
      FROM project_details p
      LEFT JOIN developers d ON p.developer_id = d.developer_id
      WHERE p.featured = 1 AND p.is_distress_deal = 0
    `;

    const params = [];

    // Add status filter if provided
    if (status) {
      sql += ' AND p.project_status = ?';
      params.push(status);
    }

    // Get total count for pagination
    const countSql = sql.replace(/SELECT[\s\S]*?FROM/, 'SELECT COUNT(*) as total FROM');
    const countRows = await query(countSql, params);
    const totalCount = Number(countRows?.[0]?.total || 0);

    // Add ordering and pagination
    sql += ' ORDER BY p.project_id DESC';
    sql += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    // Execute query
    const projects = await query(sql, params);

    // Parse JSON fields + Fetch gallery images for each project
    const parsedProjects = await Promise.all(projects.map(async (p) => {
      const parsed = {
        ...p,
        configurations: p.configurations ? JSON.parse(p.configurations) : [],
        highlights: p.highlights ? JSON.parse(p.highlights) : [],
        amenities: p.amenities ? JSON.parse(p.amenities) : [],
        faqs: p.faqs ? JSON.parse(p.faqs) : [],
        nearby_locations: p.nearby_locations ? JSON.parse(p.nearby_locations) : [],
      };

      // Fetch gallery images
      const galleryFiles = await query(
        `SELECT file_id, file_name, file_path, file_type 
         FROM project_files 
         WHERE project_id = ? AND file_type = 'gallery'
         ORDER BY file_id ASC`,
        [p.project_id]
      );

      parsed.gallery = galleryFiles;

      return parsed;
    }));

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = Math.floor(offset / limit) + 1;
    const hasNext = offset + limit < totalCount;
    const hasPrev = offset > 0;

    return NextResponse.json({
      success: true,
      data: parsedProjects,
      pagination: {
        total: totalCount,
        current_page: currentPage,
        per_page: limit,
        total_pages: totalPages,
        has_next: hasNext,
        has_prev: hasPrev,
      },
      filters_applied: {
        status: status || null,
        limit,
        offset,
      }
    });

  } catch (error) {
    console.error('Featured projects API error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch featured projects' },
      { status: 500 }
    );
  }
}

// Export with restart wrapper
export const GET = withRestart(getHandler);