import { Router } from 'express';
import { authController } from '../controllers/AuthController';

const authRouter = Router();

// Routes demandées dans le projet
authRouter.post('/inscription', authController.register);
authRouter.post('/connexion', authController.login);

export default authRouter;