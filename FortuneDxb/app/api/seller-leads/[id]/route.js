import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

// Parse the internal_notes column into an array of { text, at } entries.
// Handles: null, empty, JSON array (new format), or legacy plain-text string.
function parseEntries(raw) {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((e) => e && typeof e.text === 'string');
    }
  } catch {
    // fall through to legacy handling
  }
  // legacy single-string note
  return [{ text: String(raw), at: null }];
}

// GET - Single seller lead (notes returned as parsed timeline array)
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const lead = await queryOne(
      'SELECT * FROM seller_leads WHERE seller_lead_id = ?',
      [id]
    );

    if (!lead) {
      return NextResponse.json(
        { success: false, message: 'Seller lead not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...lead,
        timeline: parseEntries(lead.internal_notes),
      },
    });
  } catch (error) {
    console.error('Get seller lead error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch seller lead' },
      { status: 500 }
    );
  }
}

// PUT - Append a new timeline entry to internal_notes
// Body: { note_text: string }
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { note_text } = body;

    if (!note_text || typeof note_text !== 'string' || !note_text.trim()) {
      return NextResponse.json(
        { success: false, message: 'Note text is required' },
        { status: 400 }
      );
    }

    const existing = await queryOne(
      'SELECT internal_notes FROM seller_leads WHERE seller_lead_id = ?',
      [id]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Seller lead not found' },
        { status: 404 }
      );
    }

    const entries = parseEntries(existing.internal_notes);
    entries.push({
      text: note_text.trim(),
      at: new Date().toISOString(),
    });

    const result = await query(
      'UPDATE seller_leads SET internal_notes = ? WHERE seller_lead_id = ?',
      [JSON.stringify(entries), id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: 'Seller lead not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Note added',
      data: { timeline: entries },
    });
  } catch (error) {
    console.error('Add seller lead note error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add note' },
      { status: 500 }
    );
  }
}
