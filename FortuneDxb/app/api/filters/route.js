import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET - Fetch unique filter options (localities, highlights)
export async function GET(request) {
  try {
    // Get unique localities
    const localitiesResult = await query(
      `SELECT DISTINCT locality 
       FROM project_details 
       WHERE locality IS NOT NULL AND locality != '' 
       ORDER BY locality ASC`
    );

    // Get all highlights (stored as JSON array in DB)
    const highlightsResult = await query(
      `SELECT highlights 
       FROM project_details 
       WHERE highlights IS NOT NULL AND highlights != ''`
    );

    // Parse and get unique highlights
    const allHighlights = new Set();
    highlightsResult.forEach((row) => {
      try {
        const parsed = typeof row.highlights === 'string' 
          ? JSON.parse(row.highlights) 
          : row.highlights;
        
        if (Array.isArray(parsed)) {
          parsed.forEach((h) => {
            if (h && typeof h === 'string') {
              allHighlights.add(h.trim());
            } else if (h && typeof h === 'object' && h.text) {
              allHighlights.add(h.text.trim());
            }
          });
        }
      } catch (e) {
        // Skip invalid JSON
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        localities: localitiesResult.map((r) => r.locality),
        highlights: Array.from(allHighlights).sort(),
      },
    });
  } catch (error) {
    console.error('Get filters error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch filters' },
      { status: 500 }
    );
  }
}