// app/api/error-notify/route.js
// Sends error notification email

import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/mailer';

export async function POST(request) {
  try {
    const { type, context, message, stack, timestamp } = await request.json();

    // Email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #DC3545; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0;">Server Error Alert</h2>
        </div>
        <div style="background: #f8f9fa; padding: 20px; border: 1px solid #ddd;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; width: 120px;">Error Type:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #DC3545;">${type}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Context:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${context || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Timestamp:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${timestamp}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Message:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #DC3545;">${message}</td>
            </tr>
          </table>
          
          ${stack ? `
          <div style="margin-top: 20px;">
            <h4 style="margin-bottom: 10px;">Stack Trace:</h4>
            <pre style="background: #2d2d2d; color: #f8f8f2; padding: 15px; border-radius: 4px; overflow-x: auto; font-size: 12px;">${stack}</pre>
          </div>
          ` : ''}
          
          <div style="margin-top: 20px; padding: 15px; background: #fff3cd; border-radius: 4px; border-left: 4px solid #ffc107;">
            <strong>Action:</strong> PM2 is automatically restarting the server.
          </div>
        </div>
        <div style="background: #0B1A2A; color: #94A3B8; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px;">
          Fortune DXB - Server Monitoring System
        </div>
      </div>
    `;

    // Send email via shared mailer
    await sendMail({
      to: process.env.ERROR_NOTIFY_EMAIL || process.env.SMTP_USER,
      subject: `Server Error: ${type} - ${message?.substring(0, 50)}...`,
      html: emailHtml,
    });

    console.log('[Error Notify] Email sent successfully');

    return NextResponse.json({ success: true, message: 'Email sent' });
  } catch (error) {
    console.error('[Error Notify] Failed to send email:', error);
    
    // Don't crash here - this is the error handler itself
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}