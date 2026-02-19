import { Router } from 'express';
import { userController } from '../controllers/UserController';

const userRouter = Router();

// Routes réservées à l'administration 
userRouter.get('/adherents', userController.getAllAdherents);
userRouter.delete('/adherents/:id', userController.deleteUser);

export default userRouter;