// src/config/db.ts
import { PrismaClient } from '@prisma/client';

// Initialize a single Prisma Client instance to be used across the application.
// This prevents connection exhaustion issues.
const prisma = new PrismaClient();

export default prisma;