import { Request, Response } from 'express';
import { User } from '../models/User';

class UserController {
  // GET /api/adherents - Liste tous les adhérents (Admin)
  public async getAllAdherents(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find().select('-password');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  }

  // GET /api/adherents_id - Récupérer uniquement les IDs des adhérents
  public async getAdherentIds(req: Request, res: Response): Promise<void> {
    try {
      // On sélectionne uniquement le champ _id
      const ids = await User.find().select('_id');
      res.status(200).json(ids);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des IDs" });
    }
  }

  // PUT /api/adherents/:id - Mettre à jour les informations d'un adhérent
  public async updateAdherent(req: Request, res: Response): Promise<void> {
    // --- AJOUT DES LOGS DE DÉBOGAGE ---
    console.log("-----------------------------------");
    console.log("ID reçu dans l'URL :", req.params.id);
    console.log("Données reçues dans le Body :", req.body);
    console.log("-----------------------------------");
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Option { new: true } pour renvoyer le document mis à jour
      const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');

      if (!updatedUser) {
        res.status(404).json({ message: "Adhérent non trouvé" });
        return;
      }

      res.status(200).json({
        message: "Adhérent mis à jour avec succès",
        user: updatedUser
      });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la mise à jour" });
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