let nom: string = "Test";
let age: number = 18;
let estAdherent: boolean = false;
let score = 10; 

let sports: string[];

let panier: {produit: string, prix: number}[];

let responseAPI: [number, string] = [200, "OK"];



function calculerRemise(prix: number): number {
    console.log(prix*0.8);
    return prix*0.8; //20%
}

function saluer(prenom: string, titre?: string): void {
    if(titre){
        console.log(`Bonjour ${titre} ${prenom}`)
    }
    else{
        console.log(`Bonjour ${prenom}`)
    }
}


function formaterID(id: string | number) {
    console.log(id);
    return id;
}



interface IEquipement {
    id: number;
    nom: string;
    categorie: string;
    disponible: boolean;
}

function afficherInventaire(equipements: IEquipement[]) {
    equipements.forEach((equipement) => {
        if(equipement.disponible){
            console.log(`-- ${equipement.nom}`);
        }
    });
}


calculerRemise(20);
saluer("Test");
saluer("Test", "M.");
formaterID(240);
formaterID("250");

const inventaire: IEquipement[] = [
    {
        id: 1, nom: "Baskets", categorie: "Sports", disponible: true
    },
    {
        id: 2, nom: "Ordinateur", categorie: "Sports", disponible: false
    },
    {
        id: 3, nom: "Ballons", categorie: "Sports", disponible: true
    },
    {
        id: 4, nom: "Pompe à air", categorie: "Sports", disponible: false
    },
    {
        id: 5, nom: "Sifflet", categorie: "Sports", disponible: true
    }

];

console.log("Liste des équipements disponibles");
afficherInventaire(inventaire);