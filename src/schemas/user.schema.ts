// src/schemas/user.schema.ts
import { z } from 'zod';

// Reusable schema to validate user ID in params (e.g., DELETE /users/:id)
export const userIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid('User ID must be a valid UUID'),
  }),
});