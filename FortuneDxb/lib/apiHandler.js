import { NextResponse } from 'next/server';

const sentErrors = new Map();
const ERROR_COOLDOWN = 5 * 60 * 1000;

function getErrorHash(error, context) {
  const message = error?.message || String(error);
  const stackLine = error?.stack?.split('\n')[1] || '';
  return `${context}:${message}:${stackLine}`.substring(0, 200);
}

function shouldSend(hash) {
  const last = sentErrors.get(hash);
  return !last || Date.now() - last > ERROR_COOLDOWN;
}

function markSent(hash) {
  sentErrors.set(hash, Date.now());
}

async function sendErrorEmail(error, context) {
  const hash = getErrorHash(error, context);
  if (!shouldSend(hash)) return;

  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/error-notify`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'API_ERROR',
          context,
          message: error?.message || String(error),
          stack: error?.stack,
          time: new Date().toISOString(),
        }),
      }
    );

    markSent(hash);
  } catch (e) {
    console.error('[Error Email] Failed:', e.message);
  }
}

export function apiHandler(handler, options = {}) {
  const { context = 'API' } = options;

  return async (req, ctx) => {
    try {
      return await handler(req, ctx);
    } catch (error) {
      console.error(`[API Error] ${context}`, error);

      // Notify (non-blocking)
      sendErrorEmail(error, context);

      // NEVER exit process here
      return NextResponse.json(
        {
          success: false,
          message: 'Internal server error',
        },
        { status: 500 }
      );
    }
  };
}

export default apiHandler;
export const withRestart = apiHandler;
