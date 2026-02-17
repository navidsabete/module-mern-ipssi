import mongoose from 'mongoose';

const uri = "";

async function testConnection() {
    try{
        console.log("Tentative de connexion...");
        // 1. Connexion
        await mongoose.connect(uri); 
        console.log("Connexion réussie à MongoDB Atlas !");

        // 2. Définition simple d'un format de données (Schema) 
        const CatSchema = new mongoose.Schema({ name: String });

        // 3. Création du modèle 
        const Cat = mongoose.model('Cat', CatSchema);

        // 4. Création et sauvegarde d'une donnée simple
        const myCat = new Cat({ name: 'Zizou' }); 
        await myCat.save();

        console.log("Donnée sauvegardée : Un chat nommé Zizou a été ajouté.");
    }
    catch(error){
        console.error("Erreur de connexion :", error);
    }
    finally {
        // Fermeture propre
        await mongoose.disconnect();
        console.log("Fermeture de la connexion.");
    }
}

testConnection();