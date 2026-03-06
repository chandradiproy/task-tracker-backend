// src/routes/auth.routes.ts
import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { registerSchema, loginSchema } from '../schemas/auth.schema';

const router = Router();

// POST /auth/register
// 1. Validates the request body against registerSchema
// 2. Passes to the controller if valid
router.post('/register', validate(registerSchema), register);

// POST /auth/login
// 1. Validates the request body against loginSchema
// 2. Passes to the controller if valid
router.post('/login', validate(loginSchema), login);

export default router;