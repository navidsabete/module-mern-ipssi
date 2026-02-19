import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

class Database {
  private readonly mongoUri: string;

  constructor() {
    // Récupération de l'URI depuis le .env
    this.mongoUri = process.env.MONGO_URI || '';
    
    if (!this.mongoUri) {
      console.error("ERREUR : MONGO_URI n'est pas défini dans le fichier .env");
      process.exit(1);
    }
  }

  /**
   * Méthode pour initialiser la connexion à MongoDB Atlas
   */
  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.mongoUri);
      console.log('Connexion à MongoDB Atlas réussie (Ligue Sportive Auvergne)');
    } catch (error) {
      console.error('Erreur de connexion à MongoDB :', error);
      process.exit(1); // Arrête le serveur en cas d'échec critique
    }
  }

  /**
   * Méthode pour fermer la connexion (utile pour les tests)
   */
  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    console.log('Connexion MongoDB fermée');
  }
}

// Export d'une instance unique (Singleton)
export const db = new Database();