// db.js - Complete with Error Handling
import mysql from 'mysql2/promise';

const globalForDb = globalThis;

// Pool configuration
const poolConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',   
  database: process.env.DB_NAME || 'fortunedxb',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
};

// Create pool function
function createPool() {
  const pool = mysql.createPool(poolConfig);
  console.log('[DB] Pool initialized');
  return pool;
}

// Get or create pool (singleton pattern for Next.js)
function getPool() {
  if (!globalForDb.dbPool) {
    globalForDb.dbPool = createPool();
  }
  return globalForDb.dbPool;
}

// Initialize pool
if (!globalForDb.dbPool) {
  globalForDb.dbPool = createPool();
}

// Keep connections alive (every 3 min)
if (!globalForDb.dbKeepAlive) {
  globalForDb.dbKeepAlive = setInterval(async () => {
    try {
      const pool = getPool();
      await pool.query('SELECT 1');
    } catch (err) {
      console.error('[DB] Keep-alive failed:', err.message);
      globalForDb.dbPool = null;
    }
  }, 3 * 60 * 1000);
}

// Fatal errors - should restart server
const FATAL_ERRORS = [
  'ECONNREFUSED',
  'ER_ACCESS_DENIED_ERROR',
  'ER_BAD_DB_ERROR',
  'ER_DBACCESS_DENIED_ERROR',
];

// Reconnectable errors
const RECONNECT_ERRORS = [
  'PROTOCOL_CONNECTION_LOST',
  'ECONNRESET',
  'ETIMEDOUT',
  'EPIPE',
];

// Query function with error handling
export const query = async (sql, params = []) => {
  const pool = getPool();

  try {
    const [rows] = await pool.query(sql, params);
    return rows;
  } catch (err) {
    console.error('[DB] Query Error:', err.code, err.message);

    // Fatal error - crash for PM2 restart
    if (FATAL_ERRORS.includes(err.code)) {
      console.error('[FATAL] Database unreachable - Server restarting...');
      process.exit(1);
    }

    // Reconnectable error - destroy pool for recreation
    if (RECONNECT_ERRORS.includes(err.code)) {
      console.log('[DB] Connection lost, will recreate pool...');
      globalForDb.dbPool = null;
    }

    throw err;
  }
};

// Query single row
export const queryOne = async (sql, params = []) => {
  const rows = await query(sql, params);
  return rows[0] || null;
};

// Graceful Shutdown
if (!globalForDb.shutdownHandler) {
  globalForDb.shutdownHandler = true;

  const shutdown = async (signal) => {
    console.log(`[Server] ${signal} received, shutting down...`);

    try {
      if (globalForDb.dbPool) {
        await globalForDb.dbPool.end();
        console.log('[DB] Pool closed');
      }
    } catch (err) {
      console.error('[DB] Error closing pool:', err.message);
    }

    process.exit(0);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

console.log('[DB] Error handlers registered');

export default getPool();