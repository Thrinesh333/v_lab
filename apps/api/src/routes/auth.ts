import { Router } from 'express';
import bcrypt from 'bcryptjs';
import {
  LoginInputSchema,
  RegisterInputSchema,
  type AuthResponse,
  type UserRole
} from '@vlab/shared';
import { prisma } from '../db.js';
import { generateToken, requireAuth } from '../middleware/auth.js';
import {
  ConflictError,
  UnauthorizedError
} from '../middleware/errorHandler.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

router.post(
  '/register',
  validateBody(RegisterInputSchema),
  async (req, res, next) => {
    try {
      const { email, password, name, role } = req.body;

      const existingUser = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      });

      if (existingUser) {
        throw new ConflictError('An account with this email already exists', 'EMAIL_TAKEN');
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          passwordHash,
          name,
          role: role || 'student'
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true
        }
      });

      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role as UserRole
      });

      const responsePayload: AuthResponse = {
        user: {
          ...user,
          role: user.role as UserRole
        },
        token
      };

      res.status(201).json(responsePayload);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/login',
  validateBody(LoginInputSchema),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      });

      if (!user) {
        throw new UnauthorizedError('Invalid email or password', 'INVALID_CREDENTIALS');
      }

      const isValidPassword = await bcrypt.compare(password, user.passwordHash);
      if (!isValidPassword) {
        throw new UnauthorizedError('Invalid email or password', 'INVALID_CREDENTIALS');
      }

      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role as UserRole
      });

      const responsePayload: AuthResponse = {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role as UserRole,
          createdAt: user.createdAt
        },
        token
      };

      res.status(200).json(responsePayload);
    } catch (err) {
      next(err);
    }
  }
);

router.get('/me', requireAuth, (req, res) => {
  res.status(200).json({
    user: req.user
  });
});

export default router;
