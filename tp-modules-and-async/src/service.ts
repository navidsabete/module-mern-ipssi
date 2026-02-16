import {Utilisateur} from "./types";

export const mockUsers: Utilisateur[]= [
     {id: 1, nom: "Nom 1", email: "nom1@test.com"},
     {id: 2, nom: "Nom 2", email: "nom2@test.com"},
     {id: 3, nom: "Nom 3", email: "nom3@test.com"},
];

export function fetchUtilisateurs(): Promise<Utilisateur[]> { 
    return new Promise((resolve, reject) => { 
        // setTimeout simule la lenteur du réseau (1 secondes) 
        setTimeout(() => { 
            const success = Math.random() > 0.5; // 1 chance sur 2
            if(success){
                console.log("... Données récupérées !"); 
                resolve(mockUsers); // La promesse est tenue, on envoie les données 
            }
            else{
                reject("Impossible de récupérer les données !")
            }
            
            
        }, 1000); 
    }); 
}