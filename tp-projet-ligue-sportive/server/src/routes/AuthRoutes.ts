import { Router } from 'express';
import { authController } from '../controllers/AuthController';

const router = Router();

// Routes demandées dans le projet
router.post('/inscription', authController.register);
router.post('/connexion', authController.login);

export default router;