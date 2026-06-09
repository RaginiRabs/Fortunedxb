import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET - List all leads with pagination and sorting
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const limit = parseInt(searchParams.get('limit')) || 10;
    const offset = parseInt(searchParams.get('offset')) || 0;
    let sort_by = searchParams.get('sort_by') || 'lead_id';
    let sort_order = (searchParams.get('sort_order') || 'DESC').toUpperCase();

    if (!['ASC', 'DESC'].includes(sort_order)) {
      sort_order = 'DESC';
    }

    const sortMap = {
      lead_id: 'lead_id',
      lead_name: 'lead_name',
      lead_phone: 'lead_phone',
      lead_email: 'lead_email',
      project_name: 'project_name',
      lead_source: 'lead_source',
      lead_date: 'lead_date',
    };
    const sortField = sortMap[sort_by] || 'lead_id';

    // Get total count
    const countRows = await query('SELECT COUNT(*) as total FROM project_leads');
    const totalCount = Number(countRows?.[0]?.total || 0);

    const leads = await query(`
      SELECT * FROM project_leads 
      ORDER BY ${sortField} ${sort_order}
      LIMIT ? OFFSET ?
    `, [limit, offset]);

    return NextResponse.json({
      success: true,
      data: leads,
      total: totalCount,
    });
  } catch (error) {
    console.error('Get leads error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

// POST - Create new lead
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      project_id,
      project_name,
      lead_name,
      lead_phone,
      lead_phone_ccode,
      lead_email,
      lead_source,
      comments,
    } = body;

    // Validation
    if (!project_id || !project_name) {
      return NextResponse.json(
        { success: false, message: 'Project ID and name are required' },
        { status: 400 }
      );
    }

    if (!lead_name?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Name is required' },
        { status: 400 }
      );
    }

    if (!lead_phone?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Insert lead with phone country code
    const result = await query(
      `INSERT INTO project_leads 
        (project_id, project_name, lead_name, lead_phone, lead_phone_ccode, lead_email, lead_source, comments)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        project_id,
        project_name,
        lead_name.trim(),
        lead_phone.trim(),
        lead_phone_ccode || null,
        lead_email?.trim() || null,
        lead_source || null,
        comments?.trim() || null,
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Lead submitted successfully',
      data: { lead_id: result.insertId },
    });
  } catch (error) {
    console.error('Create lead error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit lead' },
      { status: 500 }
    );
  }
}