import { Request, Response } from 'express';
import { User } from '../models/User';

class UserController {
  // GET /api/adherents - Liste tous les adhérents (Admin) 
  public async getAllAdherents(req: Request, res: Response): Promise<void> {
    try {
      // On filtre pour ne pas envoyer les mots de passe
      const users = await User.find().select('-password');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  }

  // DELETE /api/adherents/:id - Supprimer un compte 
  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression" });
    }
  }
}

export const userController = new UserController();