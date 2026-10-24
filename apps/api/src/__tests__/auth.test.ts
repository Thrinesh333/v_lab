import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';
import { createApp } from '../app.js';
import { prisma } from '../db.js';

describe('Auth Endpoints & Role Guard', () => {
  const app = createApp();
  const testStudentEmail = `test.student.${Date.now()}@vlab.edu`;
  const testTeacherEmail = `test.teacher.${Date.now()}@vlab.edu`;
  let studentToken = '';
  let teacherToken = '';

  beforeAll(async () => {
    // Ensure DB is accessible
    await prisma.$connect();
  });

  it('POST /api/v1/auth/register - successfully registers student', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: testStudentEmail,
        password: 'Password123!',
        name: 'Test Student',
        role: 'student'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.email).toBe(testStudentEmail.toLowerCase());
    expect(res.body.user.role).toBe('student');
    expect(res.body.user).not.toHaveProperty('passwordHash');

    studentToken = res.body.token;
  });

  it('POST /api/v1/auth/register - rejects registration with short password', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'invalid@vlab.edu',
        password: '123',
        name: 'Short Pass'
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('POST /api/v1/auth/register - rejects duplicate email with 409', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: testStudentEmail,
        password: 'Password123!',
        name: 'Duplicate Student'
      });

    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe('EMAIL_TAKEN');
  });

  it('POST /api/v1/auth/login - successfully logs in', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testStudentEmail,
        password: 'Password123!'
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe(testStudentEmail.toLowerCase());
  });

  it('POST /api/v1/auth/login - rejects wrong password with 401', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testStudentEmail,
        password: 'WrongPassword!'
      });

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('INVALID_CREDENTIALS');
  });

  it('GET /api/v1/auth/me - returns user profile with valid Bearer token', async () => {
    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.email).toBe(testStudentEmail.toLowerCase());
  });

  it('GET /api/v1/auth/me - rejects request without token with 401', async () => {
    const res = await request(app).get('/api/v1/auth/me');
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });

  it('registers a teacher and validates role separation', async () => {
    const regRes = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: testTeacherEmail,
        password: 'Password123!',
        name: 'Professor Smith',
        role: 'teacher'
      });

    expect(regRes.status).toBe(201);
    expect(regRes.body.user.role).toBe('teacher');
    teacherToken = regRes.body.token;

    const meRes = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${teacherToken}`);

    expect(meRes.status).toBe(200);
    expect(meRes.body.user.role).toBe('teacher');
  });
});
