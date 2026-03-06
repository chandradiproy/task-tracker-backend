/// <reference path="./types/express.d.ts" />
// src/app.ts
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import taskRoutes from './routes/task.routes';
import { errorHandler } from './middlewares/error.middlware';
import morgan  from 'morgan';

// Initialize express app
const app: Application = express();
// Global Middlewares
app.use(helmet()); // Security headers
app.use(cors()); // Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests
app.use(morgan('dev')); // Logging middleware for development

// Basic Health Check Route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Global Error Handling Middleware (Must be defined after all routes)
app.use(errorHandler);

export default app;