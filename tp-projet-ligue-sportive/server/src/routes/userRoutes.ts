import { Router } from 'express';
import { userController } from '../controllers/UserController';

const userRouter = Router();

// Routes réservées à l'administration 
userRouter.get('/adherents', userController.getAllAdherents);
userRouter.delete('/adherents/:id', userController.deleteUser);
userRouter.get('/adherents_id', userController.getAdherentIds);
userRouter.put('/adherents/:id', userController.updateAdherent);


export default userRouter;