import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import { API_PREFIX } from '@vlab/shared';
import { config } from './config.js';
import { errorHandler, NotFoundError } from './middleware/errorHandler.js';
import apiRouter from './routes/index.js';
import { setupSwagger } from './swagger.js';

export function createApp(): Express {
  const app = express();

  // Security & standard middlewares
  app.use(helmet({
    contentSecurityPolicy: false // Allows Swagger UI assets
  }));

  app.use(cors({
    origin: config.corsOrigin === '*' ? '*' : [config.corsOrigin, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  app.use(express.json({ limit: '2mb' }));

  // Swagger Documentation
  setupSwagger(app);

  // Mount API prefix
  app.use(API_PREFIX, apiRouter);

  // 404 handler for unknown routes
  app.use((req, _res, next) => {
    next(new NotFoundError(`Endpoint not found: ${req.method} ${req.originalUrl}`));
  });

  // Centralized Error Handler
  app.use(errorHandler);

  return app;
}
