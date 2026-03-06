// src/schemas/auth.schema.ts
import { z } from 'zod';

// Zod schema for POST /auth/register
export const registerSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' })
      .email('Invalid email address format'),
    password: z.string({ required_error: 'Password is required' })
      .min(6, 'Password must be at least 6 characters long'),
    // Role is optional on registration. The default will be "user" handled by the DB.
    // We allow passing "admin" solely for testing the assignment's admin features easily.
    role: z.enum(['user', 'admin']).optional(),
  }),
});

// Zod schema for POST /auth/login
export const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' })
      .email('Invalid email address format'),
    password: z.string({ required_error: 'Password is required' })
      .min(1, 'Password cannot be empty'),
  }),
});