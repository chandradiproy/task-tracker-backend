import request from 'supertest';
import app from '../../src/app';
import prisma from '../../src/config/db';

// Mock the Prisma Client to avoid writing to the database during API tests
jest.mock('../../src/config/db', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}));

describe('Auth API Endpoints', () => {
  beforeAll(() => {
    process.env.JWT_SECRET = 'test_secret_key';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // API Test 1
  it('POST /auth/register - should register a new user and return 201', async () => {
    const mockUser = {
      id: 'uuid-1234',
      email: 'newuser@example.com',
      password: 'hashedPassword123',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Mock DB to simulate user not existing, then successfully creating
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app)
      .post('/auth/register')
      .send({
        email: 'newuser@example.com',
        password: 'securePassword123',
      });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.data.user.email).toBe('newuser@example.com');
    // Ensure password is not exposed in the response
    expect(response.body.data.user.password).toBeUndefined();
  });

  // API Test 2
  it('POST /auth/login - should fail with 401 for unregistered email', async () => {
    // Mock DB to simulate user not found
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'somePassword',
      });

    expect(response.status).toBe(401);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('Invalid email or password');
  });
});