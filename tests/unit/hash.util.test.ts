import { hashPassword, comparePassword } from '../../src/utils/hash.util';

describe('Hash Utility', () => {
  // Unit Test 1
  it('should hash a password into a different string', async () => {
    const plainText = 'mySecretPassword';
    const hashed = await hashPassword(plainText);
    
    expect(hashed).toBeDefined();
    expect(hashed).not.toBe(plainText);
  });

  // Unit Test 2
  it('should correctly verify a matching password', async () => {
    const plainText = 'mySecretPassword';
    const hashed = await hashPassword(plainText);
    
    const isMatch = await comparePassword(plainText, hashed);
    expect(isMatch).toBe(true);
  });

  // Unit Test 3
  it('should reject an incorrect password', async () => {
    const plainText = 'mySecretPassword';
    const hashed = await hashPassword(plainText);
    
    const isMatch = await comparePassword('wrongPassword', hashed);
    expect(isMatch).toBe(false);
  });
});