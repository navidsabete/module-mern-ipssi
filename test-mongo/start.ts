import mongoose from 'mongoose';
import movieModel from './src/models/movie.model';
import dotenv from 'dotenv';

dotenv.config();

const uri = `${process.env.URI_SRV_CONN_STRING}`;
const uri_srv = `${process.env.URI_SRV_CONN_STRING}`;


async function testDBMovie() {
    try{
        console.log("Tentative de connexion...");
        // 1. Connexion
        await mongoose.connect(uri_srv); 
        console.log("Connexion réussie à MongoDB Atlas !");
/*
        // ❌ Test sans remplir de champ obligatoire
        const invalidMovie = new movieModel({
          title: "Movie Test"
          // director, year, genre, duration manquent
        });
    
        await invalidMovie.save();
*/

        // ✅ Test valide
        const validMovie = new movieModel({
          title: "Movie Test",
          director: "Director Test",
          year: 2026,
          genre: "Science-fiction",
          duration: 148
        });
    
        await validMovie.save();
        console.log("Film sauvegardé :", validMovie);
        
    }
    catch(error){
        console.error("Erreur :", error);
    }
    finally {
        // Fermeture propre
        await mongoose.disconnect();
        console.log("Fermeture de la connexion.");
    }
}

testDBMovie();