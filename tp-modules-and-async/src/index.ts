import { mockUsers, fetchUtilisateurs } from "./service";

console.log(`Nombre d'utilisateurs : ${mockUsers.length}`);

async function main() {

    try{
        console.log("Tentative de connexion...");
        console.log("...Chargement des données...");
        const users = await fetchUtilisateurs();
        console.log(users);
    }
    catch(error){
        console.log("error : ", error);
    }
       
}


main();