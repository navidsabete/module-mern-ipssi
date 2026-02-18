import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import mongoose from "mongoose";
import movieRouter from './routes/movie.routes';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const PORT = 3001; // Port 3001 pour ne pas gêner React (5173)
const uri_srv = `${process.env.URI_SRV_CONN_STRING}`;

// --- MIDDLEWARES --- 
// 1. Celui pour autoriser les requêtes externes (CORS) 
app.use(cors());

// 2. Celui pour lire le JSON dans le body des requêtes
app.use(express.json());

app.use("/api/movies", movieRouter);

app.use((req: Request, res: Response, next) => {
    console.log(`Requête reçue : ${req.method} ${req.url}`);
    next();
});
app.get('/test', (req: Request, res: Response) => res.send("Le serveur répond bien !"));

async function startServer() {
    try{
        console.log("Tentative de connexion...");
        // 1. Connexion
        await mongoose.connect(uri_srv); 
        console.log("Connexion réussie à MongoDB Atlas !");

        app.listen(PORT, () => {
            console.log(`Serveur Task Manager démarré sur http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("Erreur de connexion à MongoDB :", error);
        //process.exit(1); // quitte le processus si échec de connexion
    }

}

startServer();