// src/services/task.service.ts
import prisma from '../config/db';

export const createTask = async (userId: string, data: any) => {
  return prisma.task.create({
    data: {
      ...data,
      userId,
    },
  });
};

export const getTasks = async (userId: string, role: string) => {
  // Admin sees all tasks, regular user sees only their own
  const whereClause = role === 'admin' ? {} : { userId };

  return prisma.task.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' }, // Newest first
  });
};

export const updateTask = async (taskId: string, userId: string, role: string, data: any) => {
  const task = await prisma.task.findUnique({ where: { id: taskId } });

  if (!task) {
    const error: any = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }

  // Authorization check: User must own the task, OR be an admin
  if (task.userId !== userId && role !== 'admin') {
    const error: any = new Error('Forbidden: You can only update your own tasks');
    error.statusCode = 403;
    throw error;
  }

  return prisma.task.update({
    where: { id: taskId },
    data,
  });
};

export const deleteTask = async (taskId: string, userId: string, role: string) => {
  const task = await prisma.task.findUnique({ where: { id: taskId } });

  if (!task) {
    const error: any = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }

  // Authorization check: User must own the task, OR be an admin
  if (task.userId !== userId && role !== 'admin') {
    const error: any = new Error('Forbidden: You can only delete your own tasks');
    error.statusCode = 403;
    throw error;
  }

  await prisma.task.delete({
    where: { id: taskId },
  });

  return { message: 'Task deleted successfully' };
};