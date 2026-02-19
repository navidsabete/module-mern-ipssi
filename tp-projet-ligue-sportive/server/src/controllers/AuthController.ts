import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthController {
  /**
   * API Inscription /api/inscription
   */
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password, role } = req.body;

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
      // 3. Générer le Token JWT avec le ROLE
      const token = jwt.sign(
        { id: newUser._id, role: newUser.role },
        process.env.JWT_SECRET || 'secret_par_defaut',
        { expiresIn: '24h' }
      );

      // 4. Réponse pour le frontend (inclut le rôle pour l'affichage des CTA)
      res.status(201).json({
        token,
        user: {
          id: newUser._id,
          username: newUser.username,
          role: newUser.role // Crucial pour afficher /adherent ou /admin
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de l'inscription" });
    }
  }

  /**
   * API Connexion /api/connexion
   */
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // 1. Chercher l'utilisateur
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ message: "Utilisateur non trouvé." });
        return;
      }

      // 2. Vérifier le mot de passe
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: "Mot de passe incorrect." });
        return;
      }

      // 3. Générer le Token JWT avec le ROLE
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || 'secret_par_defaut',
        { expiresIn: '24h' }
      );

      // 4. Réponse pour le frontend (inclut le rôle pour l'affichage des CTA)
      res.status(200).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          role: user.role // Crucial pour afficher /adherent ou /admin
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la connexion" });
    }
  }
}

export const authController = new AuthController();