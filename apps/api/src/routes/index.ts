import { Router } from 'express';
import authRoutes from './auth.js';
import eventsRoutes from './events.js';
import healthRoutes from './health.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/events', eventsRoutes);

export default router;
