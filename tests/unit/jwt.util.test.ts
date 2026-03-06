import { generateToken, verifyToken } from '../../src/utils/jwt.util';

describe('JWT Utility', () => {
  beforeAll(() => {
    process.env.JWT_SECRET = 'test_secret_key';
  });

  // Unit Test 4
  it('should generate a valid JWT and verify its payload', () => {
    const payload = { userId: '12345', role: 'admin' };
    
    const token = generateToken(payload);
    expect(typeof token).toBe('string');

    const decoded = verifyToken(token);
    expect(decoded.userId).toBe(payload.userId);
    expect(decoded.role).toBe(payload.role);
  });
});