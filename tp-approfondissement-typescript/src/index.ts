enum StatutCommande { 
    EnAttente = "En Attente", 
    Expediee = "Expédiée",
    Livree = "Livrée" 
}

interface Commande{
    id: number;
    statut: StatutCommande;
}

interface Livre {
    titre: string;
    auteur: string;
}

class Bibliotheque{
    private catalogue: Livre[] = [];

    public ajouterLivre(nouveauLivre:Livre): void {
        this.catalogue.push(nouveauLivre);
    }

    public obtenirNombreLivres(): number{
        return this.catalogue.length;
    }

    public mettreAJourLivre(livreOriginal: Livre, modifications: Partial<Livre>): Livre {
        return {...livreOriginal, ...modifications};
    }

}

class Boite<T>{
    contenu: T;
    constructor(valeur: T) {this.contenu = valeur;}

    regarder(): T{
        return this.contenu;
    }
}




function afficherEtat(commande: Commande): void{
    if(commande.statut == StatutCommande.Livree){
        console.log("-- Colis reçu !");
    }
    else{
        console.log("-- En cours d'acheminement");
    }

}

const commande1: Commande = {id: 1, statut: StatutCommande.EnAttente};
const commande2: Commande = {id: 2, statut: StatutCommande.Expediee};
const commande3: Commande = {id: 2, statut: StatutCommande.Livree};


console.log("commande 1"); afficherEtat(commande1);
console.log("commande 2"); afficherEtat(commande2);
console.log("commande 3"); afficherEtat(commande3);

const bibliotheque = new Bibliotheque();
const livre1: Livre = {titre: "Livre 1", auteur: "Auteur 1"};
const livre2: Livre = {titre: "Livre 2", auteur: "Auteur 2"};
bibliotheque.ajouterLivre(livre1);
bibliotheque.ajouterLivre(livre2);

// let biblioLength: number = bibliotheque.catalogue.length;
let biblioLength: number = bibliotheque.obtenirNombreLivres();

console.log(`Nombre de livres dans la biblio: ${biblioLength}`);


const boiteAString = new Boite<string>("Bonjour");
const boiteANumber = new Boite<number>(42);

const valeurString = boiteAString.regarder();

console.log(valeurString);

const valeurNumber = boiteANumber.regarder();
console.log(valeurNumber);

console.log(livre1);
console.log(livre2);
let livre1Modifie = bibliotheque.mettreAJourLivre(livre1, {titre: "Livre test 1"});
let livre2Modifie = bibliotheque.mettreAJourLivre(livre2, {auteur: "Auteur test 2"});

console.log(livre1Modifie);
console.log(livre2Modifie);
livre1Modifie = bibliotheque.mettreAJourLivre(livre1, {titre: "Livre l1", auteur: "Auteur a1"});
console.log(livre1Modifie);