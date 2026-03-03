import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoute from './routes/contactRoute.js';
import { rateLimitMiddleware } from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : NODE_ENV === 'production'
    ? ['https://your-domain.com']
    : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5000'];

app.use(cors({
  origin: ALLOWED_ORIGINS,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(rateLimitMiddleware(5, 60000));

app.get('/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    environment: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

app.use('/api/contact', contactRoute);

app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Route not found' 
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  const statusCode = err.statusCode || 500;
  const message = NODE_ENV === 'production' 
    ? 'Internal server error' 
    : err.message;
  res.status(statusCode).json({ 
    success: false,
    error: message 
  });
});

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Environment: ${NODE_ENV}`);
  console.log(`✓ Endpoint: POST /api/contact`);
  console.log(`✓ Rate limit: 5 requests per minute`);
  if (NODE_ENV === 'production') {
    console.log(`✓ Allowed origins: ${ALLOWED_ORIGINS.join(', ')}`);
  }
});

export default app;
