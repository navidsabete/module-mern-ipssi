import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001; // Port 3001 pour ne pas gêner React (5173)

// --- MIDDLEWARES --- 
// 1. Celui pour autoriser les requêtes externes (CORS) 
app.use(cors());

// 2. Celui pour lire le JSON dans le body des requêtes
app.use(express.json());

// --- DONNÉES --- 
// Simulation de base de données en mémoire
let books = [ 
  { id: 1, title: "Mon Livre 1", author: "Mon Auteur 1" },
  { id: 2, title: "Mon Livre 2", author: "Mon Auteur 2" }, 
  { id: 3, title: "Mon Livre 3", author: "Mon Auteur 3" } ];

// --- ROUTES --- 
// Route de test 
app.get('/', (req, res) => { 
    res.send('API Library v1.0 is running...'); 
});


// --- DÉMARRAGE ---

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});