import express from 'express';
import { db } from './config/database';
import cors from 'cors';
import authRouter from './routes/AuthRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware pour parser le JSON (nécessaire pour les requêtes Postman)
app.use(cors()); 
app.use(express.json());
app.use('/api', authRouter);


// Initialisation de la base de données
db.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
  });
});