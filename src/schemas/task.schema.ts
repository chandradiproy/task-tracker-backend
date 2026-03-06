// src/schemas/task.schema.ts
import { z } from 'zod';

// Zod schema for POST /tasks
export const createTaskSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Task title is required' })
      .min(1, 'Task title cannot be empty'),
    description: z.string().optional(),
    status: z.enum(['pending', 'completed']).optional(),
    userId: z.string().uuid('Invalid User ID format').optional(), // Allow admin to assign tasks
  }),
});

export const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Task title cannot be empty').optional(),
    description: z.string().optional(),
    status: z.enum(['pending', 'completed']).optional(),
    userId: z.string().uuid('Invalid User ID format').optional(), // Allow admin to re-assign
  }),
  params: z.object({
    id: z.string().uuid('Task ID must be a valid UUID'),
  }),
});

// Reusable schema to validate task ID in params (e.g., GET /tasks/:id, DELETE /tasks/:id)
export const taskIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid('Task ID must be a valid UUID'),
  }),
});