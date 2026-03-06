// src/routes/user.routes.ts
import { Router } from 'express';
import { getProfile, getAllUsers, deleteUser } from '../controllers/user.controller';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { userIdParamSchema } from '../schemas/user.schema';

const router = Router();

// Apply authentication to all user routes
router.use(authenticate);

// GET /users/me -> Any authenticated user can view their own profile
router.get('/me', getProfile);

// GET /users -> Only 'admin' can view all users
router.get('/', authorizeRoles('admin'), getAllUsers);

// DELETE /users/:id -> Only 'admin' can delete users
router.delete('/:id', authorizeRoles('admin'), validate(userIdParamSchema), deleteUser);

export default router;