import { Playlist } from "./models/Playlist";
import { StyleMusical } from "./models/Types";
import { rechercherTitres } from "./services/MusicAPI";

async function main(): Promise<void> {
  const playlist = new Playlist("Mes Favoris 2025");

  try {
    const titres = await rechercherTitres("Daft Punk");
    titres.forEach((c) => playlist.ajouter(c));
    console.log("Playlist mise à jour !");
  } catch (e) {
    console.error("Erreur lors de la recherche:", e);
  }

  console.log("Durée totale (secondes):", playlist.obtenirDureeTotale());

}

void main();

