import { Router } from 'express';
import {
  BuildEventBatchSchema,
  type BuildEvent
} from '@vlab/shared';
import { prisma } from '../db.js';
import { optionalAuth } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

router.post(
  '/',
  optionalAuth,
  validateBody(BuildEventBatchSchema),
  async (req, res, next) => {
    try {
      const payload = req.body;
      const rawEvents: BuildEvent[] = Array.isArray(payload) ? payload : [payload];

      const recordsToCreate = rawEvents.map((evt) => ({
        userId: evt.userId || req.user?.id || null,
        sessionId: evt.sessionId || null,
        mode: evt.mode,
        stepId: evt.stepId || null,
        type: evt.type,
        timestamp: String(evt.timestamp),
        payloadJson: evt.payload ? JSON.stringify(evt.payload) : null
      }));

      const result = await prisma.event.createMany({
        data: recordsToCreate
      });

      res.status(201).json({
        count: result.count,
        message: 'Events recorded successfully'
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
