// src/utils/jwt.util.ts
import jwt from 'jsonwebtoken';

// Interface defining the payload structure embedded in our JWT tokens
export interface JwtPayload {
  userId: string;
  role: string;
}

// Helper to reliably get the JWT secret
const getSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not defined.');
  }
  return secret;
};

/**
 * Generates a JSON Web Token for an authenticated user.
 * @param payload The data to embed in the token (e.g., userId and role).
 * @returns The signed JWT string.
 */
export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, getSecret(), {
    expiresIn: '24h', // Token valid for 24 hours
  });
};

/**
 * Verifies a JSON Web Token and extracts its payload.
 * @param token The JWT string to verify.
 * @returns The decoded payload if valid, otherwise throws an error.
 */
export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, getSecret()) as JwtPayload;
};