// src/services/auth.service.ts
import prisma from '../config/db';
import { hashPassword, comparePassword } from '../utils/hash.util';
import { generateToken } from '../utils/jwt.util';

export const registerUser = async (data: any) => {
  const { email, password, role } = data;

  // 1. Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    const error: any = new Error('Email is already registered');
    error.statusCode = 409; // Conflict
    throw error;
  }

  // 2. Hash the password
  const hashedPassword = await hashPassword(password);

  // 3. Create the user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      ...(role && { role }), // Include role if provided, otherwise Prisma uses default "user"
    },
  });

  // Exclude password from the returned user object
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const loginUser = async (data: any) => {
  const { email, password } = data;

  // 1. Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    const error: any = new Error('Invalid email or password');
    error.statusCode = 401; // Unauthorized
    throw error;
  }

  // 2. Compare passwords
  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    const error: any = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  // 3. Generate JWT Token
  const token = generateToken({ userId: user.id, role: user.role });

  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};