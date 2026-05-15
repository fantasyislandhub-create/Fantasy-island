const cron = require('node-cron');
const http = require('http');
const https = require('https');

const SELF_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 5000}`;
const PING_ENDPOINT = `${SELF_URL}/health`;
const SLOW_THRESHOLD_MS = 3000; // warn if response takes longer than 3s

let stats = { pings: 0, failures: 0, lastPing: null, lastStatus: null };

const ping = () => {
  const start = Date.now();
  const client = PING_ENDPOINT.startsWith('https') ? https : http;

  const req = client.get(PING_ENDPOINT, (res) => {
    const elapsed = Date.now() - start;
    stats.pings++;
    stats.lastPing = new Date().toISOString();
    stats.lastStatus = res.statusCode;

    if (res.statusCode !== 200) {
      console.warn(`[KEEP-ALIVE] ⚠ Unexpected status ${res.statusCode} (${elapsed}ms)`);
      stats.failures++;
    } else if (elapsed > SLOW_THRESHOLD_MS) {
      console.warn(`[KEEP-ALIVE] 🐢 Slow response: ${elapsed}ms`);
    }
    // Drain response to free socket
    res.resume();
  });

  req.on('error', (err) => {
    stats.failures++;
    stats.lastStatus = 'error';
    console.error(`[KEEP-ALIVE] ✗ Ping failed: ${err.message}`);
  });

  req.setTimeout(10000, () => {
    stats.failures++;
    stats.lastStatus = 'timeout';
    console.error('[KEEP-ALIVE] ✗ Ping timed out after 10s');
    req.destroy();
  });
};

const startKeepAlive = () => {
  // Only run in production (Render spins down free tier services)
  if (process.env.NODE_ENV !== 'production') return;

  console.log(`[KEEP-ALIVE] Started — pinging ${PING_ENDPOINT} every 14 minutes`);

  // Every 14 minutes (Render free tier sleeps after 15min of inactivity)
  cron.schedule('*/14 * * * *', ping);

  // Log uptime stats every hour
  cron.schedule('0 * * * *', () => {
    const uptime = stats.pings > 0
      ? (((stats.pings - stats.failures) / stats.pings) * 100).toFixed(1)
      : '0';
    console.log(`[KEEP-ALIVE] Stats — pings: ${stats.pings} | failures: ${stats.failures} | uptime: ${uptime}% | last: ${stats.lastPing}`);
  });
};

module.exports = { startKeepAlive, getStats: () => ({ ...stats }) };
