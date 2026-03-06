// src/types/express.d.ts
import { JwtPayload } from '../utils/jwt.util';

// Extend the Express Request interface to include our decoded JWT payload
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}