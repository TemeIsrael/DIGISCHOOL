import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { requestId } from './middlewares/requestId';
import { errorHandler } from './middlewares/error';

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
    origin: [
      'http://localhost:5173',
      'https://digischool-iota.vercel.app'
    ],
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
