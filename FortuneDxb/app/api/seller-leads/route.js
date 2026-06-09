import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { saveSingleFile, validateFile } from '@/lib/fileUpload';
import { sendMail } from '@/lib/mailer';
import { renderThankYouEmail } from '@/lib/emails/sellerEmails';

// GET - List all seller leads with pagination, sorting and search
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const limit = parseInt(searchParams.get('limit')) || 10;
    const offset = parseInt(searchParams.get('offset')) || 0;
    let sort_by = searchParams.get('sort_by') || 'seller_lead_id';
    let sort_order = (searchParams.get('sort_order') || 'DESC').toUpperCase();

    if (!['ASC', 'DESC'].includes(sort_order)) {
      sort_order = 'DESC';
    }

    const sortMap = {
      seller_lead_id: 'seller_lead_id',
      full_name: 'full_name',
      phone: 'phone',
      email: 'email',
      property_type: 'property_type',
      listing_type: 'listing_type',
      asking_price: 'asking_price',
      submitted_at: 'submitted_at',
    };
    const sortField = sortMap[sort_by] || 'seller_lead_id';

    // Free-text search across key fields
    const search = (searchParams.get('search') || '').trim();
    const whereParts = [];
    const whereParams = [];
    if (search) {
      whereParts.push(
        '(full_name LIKE ? OR email LIKE ? OR phone LIKE ? OR location LIKE ? OR ref_code LIKE ?)'
      );
      const like = `%${search}%`;
      whereParams.push(like, like, like, like, like);
    }
    const whereSql = whereParts.length ? `WHERE ${whereParts.join(' AND ')}` : '';

    const countRows = await query(
      `SELECT COUNT(*) as total FROM seller_leads ${whereSql}`,
      whereParams
    );
    const totalCount = Number(countRows?.[0]?.total || 0);

    const leads = await query(
      `SELECT * FROM seller_leads
       ${whereSql}
       ORDER BY ${sortField} ${sort_order}
       LIMIT ? OFFSET ?`,
      [...whereParams, limit, offset]
    );

    return NextResponse.json({
      success: true,
      data: leads,
      total: totalCount,
    });
  } catch (error) {
    console.error('Get seller leads error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch seller leads' },
      { status: 500 }
    );
  }
}

