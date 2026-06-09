import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET - List all offers with pagination and sorting
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const limit = parseInt(searchParams.get('limit')) || 10;
    const offset = parseInt(searchParams.get('offset')) || 0;
    let sort_by = searchParams.get('sort_by') || 'offer_id';
    let sort_order = (searchParams.get('sort_order') || 'DESC').toUpperCase();

    if (!['ASC', 'DESC'].includes(sort_order)) {
      sort_order = 'DESC';
    }

    const sortMap = {
      offer_id: 'o.offer_id',
      title: 'o.title',
      project_name: 'p.project_name',
      description: 'o.description',
      expiry_date: 'o.expiry_date',
      created_at: 'o.created_at',
    };
    const sortField = sortMap[sort_by] || 'o.offer_id';

    // Get total count
    const countRows = await query('SELECT COUNT(*) as total FROM project_offers');
    const totalCount = Number(countRows?.[0]?.total || 0);

    const offers = await query(`
      SELECT 
        o.*,
        p.project_name
      FROM project_offers o
      LEFT JOIN project_details p ON o.project_id = p.project_id
      ORDER BY ${sortField} ${sort_order}
      LIMIT ? OFFSET ?
    `, [limit, offset]);

    return NextResponse.json({
      success: true,
      data: offers,
      total: totalCount,
    });
  } catch (error) {
    console.error('Get offers error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch offers' },
      { status: 500 }
    );
  }
}

// POST - Create new offer
export async function POST(request) {
  try {
    const body = await request.json();
    const { project_id, title, description, expiry_date, has_expiry } = body;

    if (!project_id || !title) {
      return NextResponse.json(
        { success: false, message: 'Project and title are required' },
        { status: 400 }
      );
    }

    const hasExpiry = has_expiry ? 1 : 0;

    const result = await query(
      `INSERT INTO project_offers (project_id, title, description, expiry_date, has_expiry)
       VALUES (?, ?, ?, ?, ?)`,
      [project_id, title, description || null, hasExpiry ? (expiry_date || null) : null, hasExpiry]
    );

    return NextResponse.json({
      success: true,
      message: 'Offer created successfully',
      data: { offer_id: result.insertId },
    });
  } catch (error) {
    console.error('Create offer error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create offer' },
      { status: 500 }
    );
  }
}