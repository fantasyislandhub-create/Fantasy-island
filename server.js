const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');

const errorHandler = require('./middleware/errorHandler');
const runSeeds = require('./utils/seed');

// ─── Config ──────────────────────────────────────────────
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ─── Security & Parsing ─────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Logging ─────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

const path = require('path');

// ─── Routes ──────────────────────────────────────────────
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/suites', require('./routes/suiteRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));

// ─── Production Configuration ────────────────────────────
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the Frontend build folder
  app.use(express.static(path.join(__dirname, '../Fantasy/dist')));

  // Handle SPA routing
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../Fantasy', 'dist', 'index.html'));
  });
} else {
  // ─── Health Check (Dev Only) ───────────────────────────
  app.get('/', (req, res) => {
    res.json({ 
      message: 'Fantasy Island API is running',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    });
  });
}

// ─── 404 Handler ─────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ─── Centralized Error Handler ───────────────────────────
app.use(errorHandler);

// ─── Database & Server Start ─────────────────────────────
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fantasy_island')
  .then(async () => {
    console.log('[DB] MongoDB Connected');
    await runSeeds();

    app.listen(PORT, () => {
      console.log(`[SERVER] Running on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
    });
  })
  .catch(err => {
    console.error('[DB] Connection Error:', err.message);
    process.exit(1);
  });

// ─── Graceful Shutdown ───────────────────────────────────
process.on('SIGTERM', async () => {
  console.log('[SERVER] SIGTERM received. Shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});

process.on('unhandledRejection', (err) => {
  console.error('[FATAL] Unhandled Rejection:', err.message);
  process.exit(1);
});
