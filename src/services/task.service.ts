// src/services/task.service.ts
import prisma from '../config/db';

export const createTask = async (creatorId: string, creatorRole: string, data: any) => {
  // If an admin provides a userId, assign the task to that user. Otherwise fallback to the creator.
  const targetUserId = (creatorRole === 'admin' && data.userId) ? data.userId : creatorId;
  const { userId, ...taskData } = data;

  return prisma.task.create({
    data: {
      ...taskData,
      userId: targetUserId,
    },
  });
};

export const getTasks = async (userId: string, role: string) => {
  const whereClause = role === 'admin' ? {} : { userId };

  return prisma.task.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
    include: {
      // Joins the User table to return name/email so the frontend can display the assignee
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      }
    }
  });
};

export const updateTask = async (taskId: string, requesterId: string, role: string, data: any) => {
  const task = await prisma.task.findUnique({ where: { id: taskId } });

  if (!task) {
    const error: any = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }

  // Authorization check: User must own the task, OR be an admin
  if (task.userId !== requesterId && role !== 'admin') {
    const error: any = new Error('Forbidden: You can only update your own tasks');
    error.statusCode = 403;
    throw error;
  }

  // Prevent non-admins from changing the assignee
  const updateData = { ...data };
  if (updateData.userId && role !== 'admin') {
     delete updateData.userId;
  }

  return prisma.task.update({
    where: { id: taskId },
    data: updateData,
    include: {
      user: {
        select: { name: true, email: true }
      }
    }
  });
};

export const deleteTask = async (taskId: string, userId: string, role: string) => {
  const task = await prisma.task.findUnique({ where: { id: taskId } });

  if (!task) {
    const error: any = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }

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