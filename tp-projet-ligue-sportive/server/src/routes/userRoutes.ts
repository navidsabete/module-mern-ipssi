import { Router } from 'express';
import { userController } from '../controllers/UserController';

const userRouter = Router();

// Routes réservées à l'administration 
userRouter.get('/adherents', userController.getAllAdherents);
userRouter.get('/adherents/:id', userController.getAdherentById);
userRouter.delete('/adherents/:id', userController.deleteUser);
userRouter.post('/adherents', userController.createAdherent);
userRouter.put("/adherents/:id", userController.updateAdherent)

export default userRouter;