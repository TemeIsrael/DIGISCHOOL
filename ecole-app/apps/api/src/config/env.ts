import { z } from 'zod';
import dotenv from 'dotenv';

import path from 'path';
// Load from apps/api/.env (one level above src/)
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform((val) => parseInt(val, 10)).default('4001'),
  DB_HOST: z.string().default('163.123.183.89'),
  DB_PORT: z.string().transform((val) => parseInt(val, 10)).default('3306'),
  DB_NAME: z.string().default('ecole2026'),
  DB_USER: z.string().default('root'),
  DB_PASSWORD: z.string().default(''),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_TTL: z.string().default('15m'),
  JWT_REFRESH_TTL: z.string().default('7d'),
  BCRYPT_ROUNDS: z.string().transform((val) => parseInt(val, 10)).default('12'),
  UPLOAD_DIR: z.string().default('./uploads'),
  MAX_UPLOAD_MB: z.string().transform((val) => parseInt(val, 10)).default('10'),
  FRONT_URL: z.string().url().default('http://localhost:5173'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'http', 'debug']).default('info'),
  VITE_API_URL: z.string().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional()
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment configuration:', _env.error.format());
  process.exit(1);
}

export const env = _env.data;
