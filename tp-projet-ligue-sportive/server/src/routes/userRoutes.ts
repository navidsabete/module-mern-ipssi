import { Router } from 'express';
import { userController } from '../controllers/UserController';

const router = Router();

// Routes réservées à l'administration 
router.get('/adherents', userController.getAllAdherents);
router.delete('/adherents/:id', userController.deleteUser);
router.get('/adherents_id', userController.getAdherentIds);
router.put('/adherents/:id', userController.updateAdherent);


export default router;