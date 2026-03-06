// src/routes/task.routes.ts
import { Router } from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/task.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createTaskSchema, updateTaskSchema, taskIdParamSchema } from '../schemas/task.schema';

const router = Router();

// All task routes require authentication
router.use(authenticate);

// POST /tasks -> Create a task
router.post('/', validate(createTaskSchema), createTask);

// GET /tasks -> Get tasks (handles Admin/User visibility via service layer)
router.get('/', getTasks);

// PUT /tasks/:id -> Update a task
router.put('/:id', validate(updateTaskSchema), updateTask);

// DELETE /tasks/:id -> Delete a task
router.delete('/:id', validate(taskIdParamSchema), deleteTask);

export default router;