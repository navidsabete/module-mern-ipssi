import express from 'express';
import { db } from './config/database';
import cors from 'cors';
import authRouter from './routes/authRoutes'; 
import userRouter from './routes/userRoutes';


//import productRouter from './routes/productRoutes'; 

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors()); 
app.use(express.json());

// Routes API 
app.use('/api', authRouter); // Pour /api/inscription et /api/connexion 
app.use('/api', userRouter); // Pour /api/adherents
//app.use('/api', productRouter); // Pour /api/produits 

// Initialisation BDD et Serveur 
db.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
  });
});