// src/schemas/user.schema.ts
import { z } from 'zod';

// Reusable schema to validate user ID in params (e.g., DELETE /users/:id)
export const userIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid('User ID must be a valid UUID'),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().uuid('User ID must be a valid UUID'),
  }),
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters long').optional(),
    email: z.string().email('Invalid email address format').optional(),
    password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
    role: z.enum(['user', 'admin']).optional(),
  }).refine((data) => Object.keys(data).length > 0, {
    message: "At least one field (name, email, password, or role) must be provided to update",
  }),
});