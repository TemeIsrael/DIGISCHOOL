import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { requestId } from './middlewares/requestId';
import { errorHandler } from './middlewares/error';
import { env } from './config/env';

// Import Routers
import authRouter from './modules/auth';
import studentsRouter from './modules/students';
import adminsRouter from './modules/admins';
import personnelRouter from './modules/personnel';
import academicRouter from './modules/academic';
import evaluationsRouter from './modules/evaluations';
import paymentsRouter from './modules/payments';
import messagesRouter from './modules/messages';
import disciplineRouter from './modules/discipline';
import libraryRouter from './modules/library';
import statsRouter from './modules/stats';
import auditRouter from './modules/audit';
import filesRouter from './modules/files';
import refsRouter from './modules/refs';

const app = express();

// Apply Security and Global Middlewar
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:5173',
        'https://digischool-iota.vercel.app',
        'https://digischool-app.vercel.app',
      ];
      if (env.FRONT_URL) {
        allowedOrigins.push(env.FRONT_URL);
      }
      
      if (!origin || allowedOrigins.includes(origin) || (origin && origin.endsWith('.vercel.app'))) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  })
);
app.set('trust proxy', 1); // Trust first proxy (Render)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ...
app.use('/uploads', express.static(path.resolve(process.cwd(), env.UPLOAD_DIR)));

// Inside PublicNavbar component, retrieve user and generate navLinks accordingly

app.use(requestId);

if (env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health Check
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

// Composed Modular Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/students', studentsRouter);
app.use('/api/v1/admins', adminsRouter);
app.use('/api/v1/personnel', personnelRouter);
app.use('/api/v1/academic', academicRouter);
app.use('/api/v1/evaluations', evaluationsRouter);
app.use('/api/v1/payments', paymentsRouter);
app.use('/api/v1/messages', messagesRouter);
app.use('/api/v1/discipline', disciplineRouter);
app.use('/api/v1/library', libraryRouter);
app.use('/api/v1/stats', statsRouter);
app.use('/api/v1/audit', auditRouter);
app.use('/api/v1/files', filesRouter);
app.use('/api/v1/refs', refsRouter);

// Global Error Handler
app.use(errorHandler);

export default app;
