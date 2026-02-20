import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from "bcrypt";

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

  // POST /api/users → création utilisateur (Admin seulement)
  public async createAdherent(req: Request, res: Response): Promise<void> {
      try {
     
        const { username, email, password, role } = req.body;

        if (!username || !email || !password) {
           res.status(400).json({ message: "Champs obligatoires manquants" });
           return;
        }

        // 1. Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          res.status(400).json({ message: "Cet email est déjà utilisé." });
          return;
        }

        // 2. Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Créer l'utilisateur (Admin ou Adhérent)
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
          role: role || 'adherent' // Par défaut adhérent sauf si précisé
        });

        await newUser.save();

         // Ne pas renvoyer le mot de passe
         const userToReturn = {
           _id: newUser._id.toString(),
           username: newUser.username,
           email: newUser.email,
           role: newUser.role,
         };

        res.status(201).json(userToReturn);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la création" });
    }
  
  }


  public async getAdherentById(req: Request, res: Response): Promise<void> {
      try{
           const { id } = req.params;
           const user = await User.findById(id);
           if (!user) {
              res.status(404).json({ message: "Utilisateur non trouvé" });
              return;
          }
          res.status(200).json(user);
      }
      catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }

  }

  // PUT /api/users/:id - Mettre à jour un compte

  public async updateAdherent(req: Request, res: Response): Promise<void> {
      try {
        const { id } = req.params;
        const { username, email, password, role } = req.body;
        const user = await User.findById(id);

        if (!user) {
          res.status(404).json({ message: "Utilisateur non trouvé" });
          return;
        }
          // Mise à jour des champs si fournis
        if (username) user.username = username;
        if (email) user.email = email;
        if (role) user.role = role;

        // Si password fourni → hash obligatoire
        if (password) {
          const hashedPassword = await bcrypt.hash(password, 10);
          user.password = hashedPassword;
        }
        await user.save();

        // On renvoie l'utilisateur sans le mot de passe
        const userToReturn = {
          _id: user._id.toString(),
          username: user.username,
          email: user.email,
          role: user.role,
        };
        res.status(200).json(userToReturn);

      }
      catch (error) {
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