// POST - Create new seller lead (public submission from /seller wizard)
// Expects multipart/form-data so the optional oqood PDF can come along.
export async function POST(request) {
  try {
    const form = await request.formData();

    const get = (key) => {
      const v = form.get(key);
      return v === null ? '' : String(v);
    };
    const getTrim = (key) => get(key).trim();
    const getNum = (key) => {
      const v = get(key);
      return v === '' ? null : Number(v);
    };

    const email = getTrim('email').toLowerCase();
    const full_name = getTrim('full_name');
    const phone = getTrim('phone');
    const phone_ccode = getTrim('phone_ccode');

    // Basic validation
    if (!full_name) {
      return NextResponse.json(
        { success: false, message: 'Name is required' },
        { status: 400 }
      );
    }
    if (!phone) {
      return NextResponse.json(
        { success: false, message: 'Phone number is required' },
        { status: 400 }
      );
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Valid email address is required' },
        { status: 400 }
      );
    }

    // ── Anti-fake-lead: require a verified OTP row for this email ──
    const otpRow = await queryOne(
      `SELECT otp_id, expires_at FROM seller_otps
       WHERE email = ? AND is_verified = 1
       ORDER BY otp_id DESC LIMIT 1`,
      [email]
    );

    if (!otpRow) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email verification required. Please verify your email with the code sent to you.',
        },
        { status: 403 }
      );
    }

    if (new Date(otpRow.expires_at) < new Date()) {
      return NextResponse.json(
        {
          success: false,
          message: 'Verification has expired. Please request a new code and try again.',
        },
        { status: 410 }
      );
    }

    // ── Oqood PDF (optional) — validate early, save after INSERT ──
    const oqoodFile = form.get('oqood_file');
    const hasOqood = oqoodFile && typeof oqoodFile === 'object' && oqoodFile.size > 0;

    if (hasOqood) {
      const validation = validateFile(oqoodFile, 'oqood');
      if (!validation.valid) {
        return NextResponse.json(
          { success: false, message: validation.error },
          { status: 400 }
        );
      }
      // Magic-byte check — a real PDF starts with "%PDF"
      try {
        const headerBuf = Buffer.from(await oqoodFile.slice(0, 5).arrayBuffer());
        if (headerBuf.toString('utf8', 0, 4) !== '%PDF') {
          return NextResponse.json(
            { success: false, message: 'Uploaded file is not a valid PDF.' },
            { status: 400 }
          );
        }
      } catch (_) {
        // If slice/arrayBuffer fail, fall through — validateFile already passed.
      }
    }

    // ── Collect all other fields ──
    const payload = {
      ref_code: getTrim('ref_code') || null,
      full_name,
      email,
      phone,
      phone_ccode: phone_ccode || null,
      nationality: getTrim('nationality') || null,
      property_type: getTrim('property_type') || null,
      listing_type: getTrim('listing_type') || null,
      offplan_stage: getTrim('offplan_stage') || null,
      ready_occupancy: getTrim('ready_occupancy') || null,
      sell_intent: getTrim('sell_intent') || null,
      original_price: getNum('original_price'),
      asking_price: getNum('asking_price'),
      demand_estimate: getTrim('demand_estimate') || null,
      location: getTrim('location') || null,
      area_sqft: getNum('area_sqft'),
      bedrooms: getTrim('bedrooms') || null,
      bathrooms: getTrim('bathrooms') || null,
      floor_no: getTrim('floor_no') || null,
      notes: getTrim('notes') || null,
      lead_source: getTrim('lead_source') || 'seller_landing',
    };

    // ── INSERT the lead row ──
    const result = await query(
      `INSERT INTO seller_leads
        (ref_code, full_name, email, phone, phone_ccode, nationality,
         property_type, listing_type, offplan_stage, ready_occupancy, sell_intent,
         original_price, asking_price, demand_estimate,
         location, area_sqft, bedrooms, bathrooms, floor_no, notes,
         lead_source)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.ref_code,
        payload.full_name,
        payload.email,
        payload.phone,
        payload.phone_ccode,
        payload.nationality,
        payload.property_type,
        payload.listing_type,
        payload.offplan_stage,
        payload.ready_occupancy,
        payload.sell_intent,
        payload.original_price,
        payload.asking_price,
        payload.demand_estimate,
        payload.location,
        payload.area_sqft,
        payload.bedrooms,
        payload.bathrooms,
        payload.floor_no,
        payload.notes,
        payload.lead_source,
      ]
    );

    const sellerLeadId = result.insertId;

    // ── Save PDF if present, then update row with path/name ──
    if (hasOqood) {
      try {
        const relativePath = await saveSingleFile(oqoodFile, 'oqood', sellerLeadId);
        await query(
          'UPDATE seller_leads SET oqood_file_path = ?, oqood_file_name = ? WHERE seller_lead_id = ?',
          [relativePath, oqoodFile.name || 'document.pdf', sellerLeadId]
        );
      } catch (fileErr) {
        console.error('[seller-leads POST] Oqood save failed:', fileErr);
        // Non-fatal — lead is saved, just without the attachment.
      }
    }

    // ── Consume the OTP row (one-time use) ──
    try {
      await query('DELETE FROM seller_otps WHERE email = ?', [email]);
    } catch (_) {
      // non-fatal
    }

    // ── Send the thank-you email (non-blocking from the client's PoV) ──
    try {
      await sendMail({
        to: email,
        subject: `Thank you for listing with Fortune DXB${payload.ref_code ? ' · ' + payload.ref_code : ''}`,
        html: renderThankYouEmail({
          name: payload.full_name,
          ref_code: payload.ref_code,
          property_type: payload.property_type,
          listing_type: payload.listing_type,
          project_name: getTrim('project_name') || payload.location,
          project_location: payload.location,
          asking_price: payload.asking_price,
          phone_ccode: payload.phone_ccode,
          phone: payload.phone,
        }),
      });
    } catch (mailErr) {
      console.error('[seller-leads POST] Thank-you mail failed:', mailErr);
      // Non-fatal — lead is saved; mail can be resent manually if needed.
    }

    return NextResponse.json({
      success: true,
      message: 'Seller lead submitted successfully',
      data: {
        seller_lead_id: sellerLeadId,
        ref_code: payload.ref_code,
      },
    });
  } catch (error) {
    console.error('Create seller lead error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit seller lead' },
      { status: 500 }
    );
  }
}
