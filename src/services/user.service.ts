// src/services/user.service.ts
import prisma from '../config/db';
import { hashPassword } from '../utils/hash.util';

export const getUserProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      // Intentionally excluding password
    },
  });

  if (!user) {
    const error: any = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  return user;
};

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const updateUser = async (targetUserId: string, requesterId: string, requesterRole: string, data: any) => {
  // 1. Authorization: Users can only edit themselves unless they are an admin
  if (requesterRole !== 'admin' && requesterId !== targetUserId) {
    const error: any = new Error('Forbidden: You can only update your own profile');
    error.statusCode = 403;
    throw error;
  }

  // 2. Authorization: Only admins can change roles
  if (data.role && requesterRole !== 'admin') {
    const error: any = new Error('Forbidden: Only admins can update user roles');
    error.statusCode = 403;
    throw error;
  }

  // 3. Verify user exists
  const existingUser = await prisma.user.findUnique({ where: { id: targetUserId } });
  if (!existingUser) {
    const error: any = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  // 4. Hash the new password if it is being updated
  const updateData = { ...data };
  if (updateData.password) {
    updateData.password = await hashPassword(updateData.password);
  }

  // 5. Update user and return without password
  return prisma.user.update({
    where: { id: targetUserId },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const deleteUser = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  
  if (!user) {
    const error: any = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  await prisma.user.delete({
    where: { id: userId },
  });

  return { message: 'User deleted successfully' };
};